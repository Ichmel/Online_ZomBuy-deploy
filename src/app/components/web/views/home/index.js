import React, { Component } from 'react'
 import Bannerslider from '../banner-carousel';
 import Pub from './Pub';
import Arrivage from './arrivage';
import VenteGros from './vente_gros'
import  MeilleursVente from './meilleur_vente'
import Date from './date';

export default class Home extends Component {
    render() {
        return (
            <div className="r">
                <Bannerslider />
             <MeilleursVente />
              <Pub />
              <VenteGros />
            <Date />
              <Arrivage />
               
            </div>
        )
    }
}
