import React, { useState } from 'react'
import { NotificationManager } from 'react-notifications';
import { GetCommercials } from '../../../../../services';
import { Row, Col } from 'reactstrap';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);



const Login = () => {
    const [nom, setNom] = useState(null);
    const [password, setPassword] = useState(null);
    const [formErrors, setFormErrors] = useState({
        nom: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let newFormErrors = { ...formErrors };

        switch (name) {
            case 'nom':
                newFormErrors.nom = value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case 'password':
                newFormErrors.password = value.length < 6 ? 'Minimum 6 characters required' : '';
                break;
            default:
                break;
        }

        setFormErrors(newFormErrors);
        if (name === 'nom') setNom(value);
        else if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = { nom, password };

        if (formValid({ formErrors, nom, password })) {
            let user = await GetCommercials.getCommmercialLogin(data);
            if (user) {
                await GetCommercials.authenticateByCommercial(user.token, nom);
                NotificationManager.success('Success', 'Login');
            } else {
                NotificationManager.error(' Nom et password ne correspond pas ', 'Input Error');
            }
        } else {
            NotificationManager.error('Please check your login', 'Input Error');
        }
    };

    const formValid = ({ formErrors, nom, password }) => {
        let valid = true;

        Object.values(formErrors).forEach((val) => {
            val.length > 0 && (valid = false);
        });

        if (!nom || !password) {
            valid = false;
        }

        return valid;
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="wrapper">
            


            <div className=" checkout-step-one mt-5 mb-2">
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                   

                        <Row className=" d-flex align-items-center justify-content-center mt-4 mb-2 ">
                            <Col lg='4' md='5'>
                                <div className="login-modal-left"></div>
                            </Col>
                            <Col lg='4' md='5' >
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="login-modal-right">
                                        {/* Tab panes */}
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="login" role="tabpanel">
                                                <h5 className="heading-design-h5">Compte  Commercial </h5>
                                                <fieldset className="form-group">
                                                    <label>Entrer Votre Nom</label>
                                                    <input type="text" className="form-control" name="nom" value={nom} onChange={handleChange} />
                                                    {formErrors.nom.length > 0 && (
                                                        <span className="errorMessage">{formErrors.nom}</span>
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
                                                    <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={handleSubmit}>Enregiste</button>
                                                </fieldset>

                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="text-center login-footer-tab">
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="tab" href="#login" role="tab"><i className="mdi mdi-lock" /> Se Connecter</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/account/com/signcom"><i className="mdi mdi-pencil" /> S' Inscrire </a>
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
    )
}

export default Login