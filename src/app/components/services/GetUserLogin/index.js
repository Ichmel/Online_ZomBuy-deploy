import api from '../../../ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';

const getUserLogin = async (data) => {
    try {
        let result = await api.post(Apis.GetUserLogin, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserRegister = async (data) => {
    try {
        let result = await api.post(Apis.GetUserRegister, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const getResetPassword = async (data) => {
    try {
        let result = await api.post(Apis.GetResetPassword , data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const authenticate = async (data, email) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('_sid', data)
        sessionStorage.setItem('email', email)
        setTimeout(
            function () {
                window.location.href = "/account/view"
            },
            1000
        );
    }
};

const getCustomerDetail = async (email) => {
    try {
        let result = await api.get(Apis.GetCustomerDetails + email);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCustomerUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetCustomerUpdateDetails,{data});
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const authenticateByCart = async (token, email) => {
    if (typeof window !== "undefined") {
       sessionStorage.setItem('_sid', token)
       sessionStorage.setItem('email', email)
        setTimeout(
            function () {
                window.location.href = "/checkout";
            },
            1000
        );
    } else {
        NotificationManager.error("Please check your login", "Input Error");
    }
};


const authenticateByHome = async (token, email) => {
    if (typeof window !== "undefined") {
       sessionStorage.setItem('_sid', token)
       sessionStorage.setItem('email', email)
        setTimeout(
            function () {
                window.location.href = "/";
            },
            1000
        );
    } else {
        NotificationManager.error("Please check your login", "Input Error");
    }
};

const logout = (next) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('_sid');
        sessionStorage.removeItem('email');
        window.location.href = "/";
        // next();
    }
};

const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return sessionStorage.getItem('_sid');
};


const createProduit = async (data) => {
    try {
        let result = await api.post(Apis.GetUserProduit, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const creatUserMessage = async (data) => {
    try {
        let result = await api.post(Apis.GetUserMessage , data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const getMessageAdmin = async (email) => {
    try {
        let result = await api.get(Apis.GetMessageAdmin + email);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};



const getMessageCust = async (email) => {
    try {
        let result = await api.get(Apis.GetMessageCust + email);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};



export default {
    getUserLogin,
    authenticate,
    isAuthenticate,
    authenticateByCart,
    getUserRegister,
    getCustomerDetail,
    getCustomerUpdate,
    logout,
    createProduit,
    creatUserMessage,
    getMessageAdmin,
    getMessageCust,
    getResetPassword,
    authenticateByHome

   
};