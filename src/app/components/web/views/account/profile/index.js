import React, { Component } from 'react'
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from "react-notifications";
import '../css/index.css'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '', user: '', firstName: '', lastName: '', phoneNo: '', email: '', password : ''
        };
    }
    handleChangeUser(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          user: {
            ...this.state.user,
            [name]: value
          }
        });
      }
    async componentDidMount() {
        let email = sessionStorage.getItem('email')
        if (email) {
            let value = await GetUserLogin.getCustomerDetail(email);
            console.log('liste',value)
            if (value) {
                this.setState({ user: value.data })
            }
        }
    }
    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { id, firstName, lastName, phone, email, gender, password } = this.state.user;
        const data = { id: id, firstName: firstName, lastName: lastName, phone: phone, email: email, gender: gender,password :password };
        let user = await GetUserLogin.getCustomerUpdate(data);
        if (user) {
          NotificationManager.success("Successfully Update", "Profile");
        }
        else {
          NotificationManager.error("Please check your Field", "Input Error");
        }
    
      }
    render() {
        let { user } = this.state;
        console.log("Profile -> render -> user", user)
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
                                        <a className="user-item" onClick={this.handleLogout}><i className="uil uil-exit" />Deconnexion</a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="dashboard-right card card-body account-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab">
                                                <h4><i className="uil uil-box" />Modifier votre Profile</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Prenom <span className="required">*</span></label>
                                                                <input className="form-control border-form-control" type="text" name="firstName" value={user.firstName} onChange={(e) => this.handleChangeUser(e)}  />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Nom <span className="required">*</span></label>
                                                                <input className="form-control border-form-control" type="text" name="lastName" value={user.lastName} onChange={(e) => this.handleChangeUser(e)}  />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Contact <span className="required">*</span></label>
                                                                <input className="form-control border-form-control" type="number" name="phone" value={user.phone} onChange={(e) => this.handleChangeUser(e)}  />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Adresse Email <span className="required">*</span></label>
                                                                <input className="form-control border-form-control " disabled type="email" value={user.email} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                    <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Mot de Passe <span className="required">*</span></label>
                                                                <input className="form-control border-form-control "  type="text" name='password'  placeholder='Entrer le nouveau mot de passe'  onChange={(e) => this.handleChangeUser(e)}  />
                                                            </div>
                                                        </div>
                                                        </div>
                                                    <div className="row">
                                                        <div className="form-group col-lg-6">
                                                            <label>Sexe</label>
                                                            <div className="chek-form">

                                                                <div className="custome-radio form-check-inline">
                                                                    {user.gender === "Male" ?
                                                                        <input className="form-check-input" type="radio" name="gender" id="exampleRadios1" defaultValue="Male" onChange={(e) => this.handleChangeUser(e)} checked /> :

                                                                        <input className="form-check-input" type="radio" name="gender" id="exampleRadios1" defaultValue="Male" onChange={(e) => this.handleChangeUser(e)} />
                                                                    }
                                                                    <label className="form-check-label" htmlFor="exampleRadios1">Homme</label>
                                                                </div>
                                                                <div className="custome-radio form-check-inline">
                                                                    {user.gender === "Female" ?
                                                                        <input className="form-check-input" type="radio" name="gender" id="exampleRadios2" defaultValue="Female" onChange={(e) => this.handleChangeUser(e)} checked />
                                                                        :
                                                                        <input className="form-check-input" type="radio" name="gender" id="exampleRadios2" defaultValue="Female" onChange={(e) => this.handleChangeUser(e)} />
                                                                    }
                                                                    <label className="form-check-label" htmlFor="exampleRadios2">Femme</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12 text-right">
                                                            
                                                            <button type="button" className="btn btn-success btn-lg"  onClick={this.handleSubmit}>Enregistrer </button>
                                                        </div>
                                                    </div>
                                                </form>
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
