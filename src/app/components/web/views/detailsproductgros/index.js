import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import Slider from "react-slick";
import parse from 'html-react-parser';
import { GetProductDetails } from '../../../services';
import { motion } from 'framer-motion'
import { cartActions } from '../../../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import { useHistory } from 'react-router-dom';
import { Row, Col, } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';


function Produidetails(item) {





    const history = useHistory();

    const [product, setProduct] = useState(null);

    const [selectedphoto, setSelectedPhoto] = useState('');
    const [similarProducts, setSimilarProducts] = useState([]);




    useEffect(() => {
        async function fetchProductDetails() {
            window.scrollTo(0, 0);
            let url = window.location.href.split('/');
            var lastSegment = url.pop() || url.pop();
            let list = await GetProductDetails.getProductBygrosId(lastSegment);
            setProduct(list.data);
            console.log(list);

            // Appelez fetchProductSimilar en utilisant chilCategoryId
            fetchProductSimilar(list.data.chilCategoryId);
        }

        async function fetchProductSimilar(chilCategoryId) {
            window.scrollTo(0, 0);
            let similar = await GetProductDetails.getProductSimilargros(chilCategoryId);
            setSimilarProducts(similar.data);
            console.log('similar', similar);
        }

        fetchProductDetails();
    }, []);





    const settings = {
        customPaging: function (i) {
            return (
                <div id="sync1" className="owl-carousel">
                    <div className={`product mt-3 ${product.productphotogros[i].photo === selectedphoto ? 'selected' : ''}`}>
                        <div className='card '>
                            <img
                                src={product.productphotogros[i].photo}
                                className="img-fluide "
                                onClick={() => setSelectedPhoto(product.productphotogros[i].photo)}
                                alt={`cart ${i + 1}`}
                            />
                        </div>
                    </div>
                </div>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    const handleClick = () => {
        // Pour naviguer vers une autre route
        window.location.href ='/account/view';
    }



    const handleProductClick = (item) => {
        window.location.href = `/p/${item.id}`;
        window.location.reload(); // Recharge la page lorsque l'utilisateur clique sur le lien
    }



    const storeProductDetails = () => {
        // Check if product is available
        if (product) {
            // Store photo and name in sessionStorage
            sessionStorage.setItem('photo', product.photo);
            sessionStorage.setItem('nomprod', product.nomprod);
            sessionStorage.setItem('productId', product.id)
            sessionStorage.setItem('prix', product.prix);
            sessionStorage.setItem('qty', product.qty);
            sessionStorage.setItem('prixF', product.prixF);
            sessionStorage.setItem('nomF', product.nomF);
            sessionStorage.setItem('contactF', product.contactF);
            sessionStorage.setItem('localF', product.localF);

        }
    };




    return (
        <div>
            <section className="pt-5 pb-3 page-info section-padding border-bottom  single-product-header-bk ">


                <section className="shop-single section-padding pt-5 mb-5 ">
                    <div className="container">
                        {
                            product ?
                                <Row>
                                    <Col lg='6' className='magin ' >
                                        <Paper className="  card">
                                            <Slider {...settings}>

                                                {

                                                    product.productphotogros ?
                                                        product.productphotogros.map((r, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <img alt src={r.photo}
                                                                        className={`img-fluide2  ${r.photo === selectedphoto ? 'selected' : ''}`}
                                                                        onClick={() => setSelectedPhoto(r.photo)}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                        : "Please Upload Image"
                                                }

                                            </Slider>
                                        </Paper>
                                    </Col>
                                    <Col lg='6' className=" ">
                                        <div className="shop-detail-right  ">
                                            <h2>{product.nomprod}</h2>

                                            <div className='d-flex gap-3 text-align-items-center '>
                                                <div className='ml-4 mr-4'>
                                                    <h2>{product.qty}  piéce</h2>
                                                </div>
                                                <div className="ml-4">
                                                    <h2> {product.prix} Fcfa </h2>
                                                </div>

                                            </div>

                                            <h6 className="mb-3 mt-4">{product.description}</h6>

                                            <div className='mt-4 colt' >Listes des Couleurs : </div>
                                            <div className="d-flex  justify-content mt-1 mb-4">

                                                {product.productphotogros.map((r, index) => (
                                                    <motion.input
                                                        key={index}
                                                        type="button"
                                                        className="btn-color d-block m-3"
                                                        style={{ background: `${r.couleur}` }}
                                                    />

                                                ))}
                                            </div>

                                            <div className='mt-4  colt' >Listes des Tailles : </div>
                                            <div className=" mt-2  d-flex  " >
                                                {product.productphotogros.map((r, index) => (
                                                    <div className='m-3 ' key={index} >
                                                        <div className='' >
                                                            {r.taille}
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>

                                            <div className=" btn-ajouter w-75 mt-4 mb-4">
                                                <motion.button
                                                    onClick={() => {
                                                        handleClick();
                                                        storeProductDetails();
                                                    }}
                                                    type="button"
                                                    whileTap={{ scale: 1.2 }}
                                                >
                                                    <i class="ri-message-3-fill"> </i>
                                                    Discussion
                                                </motion.button>
                                            </div>


                                            <div className=" btn-ajouter w-75 mt-4">
                                                <motion.button
                                                    type="button"
                                                    whileTap={{ scale: 1.2 }} >
                                                    <i class="ri-contacts-fill">  </i>
                                                    Contact +228 92170365
                                                </motion.button>
                                            </div>

                                            <div className=" btn-ajouter w-75 mt-4">
                                                <motion.button
                                                    type="button"
                                                    whileTap={{ scale: 1.2 }} >
                                                    <i class="ri-whatsapp-line">  </i>
                                                    whatsapp +228 92170365
                                                </motion.button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                : (
                                    <div className="progress-bar-bk">
                                        <CircularProgress color="secondary" />
                                    </div>
                                )}

                    </div>
                </section >

                <section className="product-shop p-5 col-12">
                    <div className='Simil mb-4'>

                        <h2 >Produits Similaires</h2>

                    </div>
                    <div className="container">
                        <div className="row ">
                            {

                                similarProducts.map((row, index) => (
                                    <div key={index} className="item ">
                                        <div className="product card" onClick={() => handleProductClick(item)}>
                                            <Link to={{
                                                pathname: `/dpg/${row.id}`,
                                                state: row
                                            }}>
                                                <div className="product-header  card ">

                                                    <img className="img" src={row.photo} alt="product" />

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
                                ))
                            }
                        </div>
                    </div>
                </section>
            </section>
        </div >
    );
}

export default Produidetails;
