const API_URL ="http://localhost:4000";
   


const Apis = {

//Category api
  GetCategoryList: `${API_URL}/api/category/main/list`,
  GetAffichebackground: `${API_URL}/api/category/affichebackgroundbyId?titre=`,
  GetTitleList: `${API_URL}/api/category/affichetitlebyId?title=`,
  GetTitleListbyTitre: `${API_URL}/api/category/affichebyId?titre=`,

  GetLocalList: `${API_URL}/api/category/affichelocal`,


  //product api
  GetOrderCreateByUser: `${API_URL}/api/order/create`,
  GetOrderByUser: `${API_URL}/api/order/list`,
  GetOrderProductListById: `${API_URL}/api/order/orderid?id=`,

    

  //Authentication api
  GetUserLogin: `${API_URL}/api/customer/login`,
  GetUserRegister: `${API_URL}/api/customer/register`,
  GetCustomerDetails: `${API_URL}/api/customer/getUserByEmailId?email=`,
  GetResetPassword: `${API_URL}/api/customer/resetPassword`,

  
  
  //Customer Msg api
  GetUserMessage: `${API_URL}/api/customer/custmsg`,
  GetMessageAdmin: `${API_URL}/api/customer/msgadmin?email=`,
  GetMessageCust: `${API_URL}/api/customer/msgcust?email=`,
  GetUserProduit: `${API_URL}/api/customer/prodmsg`,

 
  //product api
  GetAllProductList : `${API_URL}/api/product/getAllproduct`,
  GetProductById: `${API_URL}/api/product/getWebProductById?id=`,
  GetAllProductList: `${API_URL}/api/product/list/`,
  GetProductSimilar: `${API_URL}/api/product/similar?chilCategoryId=`,

//productgros api
GetProductBygrosId: `${API_URL}/api/productgros/getWebProductById?id=`,
GetAllProductGrosList : `${API_URL}/api/productgros/list/`,
GetProductSimilargros: `${API_URL}/api/productgros/similar?chilCategoryId=`,




//home api
  GetAllArrivage: `${API_URL}/api/product/getAllGroceryStaple`,
  GetAllProductListLimit : `${API_URL}/api/productgros/listlimite`,
  GetAfficheVideoHome: `${API_URL}/api/category/affichevideobytitre?titre=`,
  GetAllMeillvente: `${API_URL}/api/product/meileurvente`,



  //Filter by category
  GetAllCategoryList: `${API_URL}/api/category/cn/list?name=`,
  GetFilterByCategory: `${API_URL}/api/category/c`,

  //profile 
  GetCustomerUpdateDetails: `${API_URL}/api/customer/update`,
  
  //product api
  GetOrderCreateByUser: `${API_URL}/api/order/create`,
  GetOrderByUser: `${API_URL}/api/order/listByid?custId=`,
  GetOrderProductListById: `${API_URL}/api/order/orderByid?id=`,
  

  
  //Get filter by product
  GetProductByFilter: `${API_URL}/api/product/gcatalogsearch/result?search=`,
  GetCategoryListByFilter: `${API_URL}/api/category/catlogsearch/child-category`,
  GetProductBySubcategory: `${API_URL}/api/category/catlogsearch/product`,


  //commercial
  GetCommercialLogin: `${API_URL}/api/commercial/logincom`,
  GetCommercialRegister: `${API_URL}/api/commercial/registercom`,
  GetCommercialUpdate: `${API_URL}/api/commercial/update`,
  GetCommercialBonnus : `${API_URL}/api/commercial/valideBonnus`,
  GetCommercialDetails: `${API_URL}/api/commercial/getagent?nom=`,
  GetCommercialDetailsRemise: `${API_URL}/api/commercial/getByRemise?codeBonnus=`,



  //Service
  GetAfficheServices: `${API_URL}/api/category/afficheservices`,
  GetAfficheServicesvideo: `${API_URL}/api/category/affichevideoservices`,


};
export { API_URL, Apis };
