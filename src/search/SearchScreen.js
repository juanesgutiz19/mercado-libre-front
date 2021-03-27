import React, { useState, useEffect } from 'react'
import queryString from 'query-string';

import { useForm } from '../hooks/useForm';
import { ItemCard } from '../items/ItemCard';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router';

export const SeachScreen = ({ history }) => {


    const location = useLocation();
    const { q = ''} = queryString.parse(location.search);

    const [resultList, setResulList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 50;
    const pagesVisited = pageNumber * itemsPerPage;
    const [length, setLength] = useState(-1);
    let pageCount = undefined;

    const getData = () => {
        fetch( `https://api.mercadolibre.com/sites/MCO/search?q=${searchText}&offset=${pagesVisited}&limit=${itemsPerPage}` )
            .then( resp => resp.json() )
            .then(data => {
                setResulList(data.results);
                setLength(data.paging.total);
                pageCount = Math.ceil(length/itemsPerPage);
                if(pageNumber !== 0){
                    displayItems();
                }
            })
            .catch(
                (error) => {
                    console.log('Error inesperado', error);
                }
            )  
    }

    const displayItems = () => {
        if(resultList.length > 0){
            return(resultList.map(item => <ItemCard key={item.id} info={item} > </ItemCard> ));
        }else {
            return null;
        }
    }

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    const [formValues, handleInputChange ] = useForm({
        searchText: q
    });

    const { searchText } = formValues;
    
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
        getData();
    }

    useEffect(() => {
        // if(pageNumber > 0){
        //     getData();
        // }
        getData();
    }, [pageNumber]);

    return (
        <div>
            <div className="row">
                <div className="col-12 barra-busqueda">

                    <form onSubmit={ handleSearch }>

                        <input 
                            type="text"
                            placeholder="Find your item"
                            className="form-control"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-12 item-lista">
                    <hr />
                    <div className="contenedor-busqueda">
                        <div className="card-columns">
                            {displayItems()}
                        </div>
                    </div>
                    
                    {length && resultList.length > 0? 
                    <div className="paginator">
                        <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttns"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                    </div>
                    : null}
                </div>
            </div>
        </div>
    )
}
