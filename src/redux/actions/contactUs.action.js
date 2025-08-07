

import { toast } from "react-toastify";
import axiosInstance from "../../utilities-config/axios";
import { contactConstant } from "../constants";
import { toastObject } from "../toastObject";

const getContactUs = (data) => async (dispatchAction) => {
  dispatchAction({
    type: contactConstant.GET_CONTACTS_REQUEST,
  });
  axiosInstance
    .post("/contact-us", data)
    .then((response) => {
      const { data, info } = response.data.message;

      dispatchAction({
        type: contactConstant.GET_CONTACTS_SUCCESS,
        payload: { data, info },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: contactConstant.GET_CONTACTS_FAIL,
        payload: { error, info, status },
      });
    });
};

const contactUsCRUD = (data) => async (dispatchAction) => {
  dispatchAction({
    type: contactConstant.CREATE_CONTACT_REQUEST,
    payload: { message: "Fetching media" },
  });
  await axiosInstance
    .post("/contact-us/crud", data)
    .then((response) => {
      const {
        data: {
          message: { data, info },
        },
        status,
      } = response;
      dispatchAction({
        type: contactConstant.CREATE_CONTACT_SUCCESS,
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
        type: contactConstant.CREATE_CONTACT_FAIL,
        payload: { error, info, status },
      });
    });
};

export{
    contactUsCRUD,
    getContactUs
}