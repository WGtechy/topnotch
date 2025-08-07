import initState from "../state";
import {
  authConstants,
  registerConstant,
  membersConstant,
  serverConstants,
} from "../constants";
import {
  deleteMembers,
} from "./utilities";


const signInReducer = (state = initState.signIn, action) => {
  switch (action.type) {
    case authConstants.SIGNIN_REQUEST:
      return { ...state, authenticating: true, loading: true };
    case authConstants.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        sAd: action.payload.superAdmin,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
    case authConstants.SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
        authenticating: false,
      };

    case authConstants.FIRST_TIMER:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
      };

    case authConstants.IS_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        authenticate: action.payload.authenticate,
      };

    case authConstants.SIGNOUT_REQUEST:
      return { ...state, loading: true }; //return empty object will remove the user info from the state and local-storage

    case authConstants.SIGNOUT_SUCCESS:
      return { signout: true }; //return empty object will remove the user info from the state and local-storage

    default:
      return state;
  }
};


const signUpReducer = (state = initState.signUp, action) => {
  switch (action.type) {
    case registerConstant.SIGNUP_REQUEST:
      return { ...state, loading: true };
    case registerConstant.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        data: action.payload.data,
        completed: action.payload.completed,
      };

    case registerConstant.SIGNUP_FAIL:
      return {
        loading: false,
        info: action.payload.info,
        error: action.payload.error,
        completed: false,
      };

    default:
      return state;
  }
};

const membersReducers = (state = initState.allMembers, action) => {
  switch (action.type) {
    case membersConstant.GET_ALL_MEMBERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case membersConstant.GET_ALL_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload.data,
        loading: false,
        status: action.payload.status,
      };
    case membersConstant.GET_ALL_MEMBERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        status: action.payload.status,
      };


    case membersConstant.ADD_NEW_MEMBER_REQUEST:
      return {
        ...state,
        newMember: {
          ...state.newMember,
          loading: true,
        },
      };
    case membersConstant.ADD_NEW_MEMBER_SUCCESS:
      return {
        ...state,
        newMember: {
          ...state.newMember,
          member: action.payload.data,
          info: action.payload.info,
          completed: true,
          status: action.payload.status,
          loading: false,
        },
      };
    case membersConstant.ADD_NEW_MEMBER_FAIL:
      return {
        ...state,
        newMember: {
          ...state.newMember,
          loading: false,
          completed: false,
          error: action.payload.error,
          info: action.payload.info,
          status: action.payload.status,
        },
      };

   case membersConstant.DELETE_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case membersConstant.DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        members: deleteMembers(state.members, action.payload.data),
        info: action.payload.info,
        status: action.payload.status,
      };
    case membersConstant.DELETE_MEMBER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };
    case membersConstant.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case membersConstant.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        member: action.payload.isPersonalUpdate
          ? action.payload.data
          : state.member,
      };
    case membersConstant.PROFILE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

const dashboardReducer =  (state = initState.dashboard, action) => {
  switch (action.type) {
    case registerConstant.DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case registerConstant.DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        data: action.payload.data,
        completed: action.payload.completed,
      };

    case registerConstant.DASHBOARD_FAIL:
      return {
        loading: false,
        info: action.payload.info,
        error: action.payload.error,
        completed: false,
      };

    default:
      return state;
  }
};





const userProfileReducer = (state = initState.userProfile, action) => {
  switch (action.type) {
    case membersConstant.USER_PROFILE_REQUEST:
      return {
        ...state,
        loadingOrders: action.payload.target === "orders" ? true : false,
        loadingPendings: action.payload.target === "pendings" ? true : false,
        loadingAdmins: action.payload.target === "admins" ? true : false,
        loadingCustomers: action.payload.target === "customers" ? true : false,
        loadingProducts: action.payload.target === "products" ? true : false,
        loadingCompletedOrders: action.payload.target === "completedOrders" ? true : false,
        loadingLikedProducts: action.payload.target === "likedProducts" ? true : false,
        loadingSharedProducts: action.payload.target === "sharedProducts" ? true : false,
        loadingSavedProducts: action.payload.target === "savedProducts" ? true : false,
        loadingCarts: action.payload.target === "carts" ? true : false,
        loadingEarnings: action.payload.target === "earnings" ? true : false,
        loadingWishlists: action.payload.target === "wishlists" ? true : false,


      };
    case membersConstant.USER_PROFILE_SUCCESS:
      return {
        ...state,
        orders: action.payload.target === "orders" ? action.payload.data : state.orders,
        pendings: action.payload.target === "pendings" ? action.payload.data : state.pendings,
        admins: action.payload.target === "admins" ? action.payload.data : state.admins,
        customers: action.payload.target === "customers" ? action.payload.data : state.customers,
        products: action.payload.target === "products" ? action.payload.data : state.products,
        completedOrders: action.payload.target === "completedOrders" ? action.payload.data : state.completedOrders,
        likedProducts: action.payload.target === "likedProducts" ? action.payload.data : state.likedProducts,
        sharedProducts: action.payload.target === "" ? action.payload.data : state.sharedProducts,
        savedProducts: action.payload.target === "savedProducts" ? action.payload.data : state.savedProducts,
        carts: action.payload.target === "carts" ? action.payload.data : state.carts,
        earnings: action.payload.target === "earnings" ? action.payload.data : state.earnings,
        wishlists: action.payload.target === "wishlists" ? action.payload.data : state.wishlists,
        info: action.action.payload.info,
        loading: false,
      };
    case serverConstants.USER_PROFILE_ERROR:
      return {
        ...state,
        loadingOrders: false,
        loadingPendings: false,
        loadingAdmins: false,
        loadingCustomers: false,
        loadingProducts: false,
        loadingCompletedOrders: false,
        loadingLikedProducts: false,
        loadingSharedProducts: false,
        loadingSavedProducts: false,
        loadingCarts: false,

        error: action.payload.error,
      };
    

    default:
      return state;
  }
};

const mediaReducer = (state = initState.media, action) => {
  switch (action.type) {
    case membersConstant.GET_MEDIA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case membersConstant.GET_MEDIA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        info: action.payload.indo,
        loading: false,
      };
    case serverConstants.GET_MEDIA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case membersConstant.MEDIA_CRUD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case membersConstant.MEDIA_CRUD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        info: action.payload.indo,
        loading: false,
      };
    case serverConstants.MEDIA_CRUD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

const createAccountReducer = (
  state = initState.createAccount,
  action
) => {
  switch (action.type) {
    case membersConstant.CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case membersConstant.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        completed: true,
        info: action.payload.info,
      };

    case membersConstant.CREATE_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        completed: false,
        info: action.payload.info,
        status: action.payload.status,
      };
    
      
    default:
      return state;
  }
};



export {
  signInReducer,
  signUpReducer,
  membersReducers,
  userProfileReducer,
  mediaReducer,
  createAccountReducer,
};
