import { toast } from "react-toastify";
import axiosInstance from "../../utilities-config/axios";
import { cartConstant } from "../constants";
import { toastObject } from "../toastObject";

const getCart = (data) => async (dispatchAction) => {
  dispatchAction({
    type: cartConstant.GET_CART_REQUEST,
    payload: { message: "Fetching media" },
  });
  await axiosInstance
    .post("/cart/get-cart-item", data)

    .then((response) => {
      const {
        data: {
          message: { data, info },
        },
        status,
      } = response;
      dispatchAction({
        type: cartConstant.GET_CART_SUCCESS,
        payload: {
          info,
          data,
          status,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: cartConstant.GET_CART_FAIL,
        payload: { error, info, status },
      });
    });
};

const getCartCount = (accountId) => async (dispatchAction) => {
  dispatchAction({
    type: cartConstant.GET_CART_COUNT_REQUEST,
    payload: { message: "Fetching media" },
  });
  await axiosInstance
    .get(`/cart/get-cart-count?accountId=${accountId}`)
    .then((response) => {
      const {
        data: {
          message: { data },
        },
        status,
      } = response;
      localStorage.setItem("cartCount", data);
      dispatchAction({
        type: cartConstant.GET_CART_COUNT_SUCCESS,
        payload: {
          data,
          status,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: cartConstant.GET_CART_COUNT_FAIL,
        payload: { error, info, status },
      });
    });
};

const getCartItems = (data) => async (dispatchAction) => {
  dispatchAction({
    type: cartConstant.GET_CART_ITEMS_REQUEST,
  });
  axiosInstance
    .post("/cart/all-cart-items", data)
    .then((response) => {
      const { data, info, target } = response.data.message;
      dispatchAction({
        type: cartConstant.GET_CART_ITEMS_SUCCESS,
        payload: { data, info, target },
      });
      let _cart = localStorage.getItem("cart");
      if (![null, undefined, "null"].includes(_cart)) {
        if (!!JSON.parse(_cart).length) {
          localStorage.setItem(
            "cart",
            JSON.stringify([data, ...JSON.parse(_cart)])
          );
        } else {
          localStorage.setItem("cart", JSON.stringify(data));
        }
      } else {
        localStorage.setItem("cart", JSON.stringify(data));
      }
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: cartConstant.GET_CART_ITEMS_FAIL,
        payload: { error, info, status },
      });
    });
};

const cartCrud = (data) => async (dispatchAction) => {
  dispatchAction({
    type: cartConstant.CART_AND_CRUD_REQUEST,
  });

  if (data?.accountId) {
    await axiosInstance
      .post("/cart/add-to-cart", data)
      .then((response) => {
        const { data, info, target, isAdmin } = response.data.message;
        if (["CREATE", "UPDATE"].includes(target)) {
          dispatchAction({
            type: cartConstant.CART_AND_CRUD_SUCCESS,
            payload: { data, info, target, isAdmin },
          });
          let _cart = localStorage.getItem("cart");
          if (![null, undefined, "null"].includes(_cart)) {
            if (!!JSON.parse(_cart).length) {
              _cart.filter((x) => x.productId?._id !== data.productId._id);
              localStorage.setItem(
                "cart",
                JSON.stringify([data, ...JSON.parse(_cart)])
              );
            } else {
              localStorage.setItem("cart", JSON.stringify(data));
            }
          } else {
            localStorage.setItem("cart", JSON.stringify(data));
          }
        } else {
          let _cart = localStorage.getItem("cart");
          if (![null, undefined, "null"].includes(_cart)) {
            if (!!JSON.parse(_cart).length) {
              _cart.filter((x) => x.productId?._id !== data.productId._id);
              localStorage.setItem("cart", JSON.stringify(_cart));
            }
          }
        }
      })
      .catch((err) => {
        const res = err.response;
        const error = res?.data?.message?.error;
        const info = res?.data?.message?.info;
        const status = res?.status;
        dispatchAction({
          type: cartConstant.CART_AND_CRUD_FAIL,
          payload: { error, info, status },
        });
        toast.error(info, toastObject);
      });
  } else {
  }
};

export { getCart, getCartItems, cartCrud, getCartCount };
