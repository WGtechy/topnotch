import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useUrlSearchParams from "../../utilities-config/useUrlSearchParams";
import { componentLoader } from "../../bucket/loading-components/componentLoader";
import Error404 from "../Error404";
import { getCartCount, getOrder } from "../../redux/actions";

const OrderReceipt = (props) => {
  const { accountId } = props;
  const dispatch = useDispatch(); // the useDispatch stored in a constant variable will dispatch the input of the user into a dispatch function like the sign in function

  const orderParams = useUrlSearchParams();
  const { orderItem, loadingOrder, status } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrder({ _id: orderParams?.r }));
    if (accountId) {
      dispatch(getCartCount(accountId));
    }
  }, [dispatch, accountId, orderParams]);

  return status === 404 ? (
    <Error404 />
  ) : loadingOrder ? (
    componentLoader
  ) : (
    <div className="orderSuccess">Success</div>
  );
};

export default OrderReceipt;
