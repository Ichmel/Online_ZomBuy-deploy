import api from '../../../ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';


const getAllArrivage= async () => {
    try {
        let result = await api.get(Apis.GetAllArrivage);
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



const getAllproduitgros = async () => {
    try {
        let result = await api.get(Apis.GetAllProductGrosList );
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



const getAllProductListe = async () => {
    try {
        let result = await api.get(Apis.GetAllProductGrosList );
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
         console.log(result)
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const getAllProductLimit = async () => {
    try {
        let result = await api.get(Apis.GetAllProductListLimit );
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
         console.log(result)
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};



const getMeilleVente = async () => {
    try {
        let result = await api.get(Apis.GetAllMeillvente);
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
    getAllArrivage,
    getAllProductListe ,
    getAllproduitgros ,
    getMeilleVente,
    getAllProductLimit
};