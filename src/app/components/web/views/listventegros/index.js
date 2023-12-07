import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../../../styles/product-card.css";
import { GroceryStampleDetails } from '../../../services';

function Listegros() {
    const [productlist, setProductList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const list = await GroceryStampleDetails.getAllproduitgros();
            if (list.success) {
                setProductList(list.product);
                setIsLoaded(true);
            }
        };

        fetchData();
    }, []);

    

   

    return (
        <div>
             <section className="pt-3  page-info section-padding border-bottom border-white single-product-header-bk ">
            <div className='container'>
            <div className='d-flex justify-content-center text-center mt-5 mb-3'>
                            <h2  >LISTES DES PRODUITS EN GROS </h2>
                        </div>
            </div>
             
            <section className="product-shop p-5">
                {!isLoaded ? <div className="progress-bar-bk"><CircularProgress color="secondary" /></div> :
                    <div className="container">
                        <div className="row  ">
                            {productlist.map((row, index) => (
                                 <div key={index} className="item ">
                                 <div className="product card">
                                     <Link to={{
                                         pathname: `/dpg/${row.id}`,
                                         state: row
                                     }}>
                                         <div className="product-header  card ">

                                             <img className="img" src={`http://localhost:4001/${row.photo}`} alt="product" />

                                         </div>

                                     </Link>
                                     <div className='justify-content-center pt-3'>
                                         <h4>{row.nomprod}</h4>
                                     </div>
                                     <div className=" d-flex align-items justify-content-between mt-3 ">
                                        <span className="price  mr-3">{row.qty} piece </span>
                                        <span className="price ">{row.prix} Fcfa</span>
                                        </div>
                                 </div>
                             </div>
                            ))}
                        </div>
                    </div>
                }
            </section>
            </section>
        </div>
    );
}

export default connect()(Listegros);
