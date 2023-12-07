import React, { useState, useEffect } from 'react';

import { NotificationManager } from 'react-notifications';
import { GetUserLogin, GetOrderDetails, CartHelper, GetCommercials, GetCategoryDetails } from '../../../services';
import Deliverydetails from './delivery';
import Loader from '../../../../loader';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../redux/slices/cartSlice';
import './style/index.css'
import { Row, Col, } from 'reactstrap';


function Checkout(item) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [subTotal, setSubTotal] = useState('');
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [TotalRecduction, setTotalRecduction] = useState(0);
    const [email, setEmail] = useState('');
    const [customer, setCustomer] = useState('');
    const [paymentmethod, setPaymentMethod] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [codeBonnus, setCodeBonnus] = useState('');
    const [recupcodeBonnus, setRecupCodeBonnus] = useState('')
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [getList, setList] = useState([]);
    const [local, setLocal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLocal, setSelectedLocal] = useState([])
    const [selectedLocalInfo, setSelectedLocalInfo] = useState(null);
    const [totalLivaison, setTotalLivairson] = useState(0);
    const [reduit, setReduit] = useState(0);
    const [montant, setMontant] = useState(0);

    const [payement, setPayement] = useState([])
    const [money, setMoney] = useState([])
    const [flooz, setFlooz] = useState([])
    const [livr, setLivr] = useState([])
    const [reduct, setReduct] = useState([])
    const [express, setExpress] = useState([])
    const [livexpress, setLivExpress] = useState(null)
    const [livre, setLivre] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showNestPasDansListeModal, setShowNestPasDansListeModal] = useState(false);
    const [showListeModal, setShowListeModal] = useState(false);
    const [totalLivRed, setTotalLivReduc] = useState(0);


    const dispatch = useDispatch();
    const totalQty = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => state.cart.cartItems);


    const handleRadioChange = (event) => {
        const selectedPaymentMethod = event.target.value;
        setPaymentMethod(selectedPaymentMethod);
        setShowModal(true);
    };


    // Fonction pour fermer le modal
    const closeModal = () => {
        setShowModal(false);
    };


    const handleChange = (e) => {
        setCodeBonnus(e.target.value); // Update with the value of the input field
    }

    const [isExpressSelected, setIsExpressSelected] = useState(false);


    const handleRedChange = () => {
        setShowNestPasDansListeModal(true);
    }

    const closeModalExpress = () => {
        setShowNestPasDansListeModal(false);
    };

    const handleConfimer = (e) => {
        const Expressprix = e.target.value;
        console.log('expressli', Expressprix)
        setLivExpress(Expressprix)
        setIsExpressSelected(!isExpressSelected);
    }



    useEffect(() => {
        async function fetchData() {
            let email = sessionStorage.getItem('email');


            if (email) {
                let user = await GetUserLogin.getCustomerDetail(email);
                if (user) {
                    setCustomer(user.data);
                    setEmail(email);
                }
            }

        }

        fetchData();
    }, []);


    const titre = 'localvideo';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetCategoryDetails.getafficheVideohome(titre);
                console.log(response);
                setList(response.data);
                setLoading(false); // Set loading to false when data is loaded
            } catch (error) {
                console.error(error);
                setLoading(false); // Set loading to false on error
            }
        }

        fetchData();
    }, [titre]);


    useEffect(() => {
        async function fetchTitre() {

            let response = await GetCategoryDetails.getTitleList('payement');

            setPayement(response.data);

            let resmoney = await GetCategoryDetails.getAffichebytitre('T-Money');
            setMoney(resmoney.data)

            let resflooz = await GetCategoryDetails.getAffichebytitre('Flooz');
            setFlooz(resflooz.data)

            let resLiv = await GetCategoryDetails.getAffichebytitre('  A la Livraison');
            setLivr(resLiv.data)

            let resReduct = await GetCategoryDetails.getAffichebytitre('Reduct');
            setReduct(resReduct.data)

            let Mont = await GetCategoryDetails.getAffichebytitre('montant');
            setMontant(Mont.data)

            let exp = await GetCategoryDetails.getAffichebytitre('express');
            setExpress(exp.data)

            let prixL = await GetCategoryDetails.getAffichebytitre('Liste');
            setLivre(prixL.data)

        }

        fetchTitre();
    }, []);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetCategoryDetails.getlocalList();
                console.log(response);
                setLocal(response.data);
                setLoading(false); // Set loading to false when data is loaded
            } catch (error) {
                console.error(error);
                setLoading(false); // Set loading to false on error
            }
        }

        fetchData();
    }, []);




    const handleDeliveryAddress = (value) => {
        setDeliveryAddress(value);
    };

    const vider = () => {
        dispatch(cartActions.viderPanier());
    };



    const handleLocalSelection = (localId) => {
        if (selectedLocal.includes(localId)) {

            setSelectedLocal([]);
        } else {

            setSelectedLocal([localId]);
            setShowListeModal(true);
        }
    };



    useEffect(() => {
        // Récupère les informations de la localité sélectionnée
        const selected = local.find((localItem) => localItem.id === selectedLocal[0]);
        // Met à jour l'état selectedLocalInfo avec les informations de la localité sélectionnée
        console.log('selectionner', selected)
        setSelectedLocalInfo(selected);
    }, [selectedLocal, local]);

    const m = reduct.description
    console.log('reductionprix', m)




    const handleReduction = async (e) => {
        e.preventDefault();

        const data = { codeBonnus };
        console.log(data);
        const valide = await GetCommercials.getCommmercialBonnus(data);

        if (valide) {

            const code = codeBonnus;
            NotificationManager.success('Success', 'Reduction effectue');
            setTotalRecduction(totalAmount - ((totalAmount * m) / 100));
            const reductionPrix = ((totalAmount * m) / 100)
            setReduit(reductionPrix)
            setRecupCodeBonnus(code)
        } else {
            NotificationManager.error('Le code de réduction ne correspond à aucun code', 'Input Error');
            setTotalRecduction(totalAmount);
        }

        setIsButtonClicked(true);
    };


    const prixRabais = montant.description

    console.log('montant', prixRabais)

    useEffect(() => {
        // Mettez à jour totalAmount lorsque selectedLocalInfo change
        if (selectedLocalInfo) {
            if (totalAmount < prixRabais) {
                setTotalLivairson(totalAmount + selectedLocalInfo.prix);

            } else {
                setTotalLivairson(totalAmount)
            }

        }
    }, [selectedLocalInfo, totalAmount]);

    useEffect(() => {
        if (selectedLocalInfo) {
            let updatedTotalAmount = TotalRecduction;
            if (totalAmount < prixRabais) {
                const Somme = updatedTotalAmount + selectedLocalInfo.prix;
                setTotalLivReduc(Somme);
            }
        }
    }, [selectedLocalInfo, totalAmount, TotalRecduction]);


    console.log('totalReduction', TotalRecduction)
    console.log('totalReductionLiv', totalLivRed)
    console.log('totalLiv', totalLivaison)


    useEffect(() => {
        async function fetchData() {

            let code = await sessionStorage.getItem('code');

            console.log('code', code)
            setRecupCodeBonnus(code)
        }

        fetchData();
    }, []);



    console.log('codevalide', recupcodeBonnus)

    console.log('deliveryAddress', deliveryAddress)

    const handlePlaceOrder = async (event) => {
        event.preventDefault();

        if (!selectedLocalInfo) {
            NotificationManager.error('Veuillez sélectionner une localité avant de passer la commande', 'Erreur');
            return;
        }

        if (!deliveryAddress) {
            NotificationManager.error('Veuillez entrer une adresse de livraison avant de passer la commande', 'Erreur');
            return;
        }

        const orderId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

        const data = {
            customerId: customer.id,
            customerEmail: customer.email,
            orderId: orderId,
            Reduction: reduit,
            TotalCart: totalAmount,
            GrandTotal: grandTotal,
            TotalLivraison: totalLivaison,
            TotalLivRed: totalLivRed,
            express: livexpress,
            TotalReduction: TotalRecduction,
            codeBonnus: recupcodeBonnus,
            paymentmethod: paymentmethod,
            deliveryAddress: deliveryAddress,
            products: cartItems,
            localite: selectedLocalInfo.local,
            prixlocalite: LivraisonPrix,
            km: selectedLocalInfo.km

        };

        if (data) {
            let order = await GetOrderDetails.getOrderCreateByUser(JSON.stringify(data));
            if (order) {
                NotificationManager.success('Commande passée avec succès', 'Commande');
                vider();
                await GetCommercials.codeBonnusdelete();
                setTimeout(
                    async function () {
                        window.location.href = '/order/success';

                    },
                    1000
                );
            } else {
                NotificationManager.error("La commande est refusée", 'Commande');
                setTimeout(async function () {
                    window.location.href = '/order/failed';
                }, 1000);
            }
        }
    };


    const grandTotal =
        isButtonClicked ?
            (totalAmount >= prixRabais ? TotalRecduction : totalLivRed) :
            totalLivaison;

    const LivraisonPrix =
        totalAmount >= prixRabais ? 'Livraison gratuite' : selectedLocalInfo ? `${selectedLocalInfo.prix} Fcfa` : '';


    return (
        <div>
            <section className="pt-3 pb-3 page-info section-padding border-bottom  single-product-header-bk">

                <section className="checkout-page section-padding">
                    <div className="contenu">
                        {isLoaded ? <Loader /> : ''}
                        <Row >
                            <Col lg='7' className='magin'>
                                <div className="checkout-step">
                                    <div className="accordion" id="accordionExample">
                                        <div className="card checkout-step-one">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link checkout-login-bk" disabled>
                                                        <span className="number">1</span> Connecté{' '}
                                                        <span className="mdi mdi-checkbox-marked-circle-outline"></span>
                                                    </button>
                                                    <div className="_2jDL7w">
                                                        <div>
                                                            <span className="dNZmcB">{customer.firstName} </span>
                                                            <span className="_3MeY5j">{email}</span>
                                                        </div>
                                                    </div>
                                                </h5>
                                            </div>
                                        </div>




                                        <div className="card checkout-step-one">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0">
                                                    <button
                                                        className="btn btn-link collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwo"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwo"
                                                    >
                                                        <span className="number">3</span> Prix de Livraison
                                                    </button>
                                                </h5>
                                            </div>
                                            <div
                                                id="collapseTwo"
                                                className="collapse"
                                                aria-labelledby="headingTwo"
                                                data-parent="#accordionExample"
                                            >
                                                {local.map((row, index) => (
                                                    <div className=" local1 p-3">
                                                        <div className=" local2 " key={index} >
                                                            <span className="loc">{row.local}</span>

                                                            <span className="prie">{row.prix} Fcfa</span>
                                                        </div>


                                                        <div>
                                                            <input
                                                                className="form-check-input "
                                                                type="checkbox"
                                                                checked={selectedLocal.includes(row.id)}
                                                                onChange={() => handleLocalSelection(row.id)}
                                                            />
                                                        </div>
                                                    </div>

                                                ))}

                                            </div>
                                        </div>

                                        {showListeModal && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h3 className="modal-title">Lieu de Livraison </h3>
                                                        <button
                                                            type="button"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            aria-label="Close"
                                                            onClick={() => setShowListeModal(false)}
                                                        >
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    {selectedLocalInfo && selectedLocalInfo.ville === "Liste" && (
                                                        <div>
                                                            <div className="modalpaye">

                                                                <span className="descr mt-3">{livre.description}</span>
                                                            </div>
                                                            <div className="comm">
                                                                <span className="com">{livre.desc}</span>
                                                            </div>
                                                        </div>
                                                    )}


                                                    {selectedLocalInfo && (
                                                        <div className="selected-local mt-3 comm">
                                                            <p className="loc ">Localité  :  {selectedLocalInfo.local}</p>
                                                            <p className="pri">Prix  :  {selectedLocalInfo.prix} FCFA</p>
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                        )}


                                        <div className="card checkout-step-two">
                                            <div className="card-header" id="headingsix">
                                                <h5 className="mb-0">
                                                    <button
                                                        className="btn btn-link collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapsesix"
                                                        aria-expanded="false"
                                                        aria-controls="collapsesix"
                                                    >
                                                        <span className="number">4</span> Adresse de Livraison
                                                    </button>
                                                </h5>
                                            </div>
                                            <div
                                                id="collapsesix"
                                                className="collapse"
                                                aria-labelledby="headingsix"
                                                data-parent="#accordionExample"
                                            >
                                                <Deliverydetails onSelectDeliveryAddress={handleDeliveryAddress} />
                                            </div>
                                        </div>

                                        <div className="card checkout-step-one">
                                            <div className="card-header" id="headingfour">
                                                <h5 className="mb-0">
                                                    <button
                                                        className="btn btn-link collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapsefour"
                                                        aria-expanded="false"
                                                        aria-controls="collapsefour"
                                                    >
                                                        <span className="number">4</span> Livraison Express
                                                    </button>
                                                </h5>
                                            </div>
                                            <div
                                                id="collapsefour"
                                                className="collapse"
                                                aria-labelledby="headingfour"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="d-flex justify-content-center  mt-4 mb-4">
                                                    <button name={livexpress} value='express'
                                                        className={`express-btn  ${isExpressSelected ? 'selected' : ''}`}
                                                        onClick={handleRedChange}
                                                    >
                                                        Livraison Express
                                                    </button>
                                                </div>
                                                {showNestPasDansListeModal && (
                                                    <div className="modal">
                                                        <div className="modal-content">
                                                            <div className="modal-header d-flex justify-content-center text-center">
                                                                <h3 className="modal-title ">Livraison Express</h3>

                                                            </div>

                                                            <div>
                                                                <div className="comm mt-3">

                                                                    <span className="descr">{express.description}</span>
                                                                </div>
                                                                <div className="comm">
                                                                    <span className="com">{express.desc}</span>
                                                                </div>
                                                                <div className="comm">
                                                                    <span className="com">{express.title}</span>
                                                                </div>

                                                                <div className='d-flex align-items-center justify-content-between' >
                                                                    <button
                                                                        name={livexpress}
                                                                        value="express"
                                                                        className="express-btn-confimer"
                                                                        onClick={(e) => {
                                                                            handleConfimer(e);
                                                                            closeModalExpress();
                                                                        }}
                                                                    >
                                                                        Confirmer
                                                                    </button>


                                                                    <button name={livexpress} value='express'
                                                                        className='express-btn-annuler '
                                                                        onClick={closeModalExpress}
                                                                    >
                                                                        Annuler
                                                                    </button>
                                                                </div>

                                                            </div>






                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                        <div className="card  checkout-step-one ">
                                            <div className="card-header" id="headingseven">
                                                <h5 className="mb-0">
                                                    <button
                                                        className="btn btn-link collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseseven"
                                                        aria-expanded="false"
                                                        aria-controls="collapseseven"
                                                    >
                                                        <span className="number">3</span> Payement
                                                    </button>
                                                </h5>
                                            </div>
                                            <div
                                                id="collapseseven"
                                                className="collapse"
                                                aria-labelledby="headingsseven"
                                                data-parent="#accordionExample"
                                            >

                                                <div className="payment_method-checkout">
                                                    <div className="row align-items-center">

                                                        <div className="col-md-12">
                                                            <div className="rpt100 d-flex align-items-center justify-content-between mt-5 mb-3 ml-4">
                                                                <ul className="radio--group-inline-container_1 d-flex align-items-center">
                                                                    {payement.map((item, index) => (
                                                                        <li className="radio-item_1 mr-2  ml-2" key={index}>
                                                                            <input
                                                                                id={`paymentMethod${index}`}
                                                                                value={item.titre}
                                                                                name="paymentmethod"
                                                                                type="radio"
                                                                                onChange={handleRadioChange}
                                                                                checked={paymentmethod === item.titre}
                                                                            />
                                                                            <label htmlFor={`paymentMethod${index}`} className="radio-label_1">
                                                                                {item.titre}
                                                                            </label>
                                                                        </li>
                                                                    ))}
                                                                </ul>

                                                            </div>
                                                            {paymentmethod && paymentmethod !== 'cash' && (
                                                                <div className=" d-flex   justify-content-center  mb-4  ">



                                                                    <button className="next-btn16 hover-btn" onClick={handlePlaceOrder}>
                                                                        CONFIRMER LA COMMANDE
                                                                    </button>

                                                                </div>

                                                            )}
                                                        </div>


                                                        <div>
                                                            {showModal && (
                                                                <div className="modal  ">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h3 className="modal-title">
                                                                                Payement</h3>
                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                                                                <span aria-hidden="true">×</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            {paymentmethod === 'T-Money' &&
                                                                                <div>
                                                                                    <div className='modalpaye'>
                                                                                        <h3> {money.titre} :</h3>
                                                                                        <span className='descr' > {money.description}</span>
                                                                                    </div>
                                                                                    <div className='comm'>
                                                                                        <span className='com' >{money.desc}</span>
                                                                                    </div>
                                                                                </div>


                                                                            }
                                                                            {paymentmethod === 'Flooz' &&
                                                                                <div>
                                                                                    <div className='modalpaye'>
                                                                                        <h3 > {flooz.titre} :</h3>
                                                                                        <span className='descr' >{flooz.description}</span>
                                                                                    </div>
                                                                                    <div className='comm'>
                                                                                        <span className='com'>{flooz.desc}</span>
                                                                                    </div>
                                                                                </div>
                                                                            }

                                                                            {paymentmethod === 'A la Livraison' &&
                                                                                <div className='comm'>
                                                                                    <span className='com '>{livr.desc} </span>
                                                                                </div>
                                                                            }

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg='5 ' >
                                {cartItems && cartItems.length === 0 ? (
                                    <h5 className='fs-4 text-center'>Aucun produit acheté</h5>
                                ) : (


                                    <div className="card">
                                        <h5 className="card-header">
                                            Panier <span className="text-secondary float-right">({cartItems.length} Produits)</span>
                                        </h5>
                                        <div className="button_price">
                                            <input type="text" className="form-control reduction" name="codeBonnus" value={codeBonnus} onChange={handleChange} />
                                            <div className="form-group">
                                                <button className="checkprice" variant="contained" onClick={handleReduction} >Valide</button>
                                            </div>
                                        </div>
                                        {cartItems.map((item) => (
                                            <div className="card-body pt-0 pr-0 pl-0 pb-0" key={item.id}>
                                                <div className="cart-list-product">
                                                    <Row>
                                                        <Col lg='5'>
                                                            <img
                                                                className="img-flude "
                                                                src={JSON.parse(item.productphotos).photo}
                                                                alt="cart"
                                                            />
                                                        </Col>
                                                        <Col lg='7'>
                                                            <div className='produit '>
                                                                <div className="main-produit">
                                                                    <span >Nom :</span>

                                                                    <span>{item.nomprod}</span>
                                                                </div>

                                                                <div className="main-produit">
                                                                    <span >Quantité : </span>
                                                                    <div className="cart-item-price">{item.qty}</div>
                                                                </div>

                                                                <div className="main-produit">
                                                                    <span > Prix_Unitaire : </span>
                                                                    <span>{item.prix} Fcfa</span>
                                                                </div>

                                                                <div className="main-produit">
                                                                    <span  >Taille : </span>

                                                                    <span> {JSON.parse(item.productphotos).taille.join("  |  ")}</span>
                                                                </div>

                                                                <div className="main-produit">
                                                                    <span >Couleur :</span>
                                                                    <span > {JSON.parse(item.productphotos).couleur.map((color, index) => (
                                                                        <motion.input
                                                                            key={index}
                                                                            type="button"
                                                                            className="btn-color2  m-1"
                                                                            style={{ background: color }}
                                                                        />
                                                                    ))}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="total-produit man-produit">
                                                        <h4>Total_Produit :</h4>
                                                        <span >{item.qty * item.prix} Fcfa </span>
                                                    </div>


                                                </div>
                                            </div>
                                        ))}
                                        {selectedLocalInfo && (


                                            <div className="main-total-liv mb-3">
                                                <h2>Livraison :</h2>

                                                <span>{LivraisonPrix} </span>

                                            </div>



                                        )}

                                        <div className="main-total-reduit">
                                            <h2>Reduction :</h2>
                                            {isButtonClicked ? <span>{reduit} Fcfa</span> : <span></span>}
                                        </div>
                                        <div className="main-total-cart justify-content-between">
                                            <h2>Total A PAYER :</h2>


                                            <span>{grandTotal} Fcfa</span>
                                        </div>

                                    </div>

                                )}
                            </Col>

                        </Row>
                    </div>
                </section >

            </section >
        </div >
    );
}

export default Checkout;
