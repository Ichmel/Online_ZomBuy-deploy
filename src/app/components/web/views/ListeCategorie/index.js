import React, { useState, useEffect } from 'react';
import { GetProductDetails } from '../../../services';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import Filterbycategory from '../shop-details/Filtersbycategory';



const DetailsCategoies = () => {
    const [list, setList] = useState([]);
    const [limit, setLimit] = useState(12);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(0, 0);
            let url = window.location.href.split('/');
            var lastSegment = url.pop() || url.pop();

            try {
                let p = await GetProductDetails.getAllProductList(lastSegment);

                if (p) {
                    setList(p.data.Produits);
                    setIsLoaded(true);
                    console.log('LISTE', p);
                }
            } catch (e) {
                NotificationManager.error("Données vides dans la catégorie", "Données");
            }
        };

        fetchData();
    }, []);

    const handleChangeByCategory = (value) => {
        if (value) {
            setIsLoaded(true);
            setList(value.data);
        }
    };

    return (
        <div>
            <section className="pt-3 ">
                <div className="all-product-grid">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product-top-dt">
                                    <div className="product-left-title">
                                        <h2>Liste des Produits</h2>
                                    </div>
                                    <Filterbycategory onSelectFilterCategory={handleChangeByCategory} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <section className="product-shop p-5">
                    {!isLoaded ? (
                        <div className="progress-bar-bk">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : (
                        <div className="container">
                            <div className="row  ">
                                {list.slice(0, limit).map((row, index) => (
                                    <div key={index} className="item ">
                                        <div className="product card">
                                            <Link
                                                to={{
                                                    pathname: `/p/${row.id}`,
                                                    state: row
                                                }}
                                            >
                                                <div className="product-header  card ">
                                                    <img className="img" src={row.photo} alt="product" />
                                                </div>
                                            </Link>
                                            <div className='justify-content-center pt-3'>
                                                <h4>{row.nomprod}</h4>
                                            </div>
                                            <div className=" d-flex align-items justify-content-between mt-3 ">
                                                <span className="price ml-2 mr-3">{row.prix} Fcfa </span>
                                                <strike className="anprice ">{row.ancienprix} Fcfa</strike>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </section>
        </div>
    );
};

export default DetailsCategoies;
