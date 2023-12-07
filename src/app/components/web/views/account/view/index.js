import React, { Component } from 'react'
import { GetCategoryDetails, GetCommercials, GetUserLogin } from '../../../../services';
import '../css/index.css'
import { Row, Col, } from 'reactstrap';
import { motion } from 'framer-motion'
import Moment from 'react-moment'

export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            token: '',
            message: '',
            sendcust: [],
            resadmin: [],
            messages: [],
            isMessageSent: false,
            photo: sessionStorage.getItem('photo') || '',
            nomprod: sessionStorage.getItem('nomprod') || '',
            email: sessionStorage.getItem('email') || '',
            productId: sessionStorage.getItem('productId') || '',
            qty: sessionStorage.getItem('qty') || '',
            prix: sessionStorage.getItem('prix') || '',
            prixF: sessionStorage.getItem('prixF') || '',
            nomF: sessionStorage.getItem('nomF') || '',
            contactF: sessionStorage.getItem('contactF') || '',
            
            localF: sessionStorage.getItem('localF') || '',
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async componentDidMount() {
        let cookies = await GetCommercials.isAuthenticatecom();
        this.setState({ token: cookies })


        let email = sessionStorage.getItem('email')

        if (email) {
            let value = await GetUserLogin.getCustomerDetail(email);
            if (value) {
                this.setState({ user: value.data })

            }
        }

        if (email) {
            let value = await GetUserLogin.getMessageAdmin(email);
            console.log('adimMsg', value)
            if (value) {
                this.setState({ resadmin: value.data })

            }
        }

        if (email) {
            let value = await GetUserLogin.getMessageCust(email);
            console.log('CustMsg', value)
            if (value) {
                this.setState({ sendcust: value.data })

            }
        }

 // Mettez à jour la liste des messages périodiquement (toutes les 5 secondes dans cet exemple)
 this.messageUpdateInterval = setInterval(async () => {
    let value = await GetUserLogin.getMessageAdmin(email);
    if (value) {
      this.setState({ resadmin: value.data });
    }

    let valueCust = await GetUserLogin.getMessageCust(email);
    if (valueCust) {
      this.setState({ sendcust: valueCust.data });
    }

    const combinedMessages = [
      ...this.state.resadmin.map((adminMessage) => ({ ...adminMessage, type: 'admin' })),
      ...this.state.sendcust.map((custMessage) => ({ ...custMessage, type: 'cust' })),
    ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    this.setState({ messages: combinedMessages });
  }, 5000); 
    }

    componentWillUnmount() {
        // Nettoyez l'intervalle lorsque le composant est démonté pour éviter les fuites de mémoire
        clearInterval(this.messageUpdateInterval);
      }


    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }

    handleSubmit = async () => {


        let { message, email } = this.state;

        if (!this.state.isMessageSent && message.trim() !== '') {
            let data = { message: message, email: email, };
            console.log('mesage', data)

            let msg = await GetUserLogin.creatUserMessage(data)
            if (msg) {
                this.setState({ message: '',  });
            }
        }


    }

    handleSubmitproduit = async () => {

        let { photo, nomprod, email ,productId,qty  ,prix , prixF , nomF, contactF, localF } = this.state;

        let Produit = { nomprod: nomprod, photo: photo, email: email, productId :productId ,
            qty:qty, prix :prix, prixF: prixF , contactF: contactF, nomF:nomF , localF: localF
        };

        console.log('listprod', Produit)

        let produitmsg = await GetUserLogin.createProduit(Produit);

        if (produitmsg) {
            this.setState({ currentProduct: {} });
            await sessionStorage.removeItem('nomprod');
            await sessionStorage.removeItem('photo');
            await sessionStorage.removeItem('productId');
            await sessionStorage.removeItem('qty');
            await sessionStorage.removeItem('prix')
            await sessionStorage.removeItem('nomF')
            await sessionStorage.removeItem('contactF')
            await sessionStorage.removeItem('prixF')
            await sessionStorage.removeItem('localF')
        }
    }


    render() {
        let { user, token, photo, nomprod, messages, isMessageSent } = this.state;

        let nomcom = sessionStorage.getItem('nomcom');



        return (
            <div className="wrapper">
               <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">Accueil</li>
                                        <li className="breadcrumb-item active" aria-current="page">Mon profile</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-group">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="user-dt">
                                    <div className="user-img">
                                        <img src="/img/avatar/img-5.jpg" alt />
                                        
                                    </div>
                                    <h4>{user.firstName}</h4>
                                    <p>{user.phone}</p>
                                    {/* <div className="earn-points"><img src="images/Dollar.svg" alt />Points : <span>20</span></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className>
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-3 col-md-4">
                                <div className="left-side-tabs">
                                <div className="left-side-tabs">
                                    <div className="dashboard-left-links">
                                        <a href="/account/view" className="user-item tab "><p><i className="uil uil-apps" />Tableau Bord</p>  </a>
                                        <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />Profile</a>
                                        <a href="/account/order/list" className="user-item"><i className="uil uil-box" />Commande</a>
                                        {token ? (  
                                              <a href="/account/com/voircom/accueil" className="user-item"><i class="ri-account-box-line"></i>Agent Commerciale {nomcom} </a>

) : (
                                        <a href="/account/com/logincom" className="user-item"><i class="ri-account-box-line"></i>Commerciale</a>
                                        )}                       
                                        <a className="user-item" onClick={this.handleLogout}><i className="uil uil-exit" />Deconnexion</a>
                                    </div>

                                </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="dashboard-right bord p-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab mt-4">
                                                <h4><i className="uil uil-apps" />Accueil</h4>
                                            </div>
                                            <div className='text-center mt-4 mb-4' >
                                                <span className=" title  " > {user.firstName} bienvenue sur notre site ecommerce</span>
                                            </div>
                                            <Row>
                                                <Col lg='4'>
                                                    <div className="mt-4">

                                                        {photo && (
                                                            <img
                                                                src={photo}
                                                                alt="Stored Photo"
                                                                style={{ maxWidth: '150px', height: '220px' }}
                                                            />
                                                        )}
                                                        {nomprod && <p style={{ fontSize: '14px', fontWeight: '500', color: '#2b2f4c', margin: '5px' }}>{nomprod}</p>}
                                                    </div>


                                                    {photo && (
                                                        <div className="btn-ajouter w-50 mt-4">
                                                            <motion.button onClick={this.handleSubmitproduit}
                                                                type="button"
                                                                whileTap={{ scale: 1.2 }}>
                                                                Envoyer
                                                            </motion.button>
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col lg='8' className='mt-5'>
                                                    <div className='message'>
                                                        {messages.slice(-10).map((item, index) => (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    padding: 12,
                                                                    margin: 5,
                                                                    borderRadius: 10,
                                                                   
                                                                    alignContent:'space-between',
                                                                    justifyContent:'space-between',
                                                                    height: 'auto', 
                                                                    justifyContent:'space-between',
                                                                ...(item.type === 'admin'                                        
                                                                        ? { marginTop: 10, backgroundColor: 'whitesmoke', alignSelf: 'flex-start', marginRight: '60%' }
                                                                        : { marginTop: 10, backgroundColor: 'blue', alignSelf: 'flex-end', marginLeft: '60%',textAlign: 'right', color:'white' ,}),
                                                                }}
                                                            >
                                                                <div>{item.message}</div>
                                                                <div>
                                                                    <Moment element="span" format=" HH:mm">
                                                                        {item.createdAt}
                                                                    </Moment>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>




                                                    <div className="col-lg-9 col-md-4 mt-4">
                                                        <div className="form-group w-100  d-flex align-items-center">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Message"
                                                                name="message"
                                                                value={this.state.message}
                                                                onChange={(e) => this.handleChange(e)}
                                                               
                                                            />
                                                            <motion.button className='btn-msg ml-2' onClick={this.handleSubmit}>
                                                                <i class="ri-send-plane-2-line send"></i></motion.button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
