import React, { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch';
import { useForm } from '../hooks/useForm';
import { ItemCard } from '../items/ItemCard';

export const SeachScreen = () => {

    // Aquí se recuperan los ítems.
    /**
     * input para buscar
     * buton para actulizar la lista de resultados
     * 
     * listado de cardItems
     */


    /**
     * listado de productos a mostrar
     */

    const [resultList, setResulList] = useState([]);
    
    const [formValues, handleInputChange ] = useForm({
        searchText: ''
    });

    const { searchText } = formValues;

    //setResulList(data);
    //console.log(resultList);

    /*
    useEffect(() => {
        if(resultItems){      
            console.log('Entré acá');    
            console.log(resultItems);
        }
    }, [resultItems]);
*/
    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchText);
        getSellerName(searchText);
    }

    function getSellerName(id){
        fetch( `https://api.mercadolibre.com/sites/MCO/search?q=${searchText}&offset=0&limit=3` )
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
            <h1>SearchScreen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <hr/>

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

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                        {
                            resultList.length > 0
                            ? resultList.map(item => <ItemCard key={item.id} info={item} > </ItemCard> )
                            : <p>Sin resultados</p>                 
                        }
                    
                </div>
            </div>
        </div>
    )
}
