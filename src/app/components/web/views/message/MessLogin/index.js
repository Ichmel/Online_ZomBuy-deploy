import React, { Component } from 'react';
import { GetUserLogin } from '../../../../services'; 
import { NotificationManager } from "react-notifications";
import { Container, Row, Col } from 'reactstrap';

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zAZ0-9-]+)*$/;

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

export default class LoginMesseg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
      showPassword: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    let data = { email: email, password: password };
    if (formValid(this.state)) {
      let user = await GetUserLogin.getUserLogin(data);
      if (user) {
        NotificationManager.success("success", "Login");
        await GetUserLogin.authenticate(user.token, email);
      } else {
        NotificationManager.error("Please check your email & password", "Input Error");
      }
    } else {
      NotificationManager.error("Please check your Login", "Input Error");
    }
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    let { email, password, formErrors, showPassword } = this.state;
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
                     <Col lg='4'  md='5'>
                     <div className="login-modal-left"></div>
                     </Col>
                      <Col lg='4'  md='5' >
                        <form onSubmit={this.handleSubmit} noValidate>
                          <div className="login-m">
                            <div className="tab-content">
                              <div className="tab-pane active" id="login" role="tabpanel">
                                <h5 className="heading-design-h5">
                                   Connecter  vous !
                                </h5>
                                <fieldset className="form-group">
                                  <label>Entrer Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                  />
                                  {formErrors.email.length > 0 && (
                                    <span className="errorMessage">
                                      {formErrors.email}
                                    </span>
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
                                      onChange={this.handleChange}
                                    />
                                    <i
                                      className={`mdi ${showPassword ? "mdi-eye-off" : "mdi-eye"
                                        }`}
                                      onClick={this.togglePasswordVisibility}
                                    />
                                  </div>
                                  {formErrors.password.length > 0 && (
                                    <span className="errorMessage">
                                      {formErrors.password}
                                    </span>
                                  )}
                                </fieldset>
                                <fieldset className="form-group">
                                  <button
                                    type="submit"
                                    className="btn btn-lg btn-secondary btn-block"
                                  >
                                    Enregistre
                                  </button>
                                </fieldset>

                                <div className='oubli'>                    
                                   <a  href="/reset">Vous avez oublier votre  mot de pase !</a>
                                   </div>
                              </div>
                            </div>
                            <div className="clearfix" />
                            <div className="text-center login-footer-tab">
                              <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                  <a
                                    className="nav-link active"
                                    data-toggle="tab"
                                    href="#login"
                                    role="tab"
                                  >
                                    <i className="mdi mdi-lock" /> Se Connecter
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="/registerMessg">
                                    <i className="mdi mdi-pencil" /> S' Inscrire
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="clearfix" />
                          </div>
                        </form>
                      </Col>
                    </Row>
                  
          </div>
        </div>
      </div>
    );
  }
}
