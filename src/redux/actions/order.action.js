import { toast } from "react-toastify";
import axiosInstance from "../../utilities-config/axios";
import { orderConstant } from "../constants";
import { toastObject } from "../toastObject";

const getOrder = (data) => async (dispatchAction) => {
  dispatchAction({
    type: orderConstant.GET_ORDER_REQUEST,
    payload: { message: "Fetching media" },
  });
  await axiosInstance
    .post("/order/get-order-item", data)

    .then((response) => {
      const {
        data: {
          message: { data, info },
        },
        status,
      } = response;
      dispatchAction({
        type: orderConstant.GET_ORDER_SUCCESS,
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
        type: orderConstant.GET_ORDER_FAIL,
        payload: { error, info, status },
      });
    });
};

const getOrderItems = (data) => async (dispatchAction) => {
  dispatchAction({
    type: orderConstant.GET_ORDER_ITEMS_REQUEST,
  });
  axiosInstance
    .post("/order/all-order-items", data)
    .then((response) => {
      const { data, info, target } = response.data.message;
      dispatchAction({
        type: orderConstant.GET_ORDER_ITEMS_SUCCESS,
        payload: { data, info, target },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: orderConstant.GET_ORDER_ITEMS_FAIL,
        payload: { error, info, status },
      });
    });
};


const orderCRUD = (data) => async (dispatchAction) => {
  dispatchAction({
    type: orderConstant.ORDER_CRUD_REQUEST,
  }); 
  await axiosInstance
    .post("/order/crud", data)
    .then((response) => {
      const { data, info, target } = response.data.message;
      if (["CONFIRM-PAYMENT", "UPDATE"].includes(target)) {
        dispatchAction({
          type: orderConstant.ORDER_CRUD_SUCCESS,
          payload: { data, info, target },
        });
      }
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: orderConstant.ORDER_CRUD_FAIL,
        payload: { error, info, status },
      });
      toast.error(info, toastObject);
    });
};

export { getOrder, getOrderItems, orderCRUD };
