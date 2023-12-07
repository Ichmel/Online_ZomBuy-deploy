import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import GroceryStampleDetails from '../../../../services/GroceryStampleDetails';


const VentGros = () => {
    const [productlist, setProductList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const list = await GroceryStampleDetails.getAllProductLimit();
            if (list.success) {
                setProductList(list.product);
                setIsLoaded(true);
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    return (
        <div>
            <section className='pb-0'>
                <div className="container">
                    <div className="section-head">
                        <div className='d-flex justify-content-center text-center'>
                            <h2  >VENTES EN GROS </h2>
                        </div>
                        <h5 className="heading-design-h5">
                            <Link to={{
                                pathname: `/listegros`,

                            }}><span className="float-right text-secondary">Voir Plus</span></Link>
                        </h5>
                    </div>
                </div>
            </section>

            <section className='pt-4 pb-0' >
                <div className="container " id="header-category-bk">
                    <Slider {...settings}>

                        {!isLoaded ? <div className="progress-bar-bk"><CircularProgress color="secondary" /></div> :

                            productlist.map((row, index) => (
                                <div key={index} className="item ">
                                    <div className="product card">
                                        <Link to={{
                                            pathname: `/dpg/${row.id}`,
                                            state: row
                                        }}>
                                            <div className="product-header  card ">

                                                <img className="img" src={row.photo} alt="product" />

                                            </div>

                                        </Link>
                                        <div className='justify-content-center pt-3'>
                                            <h4>{row.nomprod}</h4>
                                        </div>
                                        <div className=" d-flex align-items justify-content-between mt-3 ">
                                        <span className="price  mr-3">{row.qty} piece </span>
                                        <span className="price ">{row.prix} Fcfa</span>
                                        </div>
                                    </div>
                                </div>

                            ))}



                    </Slider>
                </div>
            </section>
        </div>
    );
};

export default VentGros ;
