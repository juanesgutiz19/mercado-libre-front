import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';


export const ItemCard = (props) => {
    const { info } = props;

    const { id } = info;


    const url = `https://api.mercadolibre.com/items/${ id }`;
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
                    console.log('Ha ocurrido un error');
                }
            )
    }

    function returnCOP(price){
        const formatterPeso = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
          })
        return formatterPeso.format(price)
    }
    


    return (
        <>  
            {!loading?<div className="card ms-3" style={ { maxWidth: 540 } }>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        {resultItems? <img src={resultItems? resultItems.pictures[0].secure_url : ''} className="card-img" alt={resultItems? resultItems.title : 'No hay imagen' } />: null}
                    </div>
                    <div className="col-md-8">
                        
                        <div className="card-body">
                            { resultItems? <h5 className="card-title"> { resultItems.title } </h5> : null }
                            
                            
                            { resultItems?<p className="card-text"> { returnCOP(resultItems.price)} </p> : null }

                            
                            <p className="card-text">
                                <small className="text-muted"> { sellerName } </small>
                            </p>

                            {<Link to={ `./item/${ id }` }>
                                    Visualizar producto
                            </Link> }

                        </div>

                    </div>
                </div>
            </div>: <div></div>}
        </ >
    )
}
