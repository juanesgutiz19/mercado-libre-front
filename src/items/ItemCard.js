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



    return (
        <div>
            <div className="card ms-3 animate__animated animate__fadeIn" style={ { maxWidth: 540 } }>
            <div className="row no-gutters">
                {/*
                <div className="col-md-4">
                    <img src={ `./assets/heroes/${ id }.jpg` } className="card-img" alt={ superhero } />
                </div>
                */}
                <div className="col-md-8">
                    
                    <div className="card-body">
                        {/*<h5 className="card-title"> { title } </h5> */}


                        { resultItems? <h1>{resultItems.title}</h1> : null }
                        { resultItems? <h1>{resultItems.pictures[0].secure_url}</h1> : null }
                        { resultItems? <h1>{resultItems.price}</h1> : null }
                        <p>{sellerName}</p>     
                        {<Link to={ `./item/${ id }` }>
                            ¡Visualizar producto!
                        </Link> }

                    </div>

                </div>
            </div>
        </div>
        </div>
    )
}
