import React, { Component } from 'react';
import { GetCategoryDetails, GetOrderDetails, GetUserLogin } from '../../../../../services';
import Moment from 'react-moment';
import 'moment/locale/fr'; 
import '../../css/index.css'


export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            cartproduct: null,
            montant: '',
        };
    }

    async componentDidMount() {
        let email = sessionStorage.getItem('email');
        if (email) {
            let value = await GetUserLogin.getCustomerDetail(email);
            if (value) {
                this.setState({ user: value.data });
            }
        }

        let prix = await GetCategoryDetails.getAffichebytitre('montant');

        this.setState({ montant: prix.data });

        console.log('mont', prix)

        // Récupérez le dernier segment de l'URL ici et effectuez la requête pour les détails de la commande
        window.scrollTo(0, 0)
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        let list = await GetOrderDetails.getOrderProductById(lastSegment);
        console.log('cartlist', list);
        this.setState({ cartproduct: list.data });
    }


  

    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }
    render() {
       
        const { cartproduct, user,montant } = this.state;
        return (
            <div className="wrapper">
                <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">Accueil</li>
                                        <li className="breadcrumb-item active" aria-current="page">Commande</li>
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
                                    <div className="dashboard-left-links">
                                        <a href="/account/view" className="user-item tab "><p><i className="uil uil-apps" />Tableau Bord</p>  </a>
                                        <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />Profile</a>
                                        <a href="/account/order/list" className="user-item"><i className="uil uil-box" />Commande</a>
                                        <a className="user-item" onClick={this.handleLogout}><i className="uil uil-exit" />Deconnexion</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="dashboard-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab">
                                                <h4><i className="uil uil-box" />Liste de Commande</h4>
                                            </div>
                                        </div>


                                        <div className="col-lg-12 col-md-12">
                                            {cartproduct ? (
                                                <div className="pdpt-bg">
                                                    
                                                    <div className="order-body10">
                                                        <div className="table-responsive">
                                                            <table className="table ucp-table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: 50 }}>#</th>
                                                                        <th   >Image</th>
                                                                        <th>Nom_Produit</th>
                                                                        <th style={{ width: 150 }} className="text-center">Couleur</th>
                                                                        <th style={{ width: 150 }} className="text-center">Taille</th>
                                                                        <th style={{ width: 150 }} className="text-center">Prix</th>
                                                                        <th style={{ width: 150 }} className="text-center">Qty</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {cartproduct.Carts.map((p, index) => (
                                                                        <tr key={index}>
                                                                            <td>{p.id}</td>
                                                                            <td >
                                                                                <img src={p.photo} alt="cart" style={{ height: '50px' }} />
                                                                            </td>
                                                                            <td>{p.name}</td>
                                                                            <td className="text-center">
                                                                                {p.couleur.split(', ').map((color, colorIndex) => (
                                                                                    <span key={colorIndex}>
                                                                                        <input
                                                                                            type="button"
                                                                                            className="btn-color2 m-1"
                                                                                            style={{ background: color }}
                                                                                        />
                                                                                    </span>
                                                                                ))}
                                                                            </td>
                                                                            <td className="text-center">{p.taille}</td>
                                                                            <td className="text-center">{p.total} Fcfa</td>
                                                                            <td className="text-center">{p.qty}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div className="total-dt"> 
                                                        <div className="total-checkout-group">
                                                                <div className="cart-total-dil pt-3">
                                                                    <h4>Reduction </h4>

                                                                        <span>{cartproduct.Reduction || 0} Fcfa </span>
                                                                   

                                                                </div>
                                                            </div>
                                                            <div className="total-checkout-group">
                                                                <div className="cart-total-dil pt-3">
                                                                    <h4>Livraison </h4>

                                                                    {cartproduct.TotalCart >=  montant.description ? (
                                                                        <span>Livraison gratuite</span>
                                                                    ) : (
                                                                        <span>{cartproduct.prixlocalite} Fcfa </span>
                                                                    )}

                                                                </div>
                                                            </div>
                                                            <div className="main-total-cart">
                                                                <h2>Total payer</h2>


                                                                <span>{cartproduct.GrandTotal} Fcfa</span>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
