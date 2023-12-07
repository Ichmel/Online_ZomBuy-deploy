import React, { Component } from 'react'
import { GetCommercials } from '../../../../../../services';
import { NotificationManager } from "react-notifications";



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            token: '',
            firstName: '',
            phone: '',
            adresse:'',
            phoneNo: '',
            
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
        let nom = sessionStorage.getItem('nomcom')
        if (nom) {
            let value = await GetCommercials.getCommmercialDetail(nom);
            if (value) {
                this.setState({ user: value.data })
            }
        }
    }
   
    handleSubmit = async (event) => {
        event.preventDefault();
        const { id, firstName, phone, adresse } = this.state.user;
        const data = {  id, firstName,  phone , adresse};
        console.log('data', data)
        let user = await GetCommercials.getCommercialUpdate(data);
        if (user) {
          NotificationManager.success("Successfully Update", "Profile");
        }
        else {
          NotificationManager.error("Please check your Field", "Input Error");
        }
    
      }



    handleLogout = async (event) => {
        event.preventDefault();
        await GetCommercials.logoutcommercial();
    }
    render() {
        let nom = sessionStorage.getItem('nomcom')
        let { user } = this.state;
        return (
            <div className="wrapper">
                <div className="dashboard-group">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="user-dt">
                                    <div className="user-img">
                                        <img src="/img/avatar/img-5.jpg" alt />
                                       
                                    </div>
                                    <h4>Commercial {nom}</h4>
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
                                        <a href="/account/com/voircom/accueil" className="user-item tabcom "><p><i className="uil uil-apps" />Tableau Bord commercial</p>  </a>
                                        <a href="/account/com/voircom/profile" className="user-item"><i className="mdi mdi-account-outline" />Profile</a>
                                        <a href="/account/com/voircom/ventes" className="user-item"><i className="uil uil-gift" />Prime de Ventes</a>
                                        <a className="user-item" onClick={this.handleLogout}><i className="uil uil-exit" />Deconnexion</a>
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
                                                                <label className="control-label">Adresse <span className="required">*</span></label>
                                                                <input className="form-control border-form-control" type="text" name="adresse" value={user.adresse} onChange={(e) => this.handleChangeUser(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Contact <span className="required">*</span></label>
                                                                <input className="form-control border-form-control" type="number" name="phone" value={user.phone} onChange={(e) => this.handleChangeUser(e)} />
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="row">
                                                       
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Nom<span className="required">*</span></label>
                                                                <input className="form-control border-form-control " disabled type="firstName" value={user.nom} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="row">
                                                        <div className="col-sm-12 text-right">

                                                            <button type="button" className="btn btn-success btn-lg" onClick={this.handleSubmit}>Enregistrer </button>
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
