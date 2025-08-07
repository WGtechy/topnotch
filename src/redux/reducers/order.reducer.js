import { orderConstant } from "../constants";
import initState from "../state";

const orderReducer = (state = initState.order, action) => {
  switch (action.type) {
    case orderConstant.ORDER_CRUD_REQUEST:
      return { ...state, loading: true };
    case orderConstant.ORDER_CRUD_SUCCESS:
      return {
        ...state,
        loading: false,
        newOrder: action.payload.target === "CREATE" ? action.payload.data : null,
        info: action.payload.info,
        order: ["CONFIRM-PAYMENT", "UPDATE"].includes(action.payload.target) ? action.payload.data : state.order
      };
    case orderConstant.ORDER_CRUD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };
    case orderConstant.GET_ORDER_REQUEST:
      return { ...state, loadingOrder: true };
    case orderConstant.GET_ORDER_SUCCESS:
      return {
        ...state,
        loadingOrder: false,
        order: action.payload.data,
        info: action.payload.info
      };
    case orderConstant.GET_ORDER_FAIL:
      return {
        ...state,
        loadingOrder: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };

    case orderConstant.GET_ORDER_ITEMS_REQUEST:
      return { ...state, loading: true };
    case orderConstant.GET_ORDER_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.data,
      };
    case orderConstant.GET_ORDER_ITEMS_FAIL:
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

export { orderReducer };
