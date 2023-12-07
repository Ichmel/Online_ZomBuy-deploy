import api from '../../../ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';

const getAllCategoryList = async (name) => {
    try {
        let result = await api.get(Apis.GetAllCategoryList+name);
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

const getFilterByCategory = async (data) => {
    try {
        let result = await api.get(Apis.GetFilterByCategory+`/${data.name}/${data.id}`);
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


 /*........................Configuration de   categories................................*/

 const getCategoryList = async () => {
    try {
        let result = await api.get(Apis.GetCategoryList);
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


const getafficheVideohome = async (titre) => {
    try {
        let result = await api.get(Apis.GetAfficheVideoHome+titre);
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



const getafficheService = async () => {
    try {
        let result = await api.get(Apis.GetAfficheServices);
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


const getafficheblog = async () => {
    try {
        let result = await api.get(Apis.GetAfficheServicesvideo );
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


const getbackgroundList = async (titre) => {
    try {
        let result = await api.get(Apis.GetAffichebackground + titre);
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





const getlocalList = async () => {
    try {
        let result = await api.get(Apis.GetLocalList);
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


const getTitleList = async (title) => {
    try {
        let result = await api.get(Apis.GetTitleList + title);
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

const getAffichebytitre = async (titre) => {
    try {
        let result = await api.get(Apis.GetTitleListbyTitre  + titre);
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
    getAllCategoryList,
    getFilterByCategory,
    getCategoryList,
    getafficheVideohome,
    getafficheService,
    getbackgroundList,
    getTitleList,
    getlocalList,
    getAffichebytitre,
    getafficheblog
};