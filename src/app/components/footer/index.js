
import React from 'react'
import '../styles/footer.css'

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import appstore from '../styles/assets/images/pay/app.jpg'
import playstore from '../styles/assets/images/pay/play.jpg'
import visa from '../styles/assets/images/pay/visa.png'
import mobile from '../styles/assets/images/pay/mobile.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { GetCategoryDetails } from '../services';



const Footer = () => {

  const [services, setServices] = useState([])
  const [titre, setTitre] = useState([])
  const [play, setPlay] = useState([])

  const [app, setApp] = useState([])
  const [email, setEmail] = useState([])
  const [phone, setPhone] = useState([])
  const [getList, setList] = useState([]);
  const [adresse, setAdresse] = useState([]);



  useEffect(() => {
    async function fetchData() {

      let serv = await GetCategoryDetails.getafficheService();

      setServices(serv.data);

      let tit = await GetCategoryDetails.getAffichebytitre('Market');
      console.log('Mak', tit)


      setTitre(tit.data);

      let playstore = await GetCategoryDetails.getAffichebytitre('playstore');

      setPlay(playstore.data);

      let appstore = await GetCategoryDetails.getAffichebytitre('appstore');

      setApp(appstore.data);

      console.log('store', appstore)

      let send = await GetCategoryDetails.getAffichebytitre('email');

      console.log('email', send)

      setEmail(send.data);

      let contact = await GetCategoryDetails.getAffichebytitre('contact');

      setPhone(contact.data);

      let Adress = await GetCategoryDetails.getAffichebytitre('adresse');

      setAdresse(Adress.data);

      const reseau = await GetCategoryDetails.getTitleList('reseau');
      setList(reseau.data);
      console.log('reseau', reseau)

    }

    fetchData();
  }, []);


  const year = new Date().getFullYear()
  return (
    <footer className='footer p-4 mt-5'>
      <div className='contenu' >

        <Row >

          <Col lg="3" md='3'>
            <div className="footer__quick-links mb-5">
              <div className="logo">
                <h4 className='quick__links-title'>ZonShopping</h4>
              </div>
              <p className="footer__text  mt-4">

              {titre.description}
              </p>


            </div>
          </Col>


          <Col lg="3" className='mb-4' md='3'>
            <div className="footer__quick-links mb-5">
              <h4 className="quick__links-title ml-3">SERVICES</h4>
              <ListGroup className='mb-3'>
                {
                  services.map((item, index) => (
                    <ListGroupItem className='ps-0 border-0 servi' key={index}>
                        <Link to='#'>{item.titre} </Link>
                    </ListGroupItem>
                  ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" className='mb-4' md='4'>
            <div className="footer__quick-links mb-5">
              <h4 className="quick__links-title ml-3">AUTRES LIENS</h4>
              <ListGroup className='mb-3'>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/listegros'>Les Produits en Gros</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/loginhome'>Se connecter</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/blog'>Blog</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/politique'>Politique de confidentialite</Link>
                </ListGroupItem>
              </ListGroup>
              <p className="mb-3 text-white ml-3">
                Mode Payement
              </p>
              <div className="pay d-flex ml-3">
                <Link className='visa'>
                  <img src={visa} alt="" className='img-fluit p-2  ' />
                </Link>

                <Link className='mobile'>
                  <img src={mobile} alt="" className='img-fluit p-2   ' />
                </Link>
              </div>
            </div>
          </Col>

          <Col lg="3" md='3'>
            <div className="footer__quick-links mb-1">
              <h4 className="quick__links-title  ml-3 ">CONTACT</h4>
              <ListGroup className='footrt__contact'>
                <ListGroupItem className='ps-0 border-0 d-flex align-item-center  '>
                  <span><i class="ri-map-pin-line"></i></span>
                  <span className='ml-3 ' >{adresse.description} </span>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-item-center '>
                  <span><i class="ri-phone-line"></i></span>
                  <span className='ml-3 '>{phone.description} </span>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-item-center  '>
                  <span><i class="ri-mail-line"></i></span>
                  <span className='ml-3 '>{email.description}</span>
                </ListGroupItem>

                   {
                  getList.map((item, index) => (
                    <ListGroupItem className='ps-0 border-0 d-flex align-item-center ' key={index}>
                    <Link
                to={{
                  pathname: `${item.description}`,
                }}
                target="_blank"  
              >
                     <span dangerouslySetInnerHTML={{ __html: item.desc }} />
                      <span className='ml-3 '>{item.titre}</span>
                      </Link>
                    </ListGroupItem>
                  ))
                }

              </ListGroup>


            </div>
            <div className='app   ml-3'>
              <p className='text-white  app' >Retrouver nous sur Play Services & App Store</p>
            </div>
            <div className=" pay d-flex ">
              <Link
                to={{
                  pathname: `${play.description}`,
                }}
                target="_blank"  // Ouvre le lien dans un nouvel onglet
              >
                <img src={playstore} alt="" className='img-fluit p-3' />
              </Link>

              <Link
                to={{
                  pathname: `${app.description}`,
                }}
                target="_blank">
                <img src={appstore} alt="" className='img-fluit p-3' />
              </Link>

            </div>
          </Col>

        </Row>
        <hr />

        <div>
          <p className="footer__copyright"> Copyright {year} developed by Kekewe Fabrice. All rigths reseved. </p>
        </div>

      </div>

    </footer>
  )
}

export default Footer
