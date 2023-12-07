import api from '../../../ApiConfig';
import { Apis } from '../../../../config';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';

const getCommmercialLogin = async (data) => {
    try {
        let result = await api.post(Apis.GetCommercialLogin, data);
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

const getCommmercialRegister = async (data) => {
    try {
        let result = await api.post(Apis.GetCommercialRegister, data);
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



const getCommmercialBonnus = async (data) => {
    try {
        let result = await api.post(Apis.GetCommercialBonnus , data);
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



const getCommmercialDetail = async (nom) => {
    try {
        let result = await api.get(Apis.GetCommercialDetails + nom);
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



const getCommmercialDetailRemise = async (codeBonnus) => {
    try {
        let result = await api.get(Apis.GetCommercialDetailsRemise + codeBonnus);
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


const getCommercialUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetCommercialUpdate,{data});
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


const authenticateByCommercial = async (token, nom) => {
    if (typeof window !== "undefined") {
       sessionStorage.setItem('_sidcom', token)
       sessionStorage.setItem('nomcom', nom)
        setTimeout(
            function () {
                window.location.href =  "/account/com/voircom/accueil" ;
            },
            1000
        );
    } else {
        NotificationManager.error("Please check your login", "Input Error");
    }
};

const logoutcommercial = (next) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('_sidcom');
        sessionStorage.removeItem('nomcom');
        window.location.href = "/account/view";
        // next();
    }
};



const isAuthenticatecom = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return sessionStorage.getItem('_sidcom');
};


const authenticateByBonnus = async ( codeBonnus) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('code', codeBonnus)
        
    }
};



const codeBonnusdelete = (next) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('code');
    }
};


const isAuthenticateBonnus = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return sessionStorage.getItem('_sidbonnus');
};


export default {
   getCommmercialLogin,
   getCommmercialRegister,
   getCommercialUpdate,
   getCommmercialDetail,
   authenticateByCommercial,
   logoutcommercial,
   isAuthenticatecom, 
   getCommmercialBonnus,
   authenticateByBonnus,
   isAuthenticateBonnus,
   codeBonnusdelete,
 getCommmercialDetailRemise,
};