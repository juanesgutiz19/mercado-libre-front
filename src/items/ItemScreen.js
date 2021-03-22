import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';

export const ItemScreen = ({ history }) => {

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

    const handleReturn = () => {

        if( history.length <=2 ) {
            history.push('/');
        } else {
            history.goBack();
        }

    }

    
    const verifyDiscount = (original_price, price) => {

        const formatterPeso = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
          })

        if(!original_price){
            return (
                <>
                    <p className="precio-item-screen" >{formatterPeso.format(price)}</p>
                    <p className="discount">The item don't have a discount</p>
                </>     
                );
        }else {
            const percentage = (price*100)/original_price;
            const descuento = 100 - percentage;
            return(
                <>
                    <p className="incorrecto" >{formatterPeso.format(original_price)}</p>
                    <p className="precio-item-screen">{formatterPeso.format(price)}</p>
                    <div className="center"><p className="discount">{Math.round(descuento)}% OFF</p></div>
            </> 
            );
        } 
    }
    return (
        <div className="contenedoritem">

            <div className="row mt-5">
                <div className="col-4">
                    <img 
                        src={resultItems? resultItems.pictures[0].secure_url : ''}
                        alt={resultItems? resultItems.title : 'No hay imagen' }
                        className="img-thumbnail"
                    />
                </div>
                <div className="col-8">
                    <h3 className="title-item-screen"> { resultItems? resultItems.title : null} </h3>
                    { resultItems? verifyDiscount(resultItems.original_price, resultItems.price) : null}

                    { resultItems? <p> More information with the seller <span>{sellerName}</span></p>: null}

                    <button 
                        className="btn btn-outline-info"
                        onClick={ handleReturn }
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
