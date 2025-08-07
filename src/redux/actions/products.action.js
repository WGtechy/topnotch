import { toast } from "react-toastify";
import { toastObject } from "../toastObject";
import axiosInstance from "../../utilities-config/axios";
import { paymentConstants, productConstant } from "../constants";

const getProducts = (data) => async (dispatchAction) => {
  dispatchAction({
    type: productConstant.GET_PRODUCTS_REQUEST,
  });
  axiosInstance
    .post("/product/all", data)
    .then((response) => {
      const { data, info, target } = response.data.message;

      dispatchAction({
        type: productConstant.GET_PRODUCTS_SUCCESS,
        payload: { data, info, target },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: productConstant.GET_PRODUCTS_FAIL,
        payload: { error, info, status },
      });
    });
};

const productCrud = (data) => async (dispatchAction) => {
  dispatchAction({
    type: productConstant.CREATE_PRODUCT_REQUEST,
    payload: { message: "Fetching media" },
  });
  await axiosInstance
    .post("/product/crud", data)
    .then((response) => {
      const {
        data: {
          message: { data, info, crud, target },
        },
        status,
      } = response;
      if (crud !== "INITIALIZE") {
        toast.success(info, toastObject);
      }
      dispatchAction({
        type: productConstant.CREATE_PRODUCT_SUCCESS,
        payload: {
          info,
          target,
          init: crud === "INITIALIZE" ? data : null,
          data: ["INITIALIZE", "CREATE"].includes(crud) ? data : null,
          updated: crud === "UPDATE" ? data : null,
          status,
        },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      toast.error(info, toastObject);
      dispatchAction({
        type: productConstant.CREATE_PRODUCT_FAIL,
        payload: { error, info, status },
      });
    });
};

const initiateNewPayment = (data) => async (dispatchAction) => {
  dispatchAction({
    type: paymentConstants.INITIATE_NEW_PAYMENT_REQUEST,
    payload: { info: "Sending request to server..." },
  });
  axiosInstance
    .post("/initiate-new-payment", data)
    .then((response) => {
      const { data } = response.data.message;
      dispatchAction({
        type: paymentConstants.INITIATE_NEW_PAYMENT_SUCCESS,
        payload: { data },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      const status = res?.status;
      dispatchAction({
        type: paymentConstants.INITIATE_NEW_PAYMENT_FAIL,
        payload: { error, info, status },
      });
      toast.error(info, toastObject);
    });
};
const getProduct = (_id) => async (dispatchAction) => {
  dispatchAction({
    type: productConstant.GET_PRODUCT_REQUEST,
    payload: { message: "Fetching media" },
  });
  await axiosInstance
    .get(`/product/get?_id=${_id}`)
    .then((response) => {
      const {
        data: {
          message: { data, info },
        },
        status,
      } = response;
      dispatchAction({
        type: productConstant.GET_PRODUCT_SUCCESS,
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
        type: productConstant.GET_PRODUCT_FAIL,
        payload: { error, info, status },
      });
    });
};

const getComments =
  ({ crud, postId, parentId, accountId, skip }) =>
  async (dispatchAction) => {
    dispatchAction({
      type: productConstant.GET_COMMENTS_REQUEST,
    });
    axiosInstance
      .get(
        `/post/get-comments?postId=${postId}&skip=${skip}&crud=${crud}&accountId=${accountId}&parentId=${parentId}`
      )
      .then((response) => {
        const {
          data: {
            message: { data, crud, info },
          },
          status,
        } = response;
        dispatchAction({
          type: productConstant.GET_COMMENTS_SUCCESS,
          payload: { data, info, crud, status },
        });
      })
      .catch((err) => {
        const res = err.response;
        const error = res?.data?.message?.error;
        const info = res?.data?.message?.info;
        const status = res?.status;
        dispatchAction({
          type: productConstant.GET_COMMENTS_FAIL,
          payload: { error, info, status },
        });
      });
  };

  const getSaved =
  ({ crud, postId, accountId, skip }) =>
  async (dispatchAction) => {
    dispatchAction({
      type: productConstant.GET_SAVED_REQUEST,
    });
    axiosInstance
      .get(
        `/post/get-saved?postId=${postId}&skip=${skip}&accountId=${accountId}`
      )
      .then((response) => {
        const {
          data: {
            message: { data, info },
          },
          status,
        } = response;
        dispatchAction({
          type: productConstant.GET_SAVED_SUCCESS,
          payload: { data, info, crud, status },
        });
      })
      .catch((err) => {
        const res = err.response;
        const error = res?.data?.message?.error;
        const info = res?.data?.message?.info;
        const status = res?.status;
        dispatchAction({
          type: productConstant.GET_SAVED_FAIL,
          payload: { error, info, status },
        });
      });
  };

const contentLike = (data) => async (dispatchAction) => {
  dispatchAction({
    type: productConstant.ADD_LIKE_REQUEST,
    message: "Sending request to server...",
  });
  axiosInstance
    .post("/post/content-like", { ...data })
    .then((response) => {
      const { data, info } = response.data.message;
      dispatchAction({
        type: productConstant.ADD_LIKE_SUCCESS,
        payload: { data, info },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      dispatchAction({
        type: productConstant.ADD_LIKE_FAIL,
        payload: { error, info },
      });
    });
};


// check
const addComment = (data) => async (dispatchAction) => {
  dispatchAction({
    type: productConstant.ADD_COMMENT_REQUEST,
    message: "Sending request to server...",
  });

  axiosInstance
    .post("/post/comment-post", { ...data })
    .then((response) => {
      const { data, info, crud } = response.data.message;
      dispatchAction({
        type: productConstant.ADD_COMMENT_SUCCESS,
        payload: { data, info, crud },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      dispatchAction({
        type: productConstant.ADD_COMMENT_FAIL,
        payload: { error, info },
      });
    });
};

const deleteComment = (data) => async (dispatchAction) => {
  dispatchAction({
    type: productConstant.DELETE_COMMENT_REQUEST,
    message: "Sending request to server...",
  });

  axiosInstance
    .post("/post/comment-delete", { ...data })
    .then((response) => {
      const { data, info, crud } = response.data.message;
      dispatchAction({
        type: productConstant.DELETE_COMMENT_SUCCESS,
        payload: { data, info, crud },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      dispatchAction({
        type: productConstant.DELETE_COMMENT_FAIL,
        payload: { error, info },
      });
    });
};

const updateComment = (data) => async (dispatchAction) => {
  dispatchAction({
    type: productConstant.UPDTATE_COMMENT_REQUEST,
    message: "Sending request to server...",
  });

  axiosInstance
    .post("/post/comment-update", { ...data })
    .then((response) => {
      const { data, info, crud } = response.data.message;
      dispatchAction({
        type: productConstant.UPDTATE_COMMENT_SUCCESS,
        payload: { data, info, crud },
      });
    })
    .catch((err) => {
      const res = err.response;
      const error = res?.data?.message?.error;
      const info = res?.data?.message?.info;
      dispatchAction({
        type: productConstant.UPDTATE_COMMENT_FAIL,
        payload: { error, info },
      });
    });
};

const postCRUD = (postData) => async () => {
  axiosInstance.post("/post/crud-post", { ...postData });
};

const wishList = (postData) => async () => {
  axiosInstance.post("/product/wish-list", { ...postData });
};

const getPosts = (data) => async (dispatchAction) => {
  dispatchAction({
    type: productConstant.GET_POSTS_REQUEST,
  });
  axiosInstance
    .post("/post/get-posts", data)
    .then((response) => {
      const { data, info, target } = response.data.message;
      console.log({data, info, target})
      let serverData = {
        type: productConstant.GET_POSTS_SUCCESS,
        payload: {
          data,
          info,
          target,
        },
      };
      dispatchAction(serverData);
    })
    .catch((err) => {
      const { response } = err;
      dispatchAction({
        type: productConstant.GET_POSTS_FAIL,
        payload: {
          error: response?.data?.message?.error,
          info: response?.data?.message?.info,
          target: response?.data?.message?.target,
          status: response?.status,
        },
      });
    });
};

export {
  getProducts,
  getProduct,
  postCRUD,
  initiateNewPayment,
  productCrud,
  getComments,
  contentLike,
  addComment,
  getSaved,
  getPosts,
  deleteComment,
  updateComment,
  wishList,
};
