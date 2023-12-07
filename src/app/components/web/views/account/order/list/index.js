import React, { Component } from 'react';
import { GetUserLogin, GetOrderDetails } from '../../../../../services';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import '../../css/index.css'
import Moment from 'react-moment';
import 'moment/locale/fr'; // Importe la locale française
import { Row } from 'reactstrap';




export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '', orderList: []
        };
    }

    async componentDidMount() {
        let email = sessionStorage.getItem('email')
        if (email) {
            let value = await GetUserLogin.getCustomerDetail(email);
            if (value) {
                this.setState({ user: value.data })
            } else {
                NotificationManager.error("Check your credential", "Login");
            }
        }

    }
    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }

    
   
    render() {
        let { user, orderList } = this.state;
        console.log("List -> render -> orderList", user)

        const formatDate = (date) => {
            const d = new Date(date);
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const day = d.getDate().toString().padStart(2, '0');
            const year = d.getFullYear();
            return [year, month, day].join('-');
        }


        return (
            <div className="wrapper">
                <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">Accueil</li>
                                        <li className="breadcrumb-item active" aria-current="page">Commandes</li>
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
                                    <p> {user.phone}</p>
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
                                                <h4><i className="uil uil-box" />Commandes</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="pdpt-title">
                                                    <h6>Liste de Commande</h6>
                                                </div>
                                                <div className="order-body10">

                                                    <div class="card card-body account-right">
                                                        <div class="widget">
                                                            <div class="order-list-tabel-main table-responsive">
                                                                <table class="datatabel table table-striped table-bordered order-list-tabel" width="100%" cellspacing="0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>N° Commande</th>
                                                                            <th>Date d' Achat</th>
                                                                            <th>Date de Livraison</th>
                                                                           
                                                                            <th>Status</th>
                                                                            <th>Date  Livré</th>
                                                                            <th>Payement</th>
                                                                            <th>Total</th>
                                                                            <th>Commande</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            user ?
                                                                                user.Orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                                                                .slice(0, 10)
                                                                                .map((row, index) => (
                                                                                    <tr key={index}>
                                                                                        <td style={{color:'#f55d2c', fontSize: '16px' }} >{row.number}</td>
                                                                                        <td>{formatDate(row.createdAt)}</td>
                                                                                        {row.Addresses.map((adresse, index) => (
                                                                                            <td key={index}> {formatDate(adresse.dateL)}  </td>
                                                                                        ))}
                                                                                       
                                                                                        <td>
                                                                                            {row.status === "Traitement" ?
                                                                                                <span className="badge badge-info">Traitemnt</span> :
                                                                                                row.status === "Annuler" ?
                                                                                                    <span className="badge badge-danger">Annulation</span> :
                                                                                                    row.status === "Livraison" ?
                                                                                                        <span className="badge btn-primary">Livraison</span> :
                                                                                                        row.status === "Livre" ?
                                                                                                            <span className="badge badge-success">Livré</span> :
                                                                                                            <span className="badge badge-warning">Retardé</span>
                                                                                            }

                                                                                        </td>
                                                                                        <td >{row.deliverydate ? formatDate(row.deliverydate)  : ''}</td>
                                                                                        <td style={{ fontSize: '12px' }}>{row.paymentmethod} </td>
                                                                                        <td style={{color:'#f55d2c', fontSize: '14px' }}>{row.GrandTotal} Fcfa </td>
                                                                                        <td>
                                                                                            <Link
                                                                                                className="btn btn-info btn-sm"
                                                                                                to={{ pathname: `/account/order/details/${row.id}`, query: row }}
                                                                                            >
                                                                                                <i className="mdi mdi-eye"></i>
                                                                                            </Link>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                                : <p>Loading...</p>
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
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
