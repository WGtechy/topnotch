import React, { useEffect, useState } from "react";
import { getCartItems } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";

const Cart = ({ accountId }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (accountId) {
      dispatch(
        getCartItems({
          condition: {
            accountId: accountId,
          },
          page,
        })
      );
    } else {
      // check local storage
    }
  }, [accountId, dispatch, page]);
  return <div className="prodcutInfoCart">Cart</div>;
};

export default Cart;
