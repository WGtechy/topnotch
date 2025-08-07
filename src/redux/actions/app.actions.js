import { toast } from "react-toastify";
import axiosInstance from "../../utilities-config/axios";
import { appConstant } from "../constants";
import { toastObject } from "../toastObject";


const getApp = ({accountId, target}) => async (dispatchAction) => {
  dispatchAction({
    type: appConstant.GET_APP_REQUEST,
    payload: { message: "Fetching media" },
  });
  await axiosInstance.get(`/app?accountId=${accountId ? accountId : ''}&target=${target}`)
    .then((response) => {
      const {
        data: {
          message: { 
            data, 
            info, 
            analytics
           },
        },
        status,
      } = response;
      dispatchAction({
        type: appConstant.GET_APP_SUCCESS,
        payload: {
          info,
          data,
          analytics,
          status,
        },
      });
      // toast.success(info, toastObject);
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: appConstant.GET_APP_FAIL,
        payload: { error, info, status },
      });
      // toast.error(info, toastObject);
    });
};



const updateApp = (data) => async (dispatchAction) => {
    dispatchAction({
      type: appConstant.UPDATE_APP_REQUEST,
      payload: { message: "Fetching media" },
    });
    await axiosInstance.post("/app/update", data)
      .then((response) => {
        const {
          data: {
            message: { data, info, target },
          },
          status,
        } = response;
        dispatchAction({
          type: appConstant.UPDATE_APP_SUCCESS,
          payload: {
            info,
            target,
            data,
            status,
          },
        });
        toast.success(info, toastObject);
      })
      .catch((err) => {
        const res = err.response;
        const error = res?.data?.message?.error;
        const info = res?.data?.message?.info;
        const status = res?.status;
        dispatchAction({
          type: appConstant.UPDATE_APP_FAIL,
          payload: { error, info, status },
        });
        toast.error(info, toastObject);
      });
  };
  // decriptData({}, 'ads')
  export {
    getApp,
    updateApp
  }