import React, { useCallback, useEffect, useRef, useState } from "react";
import { formattedAmount } from "../../../../../utilities-config/numberFormatter";
import { useDispatch, useSelector } from "react-redux";
import { cartCrud } from "../../../../../redux/actions";
import TimeComponent from "../../../../../bucket/formComponent/TimeComponent";
import {
  IoArrowDown,
  IoArrowUp,
  IoChevronDown,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { frontURL } from "../../../../../utilities-config/urlConfig";

const Checkout = ({
  totalCount,
  currency,
  goToCalendar,
  history,
  handlePayment,
  product,
  setTotalCount,
  setCheckInTime,
  accountId,
  checkInDates,
  isMobile,
  checkoutErrorMessage,
  setTotalAmount,
  totalAmount,
}) => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);

  const handleCheckoutBooking = (e) => {
    e.preventDefault();
    if (totalAmount) {
      // proceed to billing details
      handlePayment();
    } else {
      goToCalendar();
    }
  };
  //  const otherCosts = product?.agencyFee + product?.legalFee + product?.platformFee + product?.cautionFee + product?.serviceCharge

  let totalOnce = useRef(true);
  useEffect(() => {
    if (
      !["Hotel", "Shortlet"].includes(product.productType) &&
      totalOnce.current
    ) {
      setTotalAmount(
        product?.minimumPurchase * (product?.price - product?.discount)
      );
      setTotalCount(product?.minimumPurchase);
      return () => (totalOnce.current = false);
    }
  }, [totalAmount, setTotalCount, product, setTotalAmount]);

  const handleCartCount = (e) => {
    setTotalCount(e.target.value);
    setTotalAmount(e.target.value * (product?.price - product?.discount));
  };
  const handleCheckout = () => {
    // Proceed to billing details
  };

  const handleCheckInTime = (value) => {
    setCheckInTime(value);
  };

  const saveToCart = useCallback(
    (type) => () => {
      let serverData = {
        productId: product?._id,
        accountId: accountId,
        totalAmount,
        count: totalCount,
        crud: cartItem?._id ? "UPDATE" : "CREATE",
      };
      dispatch(cartCrud(serverData));
      if (!accountId) {
        // Get the former cart items
        let _cart = localStorage.getItem("cart");
        if (![null, undefined, "null"].includes(_cart)) {
          let _cartArray = JSON.parse(_cart);
          if (!!_cartArray?.length) {
            let newItems = [
              {
                productId: product?._id,
                accountId: accountId,
                checkInDates,
                totalAmount,
                // currency,
                count: checkInDates?.length,
                bannerImage: product?.bannerImage,
              },
              ..._cartArray,
            ];
            localStorage.setItem("cart", JSON.stringify(newItems));
          } else {
            let newItems = [
              {
                productId: product?._id,
                accountId: accountId,
                checkInDates,
                totalAmount,
                // currency,
                count: checkInDates?.length,
                bannerImage: product?.bannerImage,
                productType: product?.productType,
              },
            ];
            localStorage.setItem("cart", JSON.stringify(newItems));
          }
        }
      }
    },
    [
      checkInDates,
      accountId,
      totalCount,
      cartItem,
      dispatch,
      product,
      totalAmount,
    ]
  );

  const handleIncrease = () =>
    setTotalCount((prev) => {
      setTotalAmount((prev + 1) * (product?.price - product?.discount));
      return ++prev;
    });
  const handleDecrease = () => {
    if (totalCount > product?.minimumPurchase) {
      setTotalCount((prev) => {
        setTotalAmount((prev - 1) * (product?.price - product?.discount));
        return --prev;
      });
    } else if (totalCount <= 0) {
      setTotalCount(product?.minimumPurchase);
    }
  };
  const checkoutBtn = ["Shortlet", "Hotel"].includes(product?.productType)
    ? totalAmount
      ? "Checkout"
      : "Select your booking days"
    : "Checkout";

  return ["Property", "Automobile", "Hotel"].includes(product?.productType) &&
    product?.marketingType === "Sale" ? (
    <a
      href={`https://wa.me/${+2347033317497}?text=${frontURL}/${history?.location?.pathname}&type=purchase`}
      className="productInfoCalculation activeCalculation whatsAppBox"
      target="_blank"
      rel="noreferrer"
    >
      Contact Us{" "}
      <span>
        <IoLogoWhatsapp />{" "}
      </span>{" "}
    </a>
  ) : (
    <form
      className="productInfoCalculation activeCalculation"
      onSubmit={
        ["Shortlet", "Hotel"].includes(product?.productType)
          ? handleCheckoutBooking
          : handlePayment
      }
    >
      {totalAmount > 0 &&
        ["Shortlet", "Hotel"].includes(product?.productType) && (
          <div className="productInfoCalculationDependency">
            <span className="productInfoCalculationDependencyTitle">
              Total nights:
            </span>{" "}
            <span className="productInfoCalculationDependencyAmount">
              {totalCount}
            </span>
          </div>
        )}

      {totalAmount > 0 &&
        ["Shortlet", "Hotel"].includes(product?.productType) && (
          <TimeComponent
            minDate={new Date()}
            onChange={handleCheckInTime}
            label="Check-In time"
            display={true}
            required={true}
            defaultValue={null}
            name="Check-In time"
            title="Check-In time"
          />
        )}
      {totalAmount
        ? !["Shortlet", "Hotel", "Automobile", "Property"].includes(
            product?.productType
          ) && (
            <div className="productInfoCalculationContainer">
              <div className="productInfoCalculationContainerCount">
                <div className="productInfoCalculationContainerCountTitle">
                  Count:
                </div>

                <input
                  type={"number"}
                  className="productInfoCalculationContainerCountInput"
                  placeholder={""}
                  required={true}
                  autoFocus={false}
                  name={"Product count"}
                  defaultValue={totalCount}
                  value={totalCount}
                  onChange={handleCartCount}
                  id={"cart"}
                  title={"Count"}
                  min={1}
                  max={1000}
                />
              </div>
              <div className="productInfoCalculationContainerArrows">
                <div
                  className="productInfoCalculationContainerArrowsArrow"
                  onClick={handleIncrease}
                >
                  <IoArrowUp />{" "}
                </div>
                <div
                  className="productInfoCalculationContainerArrowsArrow"
                  onClick={handleDecrease}
                >
                  <IoArrowDown />{" "}
                </div>
              </div>
            </div>
          )
        : null}
      {product?.minimumPurchase && (
        <div className="productInfoCalculationMinimum">
          Minimum bookings: {product?.minimumPurchase}
        </div>
      )}

      {totalAmount > 0 && (
        <div className="productInfoCalculationCost">
          <span className="productInfoCalculationDependencyTitle">Total: </span>
          <span className="productInfoCalculationDependencyAmount">
            {currency?.symbol}
            {formattedAmount({
              amount: totalAmount,
              currencyValue: currency?.value,
            })}
          </span>
        </div>
      )}

      {checkoutErrorMessage && (
        <div className="productInfoCalculationError">
          {checkoutErrorMessage}
        </div>
      )}

      {["Shortlet", "Hotel", "Automobile", "Property"].includes(
        product?.productType
      ) ? (
        <button className="productInfoCalculationCheckout">
          {checkoutBtn}{" "}
        </button>
      ) : (
        <div className="productInfoCalculationBtns">
          <button
            className="productInfoCalculationBtnsItem productInfoCalculationBtnsCheckout"
            onClick={handlePayment}
          >
            {" "}
            Checkout
          </button>
          <div
            className="productInfoCalculationBtnsItem productInfoCalculationBtnsCart"
            onClick={saveToCart}
          >
            {" "}
            Add to cart
          </div>
        </div>
      )}
    </form>
  );
};

export default Checkout;
