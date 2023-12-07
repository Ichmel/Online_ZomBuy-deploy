import React, { Component } from 'react'
import { GetCategoryDetails, GetCommercials } from '../../../../../../services';



export default class Vente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            com: '', 
            Listevente: [],
            totalReductionSum: 0,
            datecreated: '',
            daysSinceCreation: 0,
        };
    }


    async fetchData() {
        let nom = await sessionStorage.getItem('nomcom');

        console.log('nom', nom);
        if (nom) {
            let value = await GetCommercials.getCommmercialDetail(nom);
            if (value && value.success && value.data) {
                this.setState({ com: value.data });
            }
            console.log('commercial', value);

            const codeBonnus = value.data.codeBonnus;
            const date = value.data.createdAt;
            this.setState({ datecreated: date });

            console.log('codeBonnus', codeBonnus);

            let vente = await GetCommercials.getCommmercialDetailRemise(codeBonnus);


            let prix1 = await GetCategoryDetails.getAffichebytitre('debut');

            this.setState({ rab1: prix1.data });

            let prix2 = await GetCategoryDetails.getAffichebytitre('fin');

            this.setState({ rab2 : prix2.data });
    
            const prime1 = prix1.data.description

            const prime2 = prix2.data.description
            
            let totalReductionSum = 0;
            vente.data.forEach((row, index) => {
                let prime = index < 5 ? row.TotalReduction * prime1 : row.TotalReduction * prime2;
                totalReductionSum += prime;
                row.prime = prime;
            });

            this.setState({
                com: value.data,
                Listevente: vente.data,
                totalReductionSum: totalReductionSum,
            });

            console.log('listbonnus', vente);

            console.log('date:', this.state.datecreated);

            this.calculateDaysSinceCreation();
        }
    }
    
    componentDidMount() {
        this.fetchData();
    }

   

    calculateDaysSinceCreation() {
        const { datecreated } = this.state;
        const creationDate = new Date(datecreated);
        const currentDate = new Date();
        const timeDiff = currentDate - creationDate;
        let daysSinceCreation = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (daysSinceCreation > 30) {
            daysSinceCreation = daysSinceCreation % 30;
        }

        if (daysSinceCreation === 0) {
            daysSinceCreation = 1;
        }

        this.setState({ daysSinceCreation: daysSinceCreation });
        console.log(`Nombre de jours depuis la création : ${daysSinceCreation}`);
    }

    


    handleLogout = async (event) => {
        event.preventDefault();
        await GetCommercials.logoutcommercial();
    }
    render() {
        let nom = sessionStorage.getItem('nomcom')
      
        const { Listevente, totalReductionSum, daysSinceCreation } = this.state;
      

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


                            <div className="col-lg-9 col-md-9">
                                <div className="pdpt-bg">
                                    <div className="pdpt-title">
                                        <h6> Nombres du Jours : {daysSinceCreation || 0 } jours</h6>
                                    </div>
                                    <div className="order-body10">

                                        <div className="order-body10">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 150 }} ># ID_Commande</th>
                                                            <th style={{ width: 150 }}>Prix_Commande</th>
                                                            <th style={{ width: 150 }}>Prime</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {

                                                            Listevente.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td >{row.id} </td>
                                                                    <td>{row.TotalReduction}</td>
                                                                    <td>{row.prime} </td>
                                                                </tr>
                                                            ))

                                                        }


                                                    </tbody>
                                                </table>
                                            </div>


                                            <div className="total-dt">
                                                <div className="total-checkout-group">
                                                    <div className="main-total-cart">
                                                        <h2>Total</h2>
                                                        <span>{totalReductionSum || 0} Fcfa</span>
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
