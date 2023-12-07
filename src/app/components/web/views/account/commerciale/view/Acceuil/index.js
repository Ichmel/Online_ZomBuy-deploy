import React, { Component } from 'react'
import { GetCategoryDetails, GetCommercials } from '../../../../../../services';



export default class Acceuil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: [],
            Listevente: [],totalReductionSum: 0,
        };
    }


    async componentDidMount() {
        let nom = sessionStorage.getItem('nomcom');

        console.log('nom', nom);
        if (nom) {
            let value = await GetCommercials.getCommmercialDetail(nom);
            if (value && value.success && value.data) {
                this.setState({ code: value.data });

                console.log('commercial', value);

                const codeBonnus = value.data.codeBonnus;

                this.setState({ codeR: codeBonnus })

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
                    // Calculate the prime based on the specified rules
                    let prime = index < 5 ? (row.TotalReduction * prime1) : (row.TotalReduction * prime2);
                    
                    totalReductionSum += prime;

                    // Update the Listevente array with the calculated prime
                    row.prime = prime;
                });

                this.setState({ Listevente: vente.data, totalReductionSum });
                console.log('listbonnus', vente)
            }
        }

        // ...
    }


    handleLogout = async (event) => {
        event.preventDefault();
        await GetCommercials.logoutcommercial();
    }
    render() {
        let nom = sessionStorage.getItem('nomcom')
        let { codeR } = this.state;

        let { Listevente , totalReductionSum} = this.state;

        let codeBonnusCount = Listevente.filter(item => item.codeBonnus === codeR).length;

        


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
                                <div className="dashboard-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab">
                                                <h4>Accueil</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <ul className="reward-body-all">
                                                    <li>
                                                        <div className="total-rewards">
                                                            <div className="tt-icon"><i className="uil uil-gift" /></div>
                                                            <span>Votre Code Remise</span>

                                                            <h4>{codeR} </h4>

                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="total-rewards">
                                                            <div className="tt-icon"><i className="uil uil-percentage" /></div>
                                                            <span>Utilisation</span>
                                                            <h4>{codeBonnusCount}</h4> {/* Affiche le nombre d'occurrences de codeBonnus */}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="total-rewards">
                                                            <div className="tt-icon"><i className="uil uil-tag-alt" /></div>
                                                            <span>Prime_Total</span>
                                                            <h4>{totalReductionSum}</h4> {/* Affiche la somme des TotalReduction */}
                                                        </div>
                                                    </li>
                                                </ul>
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
