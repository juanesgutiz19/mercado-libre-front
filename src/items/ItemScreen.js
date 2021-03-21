import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';

export const ItemScreen = () => {

    const { itemId} = useParams();
    
    const url = `https://api.mercadolibre.com/items/${ itemId }`;
    const [sellerName, setSellerName] = useState(null);

    const { data: resultItems, loading, error} = useFetch(url);

    useEffect(() => {
        if(resultItems){            
            updateSellerName(resultItems.seller_id);
        }
    }, [resultItems]);

 
    function updateSellerName(id){
        fetch( `https://api.mercadolibre.com/users/${id}` )
            .then( resp => resp.json() )
            .then(data => {
                setSellerName(data.nickname);
            })
            .catch(
                (error) => {
                        
                }
            )
    }
    
    const saludo = () => {
        return <p>Hola</p>;
    }
    /*
    if(!resultItems){
        return <Redirect to="/"/>
    }
    */

    return (
        <div>
        { resultItems? <h1>{resultItems.title}</h1> : null }
        { resultItems? <h1>{resultItems.pictures[0].secure_url}</h1> : null }
        { resultItems? <h1>{resultItems.price}</h1> : null }
        { saludo()}
        <p>{sellerName}</p>       
        </div>
    )
}
