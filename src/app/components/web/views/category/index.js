import React, { Component } from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { GetCategoryDetails } from '../../../services';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {  getList: [], isloaded:false }

    }


    async getCategoryList() {
        this.setState({ isloaded: false })
        let liste = await GetCategoryDetails.getCategoryList('back');
        console.log('category', liste)
        this.setState({ getList: liste.data , isloaded:true  })
    }

    async componentDidMount() {
        this.getCategoryList();
       
    }




    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 2,
            initialSlide: 0,
                        
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 500,
                        slidesToShow: 6,
                        slidesToScroll: 2,
                        initialSlide: 0,
                    }
                },
                {
                    breakpoint: 770,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 500,
                        slidesToShow: 4,
                        slidesToScroll: 2,
                        initialSlide: 0,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 500,
                        slidesToShow: 4,
                        slidesToScroll: 2,
                        initialSlide: 2,
                    }
                }
            ]
        };

        const { getList } = this.state;


        return (
            <div style={{ background: '#fff' }}>
                <div className="contenu" id="header-category-bk">
                    <Slider {...settings}>
                    {
                                getList.map((item, index) => (
                        <div className="" key={index} >
                            <div className="category-item">

                                <Link to={{
                                    pathname: `/categorie/${item.name}`,
                                }}>
                                     <img src={item.photo}  alt="" />
                                    <p>{item.name} </p>
                                
                                </Link>
                            </div>
                        </div>
                       ))
                    }
                    </Slider >
                </div>
            </div >
        )
    }
}
