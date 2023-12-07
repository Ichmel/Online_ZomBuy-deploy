import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './login';
import Register from './register';
import View from './view';

export default class Commercial extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/logincom`]} component={Login} />
                        <Route path={[`${match.path}/signcom`]} component={Register} />
                        <Route path={[`${match.path}/voircom`]} component={View} />
                    </Switch>
                </main>
            </div>
        );
    }
}