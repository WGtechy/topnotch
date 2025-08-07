import { paymentConstants, productConstant } from "../constants";
import initState from "../state";

export const productReducer = (state = initState.products, action) => {
  switch (action.type) {
    case productConstant.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case productConstant.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        automobiles:
          action.payload.target === "Automobile"
            ? action.payload.data
            : state.automobiles,
        shortlets:
          action.payload.target === "Shortlet"
            ? action.payload.data
            : state.shortlets,
        hotels:
          action.payload.target === "Hotel"
            ? action.payload.data
            : state.hotels,
        properties:
          action.payload.target === "Property"
            ? action.payload.data
            : state.properties,
            products:
            action.payload.target === "Product"
              ? action.payload.data
              : state.products,
              interiors:
              action.payload.target === "Interior"
                ? action.payload.data
                : state.interiors,
        all:
          action.payload.target === "All" || !action.payload.target
              ? action.payload.data
              : state.all,
        draft:
          action.payload.target === "Draft"
              ? action.payload.data
              : state.draft,
      };
    case productConstant.GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };
    case productConstant.GET_PRODUCT_REQUEST:
      return { ...state, loadingProduct: true };
    case productConstant.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingProduct: false,
        product: action.payload.data,
      };
    case productConstant.GET_PRODUCT_FAIL:
      return {
        ...state,
        loadingProduct: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };
    case productConstant.CREATE_PRODUCT_REQUEST:
      return { ...state, loadingNewProduct: true, completed: false };
    case productConstant.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingNewProduct: false,
        completed: true,
        target: action.payload.target,
        info: action.payload.info,
        updated: action.payload.updated,
        newProduct: action.payload.data,
      };
    case productConstant.CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loadingNewProduct: false,
        error: action.payload.error,
        completed: false,
        info: action.payload.info,
        status: action.payload.status,
      };
   
    default:
      return state;
  }
};



export const postReducer = (state = initState.posts, action) => {
  switch (action.type) {
    case productConstant.GET_POSTS_REQUEST:
      return { ...state, loading: true };
    case productConstant.GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        automobiles:
          action.payload.target === "Automobile"
            ? action.payload.data
            : state.automobiles,
        shortlets:
          action.payload.target === "Shortlet"
            ? action.payload.data
            : state.shortlets,
        hotels:
          action.payload.target === "Hotel"
            ? action.payload.data
            : state.hotels,
        properties:
          action.payload.target === "Property"
            ? action.payload.data
            : state.properties,
            products:
            action.payload.target === "Product"
              ? action.payload.data
              : state.products,
              interiors:
              action.payload.target === "Interior"
                ? action.payload.data
                : state.interiors,
        all:
          action.payload.target === "All" || !action.payload.target
              ? action.payload.data
              : state.all,
        draft:
          action.payload.target === "Draft"
              ? action.payload.data
              : state.draft,
      };
    case productConstant.GET_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };
    case productConstant.GET_POST_REQUEST:
      return { ...state, loadiost: true };
    case productConstant.GET_POST_SUCCESS:
      return {
        ...state,
        loadiost: false,
        product: action.payload.data,
      };
    case productConstant.GET_POST_FAIL:
      return {
        ...state,
        loadiost: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };
    case productConstant.POST_CRUD_REQUEST:
      return { ...state, loadingNewPost: true, completed: false };
    case productConstant.POST_CRUD_SUCCESS:
      return {
        ...state,
        loadingNewPost: false,
        completed: true,
        target: action.payload.target,
        info: action.payload.info,
        updated: action.payload.updated,
        newProduct: action.payload.target === "CREATE" ? action.payload.data : state.newProduct,
      };
    case productConstant.POST_CRUD_FAIL:
      return {
        ...state,
        loadingNewPost: false,
        error: action.payload.error,
        completed: false,
        info: action.payload.info,
        status: action.payload.status,
      };
   
    default:
      return state;
  }
};

export const paystackReducer = (state = initState.newTransaction, action) => {
  switch (action.type) {
    case paymentConstants.INITIATE_NEW_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case paymentConstants.INITIATE_NEW_PAYMENT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case paymentConstants.INITIATE_NEW_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
      };
    
    default:
      return state;
  }
};


export const commentsReducer = (state = initState.comments, action) => {
  switch (action.type) {
    case productConstant.GET_COMMENTS_REQUEST:
      return {
        ...state,
          loadingComments: true,
      };
    case productConstant.GET_COMMENTS_SUCCESS:
      return {
        ...state,
          comments:  action.payload.data,
          loadingComments: false
      };
    case productConstant.GET_COMMENTS_FAIL:
      return {
        ...state,
          loadingComments: false,
          error: action.payload.error,
        info: action.payload.info,
      };
      
     
   
        case productConstant.ADD_COMMENT_REQUEST:
      return {
          ...state,
          loadingComment: true,
      };
    case productConstant.ADD_COMMENT_SUCCESS:
      return {
        ...state,
          newComment: action.payload.data,
          data: [...state.data, action.payload.data],
          loadingComment: false,
          info: action.payload.info,
          commentType: action.payload.crud,
        
      };
    case productConstant.ADD_COMMENT_FAIL:
        return {
          ...state,
            loadingComment: false,
            error: action.payload.error,
          info: action.payload.info,
          commentType: "",
        };
  default:
      return state;
  }
};


export const likesReducer = (state = initState.likes, action) => {
  switch (action.type) {
 
    case productConstant.GET_LIKES_REQUEST:
      return {
        ...state,
          loadinglikes: true,
        
      };
    case productConstant.GET_LIKES_SUCCESS:
      return {
        ...state,
          data: action.payload.data,
          loadinglikes: false,
        
      };
    case productConstant.GET_LIKES_FAIL:
      return {
        ...state,
          loadinglikes: false,
          error: action.payload.error,
        info: action.payload.info,
      };

    case productConstant.ADD_LIKE_REQUEST:
      return {
        ...state,
          loadingLike: true,
        
      };
    case productConstant.ADD_LIKE_SUCCESS:
      return {
        ...state,
          like: action.payload.data,
          data: [action.payload.data, ...state.data],
          info: action.payload.info,
          loadingLike: false,
      };
    case productConstant.ADD_LIKE_FAIL:
      return {
        ...state,
          loadingLike: false,
          error: action.payload.error,
        info: action.payload.info,
      };
    default:
      return state;
  }
};