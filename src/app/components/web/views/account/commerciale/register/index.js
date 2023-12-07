import React, { useState, useEffect } from 'react';
import { GetCommercials, GetUserLogin } from '../../../../../services';
import { NotificationManager } from "react-notifications";
import {  Row, Col } from 'reactstrap';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zAZ0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const Register = () => {
  const [firstName, setFirstName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [ordernumber, setOrdernumber] = useState(null);
  const [customer, setCustomer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);


  const [formErrors, setFormErrors] = useState({
    firstName: "",
    phone: "",
    password: "",
    ordernumber: ""
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let newFormErrors = { ...formErrors };

    switch (name) {
      case "firstName":
        newFormErrors.firstName = value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "phone":
        newFormErrors.phone = value.length < 8 ? "minimum 8 characters required" : "";
        break;
      case "password":
        newFormErrors.password = value.length < 6 ? "minimum 6 characters required" : "";
        break;
      case "ordernumber": // Change this to "orderid"
        newFormErrors.orderid = value ? "entrer un numero commande disponible " : "";
        break;
      default:
        break;
    }

    setFormErrors(newFormErrors);
    if (name === "firstName") setFirstName(value);
    else if (name === "phone") setPhone(value);
    else if (name === "password") setPassword(value);
    else if (name === "ordernumber") setOrdernumber(value); // Change this to "orderid"
  };

  useEffect(() => {
    async function fetchData() {
      let email = sessionStorage.getItem('email');
      if (email) {
        let user = await GetUserLogin.getCustomerDetail(email);
        console.log("List -> render -> orderList", user)
        if (user) {
          setCustomer(user.data);

        }
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const generateRandomCode = (firstName, phone) => {
      // Obtenez les 3 premiers caractères de firstName et phone
      const firstNameChars = firstName.slice(0, 3);
      const phoneChars = phone.slice(0, 3);

      // Générez une valeur aléatoire de 4 chiffres
      const randomValue = Math.floor(Math.random() * 10000).toString().padStart(6, '0'); // Utilisez padStart pour garantir 4 chiffres

      // Combinez les 3 premiers caractères de firstName, phone et les 4 chiffres aléatoires
      const code = `${phoneChars}${firstNameChars}${randomValue}`;

      // Assurez-vous que le code a exactement 10 caractères en tronquant ou en ajoutant des caractères supplémentaires si nécessaire
      return code.slice(0, 12);
    };


    const orderNumbers = customer.Orders.map(order => order.number);



    console.log('Ordersnumber', orderNumbers);



    const isOrderNumberValid = orderNumbers.includes(ordernumber);

    console.log('ISvalide', isOrderNumberValid)

    const foundOrder = customer.Orders.find(order => order.number === ordernumber);

    let orderId = 0;
    if (foundOrder) {
      orderId = foundOrder.id;
    }

    let data = {
      nom: firstName,
      phone: phone,
      password: password,
      ordernumber: ordernumber,
      orderId: orderId,
      custid: customer.id,
      codeBonnus: generateRandomCode(firstName, phone)
    }

    console.log(data);




    if (isOrderNumberValid) {
      try {
        let list = await GetCommercials.getCommmercialRegister(data);
        if (list) {
          NotificationManager.success("le compte commercial a été créé avec succès");
          window.location.href = "/account/com/logincom";
        }
      } catch (error) {
        if (error.list && error.list.status === 409) {
          setError("L'utilisateur avec ce nom ou numéro de commande existe déjà.");
        } else {
          setError("Une erreur s'est produite lors de l'inscription.");
        }
      }
    }


  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="wrapper">

      <div className=" checkout-step-one mt-5 mb-2">
        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >


          <Row className=" d-flex align-items-center justify-content-center mt-4 mb-2 ">
            <Col lg='4' md='5'>
              <div className="login-modal-left"></div>
            </Col>
            <Col lg='4' md='5' >

              <form onSubmit={handleSubmit} noValidate>
                <h5 className="heading-design-h5">Inscrivez-vous!</h5>
                {error && <p className="errorMessage">{error}</p>}
                <fieldset className="form-group">
                  <label>Entrer Votre Nom</label>
                  <input type="text" className="form-control" name="firstName" value={firstName} onChange={handleChange} />
                  {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <label>Entrer votre Contact</label>
                  <input type="number" className="form-control" name="phone" value={phone} onChange={handleChange} />
                  {formErrors.phone.length > 0 && (
                    <span className="errorMessage">{formErrors.phone}</span>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <label>Enter Password</label>
                  <div className="password-input-container">
                    <input
                      className="form-control"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handleChange}
                    />
                    <i
                      className={`mdi ${showPassword ? "mdi-eye-off" : "mdi-eye"
                        }`}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">
                      {formErrors.password}
                    </span>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <label>Entrer le Numero de Commande</label>
                  <input type="text" className="form-control" name="ordernumber" value={ordernumber} onChange={handleChange} /> {formErrors.ordernumber && (<span className="errorMessage">{formErrors.ordernumber}</span>)}
                </fieldset>
                <fieldset className="form-group">
                  <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={handleSubmit}>Inscription</button>
                </fieldset>
               
                <div className="clearfix" />
                <div className="text-center login-footer-tab">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link "  href="/account/com/logincom" ><i className="mdi mdi-lock" /> Se Connecter</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/account/com/signcom"><i className="mdi mdi-pencil" /> S' Inscrire </a>
                    </li>
                  </ul>
                </div>
                <div className="clearfix" />
              </form>

              </Col>
          </Row>

        </div>
      </div>
    </div>
  );
};

export default Register
