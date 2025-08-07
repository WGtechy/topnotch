import axios from "axios";
import { api } from "./urlConfig";
import store from "../redux/store";

import { authConstants, serverConstants } from "../redux/constants";
import { toast } from "react-toastify";
let token;
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// Old code. this may be the cause of looping. i will have to debug the code before use
axiosInstance.interceptors.request.use((request) => {
  if (
    ![null, undefined, "null"].includes(window.localStorage.getItem("token"))
  ) {
    token = window.localStorage.getItem("token");
  } else {
    token = store.getState().signIn.token;
  }
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      status,
      data: { message },
    } = error.response;

    if (error.status >= 200 && !error.response) {
      toast.error("Network error, Please connect to the internet");
      store.dispatch({
        type: serverConstants.SERVER_NETWORK,
        payload: {
          message: "Network erorr, Please connect to the internet",
          internet: false,
        },
      });
    }
    if (status === 404) {
    }

    if (status === 500) {
      localStorage.clear();
      store.dispatch({
        type: serverConstants.SYSTEM_TIMEOUT,
        payload: { message, status },
      });
      store.dispatch({ type: authConstants.SIGNOUT_SUCCESS });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
