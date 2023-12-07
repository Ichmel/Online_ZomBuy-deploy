import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import View from './view';
import Profile from './profile';
import Order from './order';
import Commercial from './commerciale';


export default class Account extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/view`]} component={View} />
                        <Route path={[`${match.path}/profile`]} component={Profile} />
                        <Route path={[`${match.path}/order`]} component={Order} />
                        <Route path={[`${match.path}/com`]} component={Commercial} />
                    </Switch>
                </main>
            </div>
        );
    }
}