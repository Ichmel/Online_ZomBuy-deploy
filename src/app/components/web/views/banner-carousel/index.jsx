import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from '../category';
import { GetCategoryDetails } from '../../../services';

export default class Bannerslider extends Component {
    constructor(props) {
        super(props);
        this.state = {  getList: [], isloaded:false }
        
    }

    
    async getCategoryList() {
        this.setState({ isloaded: false })
        let liste = await GetCategoryDetails.getbackgroundList('back');
        this.setState({ getList: liste.data , isloaded:true  })
        console.log('back', liste)

    }

    async componentDidMount() {
        this.getCategoryList();
       
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 4000,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { getList } = this.state;

        return (
            <div>
             
            <Slider {...settings}>
               {   getList.map((item, index) => (  
                <div className="owl-item">
                    <img src={item.photo} alt="supemaket" />
                </div >
                ))
            }
            </Slider>
            
            <Category />
        </div>
        )
    }
}
