import React, { useState } from 'react'
import { useForm } from '../hooks/useForm';
import { ItemCard } from '../items/ItemCard';

export const SeachScreen = () => {

    const [resultList, setResulList] = useState([]);
    
    const [formValues, handleInputChange ] = useForm({
        searchText: ''
    });

    const { searchText } = formValues;
    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchText);
        getSellerName(searchText);
    }

    function getSellerName(id){
        fetch( `https://api.mercadolibre.com/sites/MCO/search?q=${searchText}&offset=0&limit=50` )
            .then( resp => resp.json() )
            .then(data => {
                setResulList(data.results);
            })
            .catch(
                (error) => {

                }
            )
    }

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
                    <div className="card-columns">
                        {
                            resultList.length > 0
                            ? resultList.map(item => <ItemCard key={item.id} info={item} > </ItemCard> )
                            : null           
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
