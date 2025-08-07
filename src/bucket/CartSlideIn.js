import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { loadingIcon } from "./loading-components/loadingIcon";

import { formattedAmount } from "../utilities-config/numberFormatter";
import { getCartItems } from "../redux/actions";

const CartSlideIn = ({ open, history, currency, handleClose, accountId }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const cardRef = useRef(null);
  const { loading, carts, newCart } = useSelector((state) => state.cart);
  const [cartStorage, setCartStorage] = useState([]);
  function allData() {
    let result = [];
    const equalObj = (a, b) => a.productId?._id === b.productId?._id;
    currentData.forEach((item) => {
      const itemResult = result.find((resultItem) =>
        equalObj(item, resultItem)
      );
      if (!itemResult) {
        result.push(item);
      }
    });
    return result;
  }
  function allDataLocal() {
    let result = [];
    const equalObj = (a, b) => a.productId === b.productId;
    cartStorage.forEach((item) => {
      const itemResult = result.find((resultItem) =>
        equalObj(item, resultItem)
      );
      if (!itemResult) {
        result.push(item);
      }
    });
    return result;
  }

  useEffect(() => {
    if (open && accountId) {
      if(accountId){

        dispatch(
          getCartItems({
            condition: {
              accountId: accountId,
            },
            page,
          })
        );
      }
    }
  }, [accountId, open, page, dispatch]);

  useEffect(() => {
    if (newCart?._id && open) {
      setCurrentData((init) => [newCart, ...init]);
    }
  }, [newCart, open]);
  const lastDataRefElement = useCallback(
    (node) => {
      if (loading) return;
      if (cardRef.current) cardRef.current.disconnect();
      cardRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!carts?.length) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) cardRef.current.observe(node);
    },
    [loading, carts]
  );

  useEffect(() => {
    if (!!carts?.length && accountId && open) {
      setCurrentData((init) => [...carts, ...init]);
    }
  }, [carts, accountId, open]);

  useEffect(() => {
    if (open && !accountId) {
      let localCart = localStorage.getItem("cart");
      if (![null, undefined, "null"].includes(localCart)) {
        setCartStorage(JSON.parse(localCart));
      }
    }
  }, [carts, accountId, open]);

  const handleSelectCart = useCallback(
    (item) => () => {
      let param;
      let productId;
      if (item?.productType) {
        param =
          item?.productType === "Automobile"
            ? "automobiles"
            : item?.productType === "Shortlet"
            ? "shortlets"
            : item?.productType === "Property"
            ? "properties"
            : item?.productType === "Hotel" && "hotels";
        productId = item?.productId;
      } else {
        param =
          item?.productId?.productType === "Automobile"
            ? "automobiles"
            : item?.productId?.productType === "Shortlet"
            ? "shortlets"
            : item?.productId?.productType === "Property"
            ? "properties"
            : item?.productId?.productType === "Hotel" && "hotels";
        productId = item?.productId?._id;
      }
      history.push(`/${param}/p?id=${productId}&target=checkout`);
      handleClose();
    },
    [handleClose, history]
  );

  const cardDisplay = ({ item, i, ref }) => (
    <li
      className="cartSlideInItemsItem"
      key={i}
      ref={ref ? lastDataRefElement : null}
      onClick={handleSelectCart(item)}
    >
      <div className="cardThree">
        {!!item?.productId?.bannerImage?.media && (
          <div className="cardThreeImage">
            <img
              src={`/${item.productId.bannerImage.media}`}
              alt="cart-product"
              className="cardThreeImageItem"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )}
        <div className="cardThreeContent">
          <div className="cardThreeContentTitle">
            <div className="cardThreeContentTitleValue">
              {item?.productId?.title}
            </div>
            {item?.productId?.priceDependent && (
              <div className="cardThreeContentTitleAmount">
                <span className="cardThreeContentTitleAmountSymbol">
                  {currency?.symbol}
                </span>
                <span className="cardThreeContentTitleAmountValue">
                  {" "}
                  {formattedAmount({
                    amount: item?.productId?.price,
                    currencyValue: currency?.value,
                  })}
                </span>
                <span className="cardThreeContentTitleDependent">
                  {" "}
                  Per {item?.productId?.priceDependent}
                </span>
              </div>
            )}
          </div>
          <div className="cardThreeContentDescription reduceText">
            {item?.productId?.description}
          </div>

          {
            <div className="cardThreeContentPrice">
              <span className="cardThreeContentPriceSymbol">
                {currency?.symbol}
              </span>
              <span className="cardThreeContentPriceValue">
                {" "}
                {formattedAmount({
                  amount: item?.totalAmount,
                  currencyValue: currency?.value,
                })}
              </span>
              {item?.productId?.priceDependent && (
                <span className="cardThreeContentPriceDependent">
                  {" "}
                  For {item?.count} {item?.productId?.priceDependent}
                  {item?.count > 1 && "s"}
                </span>
              )}
            </div>
          }
        </div>
      </div>
    </li>
  );

  return (
    <div className={open ? "cartSlideIn openCart" : "cartSlideIn closeCart"}>
      {loading && loadingIcon}
      <ul className="cartSlideInItems">
        {accountId
          ? allData().map((item, i) => {
              if (allData()?.length === i + 1) {
                return cardDisplay({ item, i, ref: true });
              } else {
                return cardDisplay({ item, i });
              }
            })
          : allDataLocal().map((item, i) => {
              if (allDataLocal()?.length === i + 1) {
                return cardDisplay({ item, i, ref: true });
              } else {
                return cardDisplay({ item, i });
              }
            })}
      </ul>
    </div>
  );
};

export default CartSlideIn;
