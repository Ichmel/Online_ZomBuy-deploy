import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Vente from './Vente';
import Acceuil from './Acceuil';
import Profile from './Profile';

export default class View extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/accueil`]} component={Acceuil} />
                        <Route path={[`${match.path}/ventes`]} component={Vente} />
                        <Route path={[`${match.path}/profile`]} component={Profile} />
                       
                    </Switch>
                </main>
            </div>
        );
    }
}