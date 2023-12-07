import React, { Component } from 'react';
import { GetProductDetails } from '../../../services';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';

class Productview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isLoaded: false,
            toggle: false,
            limit: 3,
        };
    }

    async getFilterByProduct() {
        this.setState({ isLoaded: false });
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        try {
            let p = await GetProductDetails.getProductByFilter(lastSegment);
            if (p) {
                this.setState({ list: p.data, isLoaded: true });
                console.log('Liste', p);
            }
        } catch (e) {
            NotificationManager.error('Empty data in category', 'Data');
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
        this.getFilterByProduct();
    }

    render() {
        let { list, isLoaded } = this.state;
        return (
            <div>
                <section className="pt-3 pb-3 page-info section-padding border-bottom single-product-header-bk">
                    <section className="product-shop p-5">
                        {!isLoaded ? (
                            <div className="progress-bar-bk">
                                <CircularProgress color="secondary" />
                            </div>
                        ) : (
                            <div className="container">
                                {list && list.length > 0 ? (
                                    <div className="row">
                                        {list.map((category) =>
                                            category.Produits.map((product, index) => (
                                                <div key={index} className="item">
                                                    <div className="product card">
                                                        <Link
                                                            to={{
                                                                pathname: `/p/${product.id}`,
                                                                state: product,
                                                            }}
                                                        >
                                                            <div className="product-header card">
                                                                <img
                                                                    className="img"
                                                                    src={`http://localhost:4001/${product.photo}`}
                                                                    alt="product"
                                                                />
                                                            </div>
                                                        </Link>
                                                        <div className="justify-content-center pt-3">
                                                            <h4>{product.nomprod}</h4>
                                                        </div>
                                                        <div className="d-flex align-items justify-content-between mt-3">
                                                            <span className="price ml-2 mr-3">
                                                                {product.prix} Fcfa{' '}
                                                            </span>
                                                            <strike className="anprice">
                                                                {product.ancienprix} Fcfa
                                                            </strike>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p>Aucun produit trouvé !!!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </section>
            </div>
        );
    }
}

export default Productview;
