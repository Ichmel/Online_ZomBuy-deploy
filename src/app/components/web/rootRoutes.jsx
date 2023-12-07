import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../header';
import Footer from '../footer';
import Home from '../web/views/home';
 import Productview from '../web/views/product';
 import Singleproduct from './views/single-product';
 import PrivateRoute from '../PrivateRoute';
 import Checkout from './views/checkout';
 import Shopdetails from './views/shop-details';
 import Login from './views/checkout/login';
 import Register from './views/checkout/register';
 import NotFound from '../../NotFound';
 import Complete from './views/checkout/complete';
 import Account from './views/account';
 import Failed from './views/checkout/failed';
 import Panier from './views/cart-sidebar'
import Produidetails from './views/detailsproductgros';
import Private from '../PrivateMessage';
import  View from './views/account/view';
import LoginMesseg from './views/message/MessLogin';
import MessRegister from './views/message/MessageRegister';
import ResetPassword from './views/resetPassword';
import LoginHome from './views/login';
import RegisterHome from './views/register';
import Listgros from './views/listventegros';

import Service from './views/servicewin';
import Blog from './views/blog';
import Politique from './views/politique';

export default class rootRoutes extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/p/:id' component={Singleproduct} />
                    <Route exact path='/dpg/:id' component={Produidetails} />
                     <Route exact path='/categorie/:name' component={Shopdetails} />
                     <Route exact path='/panier' component={Panier} />
                     <Route exact path='/listegros' component={Listgros } />
                    <PrivateRoute path='/checkout' component={Checkout} /> 
                    <Route path='/product' component={Productview} /> 
                    <PrivateRoute path='/order/success' component={Complete} /> 
                    <PrivateRoute path='/order/failed' component={Failed} />  

                    <Private path='/account/view' component={View} /> 
                    <PrivateRoute path='/account' component={Account} /> 
                    <Route exact path='/loginMessg' component={LoginMesseg} />
                    <Route exact path='/registerMessg' component={MessRegister} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/loginhome' component={LoginHome} />
                    <Route exact path='/registerhome' component={RegisterHome} />
                    <Route exact path='/reset' component={ResetPassword} />

                    <Route exact path='/service' component={Service } />
                    <Route exact path='/blog' component={Blog } />
                    <Route exact path='/politique' component={Politique } />
                    <Route component={NotFound} />
                </Switch>
                <Footer />

            </div>
        )
    }
}
