import { membersConstant, serverConstants} from "../constants"

 export const serverMsg = (data) =>  (dispatchAction) => {
     const {error, info} = data;
    dispatchAction({
      type: serverConstants.SERVER_ERROR,
      payload: {info:"Sending request to server..."},
    });

    dispatchAction({
        type: serverConstants.SERVER_NETWORK,
        payload: { info },
      });
    
  };