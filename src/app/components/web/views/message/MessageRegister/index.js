import React, { Component } from 'react';
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from "react-notifications";
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
export default class MessRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            email: null,
            password: null,
            formErrors: {
                firstName: "",
                email: "",
                password: "",
            },
            showPassword: false,
        };
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let { firstName, email, password, gender } = this.state;
        let data = { firstName: firstName, email: email, password: password, gender: gender }
        if (formValid(this.state)) {
            let list = await GetUserLogin.getUserRegister(data);
            if (list) {
                NotificationManager.success("Successfully Added New User");
                window.location.href = "/loginMessg";
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
        let { firstName, email, password, formErrors, showPassword } = this.state;
        return (
            <div>
                <section className="pt-5 pb-3 page-info section-padding border-bottom  single-product-header-bk">

<div className=" checkout-step-one mt-5 mb-5">

    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">


        <Row className=" d-flex align-items-center justify-content-center mt-4 mb-2 ">
            <Col lg='4' md='5'>
                <div className="login-modal-left"></div>
            </Col>
            <Col lg='4' md='5' >
                <form onSubmit={this.handleSubmit} noValidate>
                    <h5 className="heading-design-h5">Inscriver Vous!</h5>
                    <fieldset className="form-group">
                        <label>Entrer Nom</label>
                        <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                        {formErrors.firstName.length > 0 && (
                            <span className="errorMessage">{formErrors.firstName}</span>
                        )}
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Entrer Email</label>
                        <input type="text"   className="form-control" name="email" value={email} onChange={this.handleChange} />
                      <p>Veuillez entrez un email valide enfin de recevoir les infromations</p>
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
                        )}
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Entrer Password</label>
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
