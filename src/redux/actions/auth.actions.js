import {
  authConstants,
  cartConstant,
  membersConstant,
  // membersConstant,
} from "../constants";
import Axios from "../../utilities-config/axios"; //default  can be imported as word.
import { toast } from "react-toastify";
import { toastObject } from "../toastObject";
import axiosInstance from "../../utilities-config/axios";
// import store from "../redux/store";

const offlineToServerCart = (data) => async (dispatchAction) => {
  dispatchAction({
    type: cartConstant.CART_AND_CRUD_REQUEST,
  });

  await axiosInstance
    .post("/cart/add-to-cart", data)
    .then((response) => {
      localStorage.setItem("cart", JSON.stringify([]));
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
};
const signIn = (data) => async (dispatchAction) => {
  dispatchAction({
    type: authConstants.SIGNIN_REQUEST,
  });
  axiosInstance
    .post(
      `/${data?.target === "recoverPassword" ? "forgot-password" : "signin"}`,
      { ...data }
    )
    .then((res) => {
      const { info, infoMessage } = res.data.message;
      if (info === "ACCESS") {
        const {
          data: { user, token },
        } = res.data.message;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        let _cart = localStorage.getItem("cart");
        if (![null, undefined, "null"].includes(_cart)) {
          if (!!JSON.parse(_cart).length) {
            offlineToServerCart({
              crud: "OFFLINETOSERVERUPLOAD",
              accountId: user?._id,
              offlineCartItems: JSON.parse(_cart),
            });
          }
        }
        dispatchAction({
          type: authConstants.SIGNIN_SUCCESS,
          payload: { user, token, info: "info" },
        });
        if (data?.history) {
          data.history.goBack();
          // data.history.go()
        }
      } else if (["FORGOT-PASSWORD", "RESET-PASSWORD"].includes(info)) {
        const { data } = res.data.message;
        localStorage.setItem("accountId", data._id);
        localStorage.setItem("otpResetPassword", "FORGOT-PASSWORD");

        dispatchAction({
          type: authConstants.SIGNIN_SUCCESS,
          payload: { info: "Provide token" },
        });
        toast.success(infoMessage, toastObject);
      }
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const infoMessage = res?.data?.message?.infoMessage;
      const info = res?.data?.message?.info;
      const status = res?.status;

      if (["FORGOT-PASSWORD", "RESET-PASSWORD"].includes(info)) {
        toast.error(infoMessage, toastObject);
      } else {
        toast.error(info, toastObject);
      }

      dispatchAction({
        type: authConstants.SIGNIN_FAIL,
        payload: { error, info: infoMessage || info, status },
      });
    });
};

const forgotPassword = (data) => async (dispatchAction) => {
  dispatchAction({
    type: authConstants.FORGOT_PASSWORD_REQUEST,
  });

  Axios.post("/forgot-password", data)
    .then((res) => {
      const { status, info } = res.data.message;
      if (info !== "Valid link") {
        toast.warning(info, toastObject);
      }
      dispatchAction({
        type: authConstants.FORGOT_PASSWORD_SUCCESS,
        payload: { status, info },
      });
    })
    .catch((err) => {
      const {
        data: {
          message: { error, info },
        },
        status,
      } = err.response;
      toast.error(info, toastObject);
      dispatchAction({
        type: authConstants.FORGOT_PASSWORD_FAIL,
        payload: { error, info: info || info, status },
      });
    });
};

const isSignedIn = () => async (dispatchAction) => {
  const token = localStorage.getItem("token"); // this will check the user timeout
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatchAction({
      type: authConstants.SIGNIN_SUCCESS,
      payload: {
        token,
        user,
        info: "You already signed in",
      },
      // payload:  member
    });
  } else {
    dispatchAction({
      type: authConstants.IS_SIGNIN_FAIL,
      payload: {
        authenticate: false,
        info: "",
      },
    });
  }
};

const signUp = (user) => async (dispatchAction) => {
  dispatchAction({
    type: authConstants.SIGNUP_REQUEST,
  });
  Axios.post("/signup", { ...user })
    .then((res) => {
      const { data, info } = res.data.message;
      localStorage.setItem("accountId", data._id);
      dispatchAction({
        type: authConstants.SIGNUP_SUCCESS,
        payload: { info, data },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      toast.error(info, toastObject);
      dispatchAction({
        type: authConstants.SIGNUP_FAIL,
        payload: { error, info, status },
      });
    });
};

const signOut = (data) => async (dispatchAction) => {
  dispatchAction({
    type: authConstants.SIGNOUT_REQUEST,
  });
  axiosInstance
    .post("/signout", data)
    .then((res) => {
      // let _cart = localStorage.getItem("cart");
      localStorage.clear();
      dispatchAction({
        type: authConstants.SIGNOUT_SUCCESS,
      });
      data.history.go();
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;

      dispatchAction({
        type: authConstants.SIGNOUT_FAIL,
        payload: { error, info, status },
      });
    });
};

const checkData = (data) => async (dispatchAction) => {
  dispatchAction({
    type: membersConstant.CHECK_DATA_REQUEST,
  });
  Axios.post("/member/check-data", { ...data })
    .then((res) => {
      const { data, info, actionType } = res.data.message;
      dispatchAction({
        type: membersConstant.CHECK_DATA_SUCCESS,
        payload: { data, info, actionType },
      });
    })
    .catch((err) => {
      const { error, info, status } = err.response.message;

      dispatchAction({
        type: membersConstant.CHECK_DATA_FAIL,
        payload: { error, info, status },
      });
    });
};

const checkOTP = (data) => async (dispatchAction) => {
  dispatchAction({
    type: authConstants.CHECK_OTP_REQUEST,
    payload: { info: "Sending request to server..." },
  });
  axiosInstance
    .post("/check-otp", { ...data })
    .then((response) => {
      const { data, info, user, token } = response.data.message;
      dispatchAction({
        type: authConstants.CHECK_OTP_SUCCESS,
        payload: { data, info },
      });
      // Sign in
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.clear("otpResetPassword");

      dispatchAction({
        type: authConstants.SIGNIN_SUCCESS,
        payload: { user, token, info: "info" },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: authConstants.CHECK_OTP_FAIL,
        payload: { error, info, status },
      });
      toast.error(info, toastObject);
    });
};

const mediaCrud = (data) => async (dispatchAction) => {
  dispatchAction({
    type: membersConstant.MEDIA_CRUD_REQUEST,
    payload: { message: "Fetching media" },
  });
  await axiosInstance
    .post("/media-crud", data)
    .then((response) => {
      const {
        data: {
          message: { data, info },
        },
        status,
      } = response;
      dispatchAction({
        type: membersConstant.MEDIA_CRUD_SUCCESS,
        payload: {
          info,
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
      toast.error(info, toastObject);
      dispatchAction({
        type: membersConstant.MEDIA_CRUD_FAIL,
        payload: { error, info, status },
      });
    });
};

const getMedia =
  ({ fetch, target, targetId, accountId, cAccountId, isPublic }) =>
  async (dispatchAction) => {
    dispatchAction({
      type: membersConstant.GET_MEDIA_REQUEST,
      payload: { message: "Fetching profile" },
    });
    await axiosInstance
      .get(
        `/get-media?fetch=${fetch}&target=${target}&isPublic=${isPublic}&targetId=${targetId}&accountId=${accountId}&cAccountId=${cAccountId}`
      )
      .then((response) => {
        const {
          data: {
            message: { data, info },
          },
        } = response;

        dispatchAction({
          type: membersConstant.GET_MEDIA_SUCCESS,
          payload: {
            info,
            data,
          },
        });
      })
      .catch((err) => {
        const res = err.response;
        const error = res?.data?.message?.error;
        const info = res?.data?.message?.info;
        const status = res?.status;
        dispatchAction({
          type: membersConstant.GET_MEDIA_FAIL,
          payload: { error, info, status },
        });
      });
  };

const userProfile = (data) => async (dispatchAction) => {
  dispatchAction({
    type: membersConstant.USER_PROFILE_REQUEST,
    payload: { message: "Fetching profile", target: data?.target },
  });
  await axiosInstance
    .post("/user-profile", data)
    .then((response) => {
      const {
        data: {
          message: { data, info, target },
        },
      } = response;

      dispatchAction({
        type: membersConstant.USER_PROFILE_SUCCESS,
        payload: {
          info,
          data,
          target,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: membersConstant.USER_PROFILE_FAIL,
        payload: { error, info, status },
      });
    });
};

const personalProfile = (accountId) => async (dispatchAction) => {
  dispatchAction({
    type: membersConstant.PERSONAL_PROFILE_REQUEST,
    payload: { message: "Fetching profile" },
  });
  await axiosInstance
    .get(`/presonal-profile/?accountId=${accountId}`,)
    .then((response) => {
      const { data: {message: { data, info }}} = response;
      localStorage.setItem("user", JSON.stringify(data))

      dispatchAction({
        type: membersConstant.PERSONAL_PROFILE_SUCCESS,
        payload: {
          info,
          data,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: membersConstant.PERSONAL_PROFILE_FAIL,
        payload: { error, info, status },
      });
    });
};

const dashboard = (data) => async (dispatchAction) => {
  dispatchAction({
    type: membersConstant.DASHBOARD_REQUEST,
  });
  await axiosInstance
    .post("/dashboard", data)
    .then((response) => {
      const {
        data: {
          message: { data, info },
        },
      } = response;

      dispatchAction({
        type: membersConstant.DASHBOARD_SUCCESS,
        payload: {
          info,
          data,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: membersConstant.DASHBOARD_FAIL,
        payload: { error, info, status },
      });
    });
};

export {
  signIn,
  getMedia,
  isSignedIn,
  signUp,
  userProfile,
  checkOTP,
  signOut,
  personalProfile,
  mediaCrud,
  checkData,
  forgotPassword,
};
