import initState from "../state";
import {
  authConstants,
  registerConstant,
  membersConstant,
  contactConstant,
} from "../constants";
import { deleteMembers } from "./utilities";

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

      case membersConstant.PERSONAL_PROFILE_REQUEST:
        return { ...state, loading: true };
      case membersConstant.PERSONAL_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          info: action.payload.info,
          user: action.payload.data,
        };
      case membersConstant.PERSONAL_PROFILE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          info: action.payload.info,
        };
  
      case authConstants.FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case authConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info,
        status: action.payload.status
      };
    case authConstants.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status
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

const membersReducers = (state = initState.users, action) => {
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

// const mediaReducer = (state = initState.media, action) => {
//   switch (action.type) {
//     case membersConstant.GET_MEDIA_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case membersConstant.GET_MEDIA_SUCCESS:
//       return {
//         ...state,
//         data: action.payload.data,
//         info: action.payload.indo,
//         loading: false,
//       };
//     case membersConstant.GET_MEDIA_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload.error,
//       };
//     case membersConstant.MEDIA_CRUD_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case membersConstant.MEDIA_CRUD_SUCCESS:
//       return {
//         ...state,
//         data: action.payload.data,
//         info: action.payload.indo,
//         loading: false,
//       };
//     case membersConstant.MEDIA_CRUD_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload.error,
//       };

//     default:
//       return state;
//   }
// };

const createAccountReducer = (state = initState.createAccount, action) => {
  switch (action.type) {
    case authConstants.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        completed: true,
        info: action.payload.info,
      };

    case authConstants.SIGNUP_FAIL:
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
    case membersConstant.GET_MEDIA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case membersConstant.MEDIA_CRUD_REQUEST:
      return {
        ...state,
        loadingNew: true,
      };
    case membersConstant.MEDIA_CRUD_SUCCESS:
      return {
        ...state,
        newImage: action.payload.data,
        info: action.payload.indo,
        loadingNew: false,
      };
    case membersConstant.MEDIA_CRUD_ERROR:
      return {
        ...state,
        loadingNew: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};



const contactUsReducer = (state = initState.contactUs, action) => {
  switch (action.type) {
    case contactConstant.GET_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case contactConstant.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        info: action.payload.indo,
        loading: false,
      };
    case contactConstant.GET_CONTACTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case contactConstant.CREATE_CONTACT_REQUEST:
      return {
        ...state,
        loadingNew: true,
      };
    case contactConstant.CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        newContactUs: action.payload.data,
        info: action.payload.indo,
        loadingNew: false,
      };
    case contactConstant.CREATE_CONTACT_ERROR:
      return {
        ...state,
        loadingNew: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
const otpReducer = (state = initState.otp, action) => {
  switch (action.type) {
    case authConstants.CHECK_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.CHECK_OTP_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        info: action.payload.info,
        loading: false,
      };
    case authConstants.CHECK_OTP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
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
  mediaReducer,
  otpReducer,
  contactUsReducer,
  createAccountReducer,
};
