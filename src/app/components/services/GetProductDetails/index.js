import api from '../../../ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';

const getProductById = async (id) => {
    try {
        let result = await api.get(Apis.GetProductById+id);
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



const getAllProductList = async (name) => {
    try {
        let result = await api.get(Apis.GetAllProductList+name);
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

const getProductByFilter = async (txt) => {
    try {
        let result = await api.get(Apis.GetProductByFilter+txt);
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

const getCategoryListByFilter = async (data) => {
    try {
        let result = await api.post(Apis.GetCategoryListByFilter,data);
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

const getProductBySubcategory = async (data) => {
    try {
        let result = await api.post(Apis.GetProductBySubcategory,data);
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


const getProductSimilar = async (chilCategoryId) => {
    try {
        let result = await api.get(Apis.GetProductSimilar+chilCategoryId);
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





const getProductBygrosId = async (id) => {
    try {
        let result = await api.get(Apis.GetProductBygrosId+id);
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

const getProductSimilargros = async (chilCategoryId) => {
    try {
        let result = await api.get(Apis.GetProductSimilargros+chilCategoryId);
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
    getProductById,
    getAllProductList,
    getProductByFilter,
    getCategoryListByFilter,
    getProductBySubcategory,
    getProductSimilar,
    getProductBygrosId,
    getProductSimilargros,
};