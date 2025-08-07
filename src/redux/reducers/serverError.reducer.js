import initState from "../state";
import { serverConstants } from "../constants";
 
//

export const serverMessageReducer = (state = initState.serverMessage, action) => {
    switch(action.type){
      
      case serverConstants.SYSTEM_TIMEOUT:
        return {
          ...state,
          status: action.payload.status,
          message: action.payload.message
        };
        case serverConstants.SERVER_NETWORK:
          return {
            ...state,
            internet: action.payload.internet,
            message: action.payload.info
          }
      default: return state;
    }
  };