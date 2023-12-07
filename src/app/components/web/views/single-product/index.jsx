import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import Slider from "react-slick";
import parse from 'html-react-parser';
import { GetProductDetails } from '../../../services';
import './index.css'
import { motion } from 'framer-motion'
import { cartActions } from '../../../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import { Col , Row } from 'reactstrap';
import "../../../styles/product-card.css";
import Multiselect from 'multiselect-react-dropdown';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';


function SingleProduct(props) {

    const cartItems = useSelector((state) => state.cart.cartItems);

    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const totalQuantity = useSelector(state => state.cart.totalQuantity)

    const history = useHistory();

    const dispatch = useDispatch();


    const [product, setProduct] = useState(null);
    const [selectedCouleur, setSelectedCouleur] = useState([]);
    const [selectedTaille, setSelectedTaille] = useState([]);
    const [selectedphoto, setSelectedPhoto] = useState('');
    const [error, setError] = useState(null); // Add error state
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        async function fetchProductDetails() {
            window.scrollTo(0, 0);
            let url = window.location.href.split('/');
            var lastSegment = url.pop() || url.pop();
            let list = await GetProductDetails.getProductById(lastSegment);
            setProduct(list.data);
            console.log('list',list);

            // Appelez fetchProductSimilar en utilisant chilCategoryId
            fetchProductSimilar(list.data.chilCategoryId);
        }

        async function fetchProductSimilar(chilCategoryId) {
            window.scrollTo(0, 0);
            let similar = await GetProductDetails.getProductSimilar(chilCategoryId);
            setSimilarProducts(similar.data);
            console.log('similar', similar);
        }

        fetchProductDetails();
    }, []);





    const settings = {
        customPaging: function (i) {
            return (
                <div id="sync1" className="owl-carousel">
                    <div className={`product mt-3 ${product.productphotos[i].photo === selectedphoto ? 'selected' : ''}`}>
                      <div className='card'>
                      <img
                            src={product.productphotos[i].photo}
                            className="img-fluide "
                            onClick={() => setSelectedPhoto(product.productphotos[i].photo)}
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

    const addToCartWithSizeAndColor = (item, selectedTaille, selectedCouleur, selectedphoto) => {
        try {
            dispatch(
                cartActions.addItem({
                    id: item.id,
                    nomprod: item.nomprod,
                    prix: item.prix,
                    qty: item.qty,
                    prixF: item.prixF,
                    nomF: item.nomF,
                    contactF: item.contactF,
                    localF: item.localF,
                    adresseF:item.adresseF,
                    categoryId: item.categoryId,
                    chilCategoryId: item.chilCategoryId,
                    productphotos: {
                        taille: selectedTaille,
                        photo: selectedphoto,
                        couleur: selectedCouleur
                    },
                })
            );

            // Show success notification
            NotificationManager.success("Le produit à été ajouté au panier", "Success");
        } catch (error) {
            setError(error.message); // Set error state
            // Show error notification
            NotificationManager.error("Veuillez ajouter  la taille et le couleur", "Error");
        }
    };

    const handleProductClick = (item) => {
        window.location.href = `/p/${item.id}`;
        window.location.reload(); // Recharge la page lorsque l'utilisateur clique sur le lien
    }

    
    const handleClick = () => {
        // Pour naviguer vers une autre route
        window.location.href ='/account/view';
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
            sessionStorage.setItem('adresseF', product.adresseF);
           

        }
    };



    return (
        <div>
            <section className="pt-3  ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12  ">
                            <a href="/"><strong><span className="mdi mdi-home" /> Accueil</strong></a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shop-single section-padding pt-3 mb-5 ">
                <div className="container">
                    {
                        product ?
                            <Row className="magin ">
                                <Col lg="6" className="magin ">
                                    <Paper className="card ">
                                        <Slider {...settings}>

                                            {

                                                product.productphotos ?
                                                    product.productphotos.map((r, index) => {
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
                                <Col lg='6' >
                                    <div className="shop-detail-right ">
                                       
                                       <div className='nomprod'>
                                       <h2>{product.nomprod}</h2>
                                       </div>

                                        <div className='d-flex gap-2 text-align-items-center  '>
                                            <div className="pdp-product__new-price">
                                                <span className="pdp-product__price--new">{product.prix} Fcfa</span>
                                            </div>
                                            <div className="space ml-5  ">
                                                <span className="space"></span><span className=""><strike > {product.ancienprix} Fcfa  </strike></span>
                                            </div>

                                        </div>

                                       <div  className="desc">
                                       <span >{product.description} </span>
                                       </div>


                                        <div className="d-flex  justify-content couleur">
                                            {product.productphotos.map((r, index) => (
                                                <div className="form-check form-check-inline" key={index}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`colorCheckbox-${index}`}
                                                        value={r.couleur}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedCouleur((prevColors) => [...prevColors, r.couleur]);

                                                            } else {
                                                                setSelectedCouleur((prevColors) =>
                                                                    prevColors.filter((color) => color !== r.couleur)
                                                                );

                                                            }
                                                            console.log('couleur',setSelectedCouleur)
                                                            setSelectedPhoto(r.photo)
                                                           
                                                        }}
                                                    />
                                                    <label className="form-check-label h-5 " htmlFor={`colorCheckbox-${index}`}>
                                                        <div
                                                            className="btn-color "
                                                            style={{ background: `${r.couleur}` }}
                                                        ></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        <div className=" taill " >
                                            <Multiselect
                                                className="p-2 form-select-sm w-50 "
                                                options={product.productphotos.map((r) => ({ value: r.taille, label: r.taille }))}
                                                onSelect={(selectedList) => {
                                                    // Utilisez map pour extraire les valeurs des éléments sélectionnés
                                                    const selectedTailleValues = selectedList.map((item) => item.value);
                                                    setSelectedTaille(selectedTailleValues);
                                                    ; // Met à jour les tailles sélectionnées
                                                    console.log('tialle', setSelectedTaille)
                                                }}
                                                displayValue="label"
                                                placeholder="Select tailles"
                                            />
                                        </div>

                                        <div className=" btn-ajouter w-75 ">

                                            <motion.button
                                                type="button"
                                                whileTap={{ scale: 1.2 }}

                                                onClick={() => {
                                                    if (selectedTaille && selectedCouleur && selectedphoto) {
                                                        addToCartWithSizeAndColor(product, selectedTaille, selectedCouleur, selectedphoto);
                                                    } else {

                                                        NotificationManager.error("Veuillez sélectionner la taille , la couleur et clique sur la photo  avant d'ajouter au panier", "Error");
                                                    }
                                                }}
                                                required
                                            >
                                                AJOUTER  AU PANIER
                                            </motion.button>

                                        </div>

                                        
                                        <div className=" btn-ajouter w-75 mt-5 mb-4">
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

                            similarProducts.map((item, index) => (
                                <div key={index} className="item ">
                                <div className="product card"  onClick={() => handleProductClick(item)}>
                                    <Link  to={`/p/${item.id}`}
                                    >
                                        <div className="product-header  card ">

                                            <img className="img" src={item.photo} alt="product" />

                                        </div>

                                    </Link>
                                    <div className='justify-content-center pt-3'>
                                        <h4>{item.nomprod}</h4>
                                    </div>
                                    <div className="d-flex align-items justify-content-between mt-3 ">
                                            <span className="price ">{item.prix} Fcfa </span>
                                              <strike className="anprice " >{item.ancienprix} Fcfa</strike>
                                        </div>
                                </div>
                            </div>
                            ))
                        }
                    </div>

                    
                </div>
            </section>

        </div >
    );
}

export default SingleProduct;
