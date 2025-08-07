import { cartConstant } from "../constants";
import initState from "../state";

const cartReducer = (state = initState.cart, action) => {
  switch (action.type) {
    case cartConstant.CART_AND_CRUD_REQUEST:
      return { ...state, loadingNewCart: true };
    case cartConstant.CART_AND_CRUD_SUCCESS:
      return {
        ...state,
        loadingNewCart: false,
        newCart: action.payload.data,
        cartCount:
          action.payload.target === "CREATE"
            ? state.cartCount + 1
            : action.payload.target === "DELETE"
            ? state.cartCount - 1
            : state.cartCount,
      };
    case cartConstant.CART_AND_CRUD_FAIL:
      return {
        ...state,
        loadingNewCart: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };
    case cartConstant.GET_CART_REQUEST:
      return { ...state, loadingCart: true };
    case cartConstant.GET_CART_SUCCESS:
      return {
        ...state,
        loadingCart: false,
        cartItem: action.payload.data,
      };
    case cartConstant.GET_CART_FAIL:
      return {
        ...state,
        loadingCart: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };

    case cartConstant.GET_CART_ITEMS_REQUEST:
      return { ...state, loading: true };
    case cartConstant.GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        carts: action.payload.data,
      };
    case cartConstant.GET_CART_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        info: action.payload.info,
        status: action.payload.status,
      };

    case cartConstant.GET_CART_COUNT_SUCCESS:
      return {
        ...state,
        cartCount: action.payload.data,
      };
    case cartConstant.GET_CART_COUNT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        status: action.payload.status,
      };

    default:
      return state;
  }
};

export { cartReducer };
