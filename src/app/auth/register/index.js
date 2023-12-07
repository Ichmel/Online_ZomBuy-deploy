import React, { useState } from 'react';
import { GetUserLogin } from '../../components/services';
import { NotificationManager } from "react-notifications";

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: '',
        formErrors: {
            firstName: '',
            email: '',
            password: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formErrors = { ...formData.formErrors };

        switch (name) {
            case 'firstName':
                formErrors.firstName = value.length < 3 ? 'minimum 3 characaters required' : '';
                break;
            case 'email':
                formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
                break;
            case 'password':
                formErrors.password = value.length < 6 ? 'minimum 6 characaters required' : '';
                break;
            default:
                break;
        }

        setFormData({ ...formData, formErrors, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { firstName, email, password, gender } = formData;
        const data = { firstName, email, password, gender };
        if (formValid(formData)) {
            try {
                const list = await GetUserLogin.getUserRegister(data);
                if (list) {
                    NotificationManager.success('Successfully Added New User');
                    // window.location.href="/";
                }
            } catch (error) {
                console.error(error);
            }
        } else {
                NotificationManager.error('Please check your Register', 'Input Error');
        }
    };

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

    const { firstName, email, password, formErrors } = formData;

    return (
        <div>
            <h5 className="heading-design-h5">Register Now!</h5>
            <fieldset className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" name="firstName" value={firstName} onChange={handleChange} />
                {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                )}
            </fieldset>
            <fieldset className="form-group">
                <label>Enter Email/Mobile number</label>
                <input type="text" className="form-control" name="email" value={email} onChange={handleChange} />
                {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                )}
            </fieldset>
            <fieldset className="form-group">
                <label>Enter Password</label>
                <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
                {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                )}
            </fieldset>
            <fieldset className="form-group">
                <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={handleSubmit}>Create Your Account</button>
            </fieldset>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck2" />
                <label className="custom-control-label" htmlFor="customCheck2">I Agree with <a href="#">Term and Conditions</a></label>
            </div>
        </div>
    );
};

export default Register;
