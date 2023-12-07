import React, { useState, useEffect, useRef } from 'react';
import Login from '../../auth/login';
import { withRouter, Link } from 'react-router-dom';
import Cartsidebar from '../web/views/cart-sidebar';
import { GetCategoryDetails, GetUserLogin } from '../../components/services';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import '../styles/header.css'
import { useHistory } from 'react-router-dom';

import { VscAccount } from 'react-icons/vsc'
import { CgShoppingCart } from 'react-icons/cg'




const Header = () => {
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
    const [searchtxt, setSearchtxt] = useState('');
    const location = useLocation();
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const history = useHistory();

    const totalQuantity = useSelector(state => state.cart.totalQuantity)


    useEffect(() => {
        const fetchData = async () => {
            let cookies = await GetUserLogin.isAuthenticate();
            setToken(cookies);
            let email = sessionStorage.getItem('email');
            if (email) {
                let user = await GetUserLogin.getCustomerDetail(email);
                if (user) {
                    setUserName(user.data.firstName);
                }
            }
        };

        fetchData();
    }, []);


    const [titre, setTitre] = useState([])

    useEffect(() => {
        async function fetchTitre() {

            let tit = await GetCategoryDetails.getAffichebytitre('Livraison');

            setTitre(tit.data);



        }

        fetchTitre();
    }, []);

    const handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    };

    const menuToggle = () => menuRef.current.classList.toggle('active__menu');

    const handleSearch = () => {
        if (searchtxt) {
            history.push(`/product/${searchtxt}`);
            window.location.reload();
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            window.location.reload();
        }
    };

 
    
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const header = headerRef.current;

    if (window.scrollY > 0) {
      header.classList.add('fixed-header');
    } else {
      header.classList.remove('fixed-header');
    }
  };
  
    


    return <header ref={headerRef} className="shadow-sm" >
        <div>
            <header className="  container-xxl ">
                <div className="navbar-to head pt-2 pb-2">
                    <div className="container-fluid">
                        <div className="row">
                           
                                    <div className="col-lg-12 text-center">
                                        <a href="/" className="mb-0 text-white">
                                            {titre.description}
                                        </a>

                                    </div>
                              
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-light navbar-expand-lg  bg-faded osahan-menu">
                    <div className="container-fluid">


                        <div className="nav__wrapper d-flex align-items-center">

                            <div className='nova d-flex align-items-center'>
                                <h4>LINE MARKET</h4>
                            </div>

                            <div className="search  d-flex align-items-center ">
                                <div className="input-group ">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Search produits"
                                        value={searchtxt}
                                        onChange={(e) => setSearchtxt(e.target.value)}
                                        onKeyUp={handleKeyUp}
                                    />
                                </div>
                                <div >
                                    <button className="btn" id="basic-addon2" onClick={handleSearch}>
                                        Search
                                    </button>
                                </div>
                            </div>


                            <div className="navigation  " ref={menuRef} onClick={menuToggle}>
                                <ul className="menu d-flex align-items-center nav-links  ">
                                    <Link to={'/'} className={location.pathname === '/' ? 'active' : 'inactive'}>ACCUEIL</Link>
                                    <Link to={'/service'} className={location.pathname === '/service' ? 'active' : 'inactive'}>SERVICES</Link>
                                    <Link to={'/panier'} className={location.pathname === '/panier' ? 'active' : 'inactive'}  >
                                        <div className="panier  ">
                                            <a> <CgShoppingCart
                                                className=' mr-1' />
                                                PANIER
                                                <span >
                                                    {totalQuantity > 0 && `(${totalQuantity})`}
                                                </span>
                                            </a>
                                        </div>
                                    </Link>



                                    <div className="navbar-collapse" id="navbarNavDropdown">
                                        <div className="my-2 my-lg-0">
                                            <ul className="list-inline main-nav-right">
                                                <li className="list-inline-item">
                                                    <div className='login'>
                                                        <Link to={'/loginhome'} className={location.pathname === '/loginhome' ? 'active' : 'inactive'} >    <a

                                                            style={token ? { display: 'none' } : { display: 'block' }}
                                                        >
                                                            <i className="mdi mdi-account-circle " /> CONNEXION
                                                        </a>  </Link>
                                                    </div>
                                                    <div className="dropdown mb-4 ml-3 mr-3" style={token ? { display: 'block' } : { display: 'none' }}>
                                                        <button className="btn btn-account dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            {userName}
                                                        </button>
                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <a className="dropdown-item" href="/account/view">
                                                                <i className="uil uil-apps" /> Dashboard
                                                            </a>
                                                            <a className="dropdown-item" href="/account/profile">
                                                                <i className="mdi mdi-account-outline" aria-hidden="true"></i> Mon Profile
                                                            </a>
                                                            <a className="dropdown-item" href="/account/order/list">
                                                                <i className="mdi mdi-format-list-bulleted" aria-hidden="true"></i>Listes des Commandes
                                                            </a>
                                                            <div className="dropdown-divider"></div>
                                                            <span className="dropdown-item" onClick={handleLogout}>
                                                                <i className="mdi mdi-lock" aria-hidden="true"></i>Deconnexion
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>

                                            </ul>

                                        </div>
                                    </div>
                                </ul>
                            </div>


                            <div className="nav__icons">

                                <div className="mobile__menu">
                                    <span onClick={menuToggle}>
                                        <i class="ri-menu-line"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>


        </div>
    </header>
}

export default Header;
