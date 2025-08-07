import { appConstant } from "../constants";
import initState from "../state";

export const appReducer = (state = initState.app, action) => {
  switch (action.type) {
    case appConstant.GET_APP_REQUEST:
      return { ...state, loading: true };
    case appConstant.GET_APP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        analytics: action.payload.analytics,
      };
    case appConstant.GET_APP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };
      case appConstant.UPDATE_APP_REQUEST:
        return { ...state, loadingUpdate: true };
      case appConstant.UPDATE_APP_SUCCESS:
        return {
          ...state,
          loadingUpdate: false,
          data: action.payload.data,
          target: action.payload.target,
        };
      case appConstant.UPDATE_APP_FAIL:
        return {
          ...state,
          loadingUpdate: false,
          error: action.payload.error,
          info: action.payload.info,
          status: action.payload.status,
        };

    default:
      return state;
  }
};
