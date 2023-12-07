import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import { GetUserLogin } from '../../../services';
import { Row, Col } from 'reactstrap';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            formErrors: {
                email: "",

            },
            showPassword: false,
        };
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {

            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let { email } = this.state;
        let data = { email: email }
        if (formValid(this.state)) {
            let list = await GetUserLogin.getResetPassword(data);
            if (list) {
                NotificationManager.success("Successfully Added New User");
                window.location.href = "/login";
            }
        } else {
            NotificationManager.error("Please check your Register", "Input Error");
        }

    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };
    render() {
        let { email, formErrors, } = this.state;
        return (
            <div>
                <section className="pt-5 pb-3 page-info section-padding border-bottom  single-product-header-bk">

                    <div className="card checkout-step-one mt-5 mb-5">

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">


                            <Row className=" d-flex align-items-center justify-content-center mt-4 mb-2 ">
                                <Col lg='4' md='5'>
                                    <div className="login-modal-left"></div>
                                </Col>
                                <Col lg='4' md='5' >
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <h5 className="heading-design-h5">Recuperation du Mot de Passe !</h5>

                                        <fieldset className="form-group mt-5">
                                            <label>Entrer Email</label>
                                            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                            {formErrors.email.length > 0 && (
                                                <span className="errorMessage">{formErrors.email}</span>
                                            )}
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={this.handleSubmit}>Enregistre </button>
                                        </fieldset>

                                    </form>
                                </Col>
                            </Row>
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}
