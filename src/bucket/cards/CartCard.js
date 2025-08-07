import React, { forwardRef, useEffect, useRef, useState } from "react";
import { formattedAmount } from "../../utilities-config/numberFormatter";
import { IoArrowDown, IoArrowUp, IoHeart, IoTrash } from "react-icons/io5";

const CartCard = forwardRef(({ item, target, currency, removeId, setTotalCheckoutCost, handleWishlist, handleDeleteCartItem, setTotalCheckoutDiscount }, ref) => {
  const [totalCount, setTotalCount] = useState(item?.totalCount);
  const [totalAmount, setTotalAmount] = useState(item?.price);
  let totalOnce = useRef(true);

  
  useEffect(() => {
    if (totalOnce.current && target === "checkout") {
      setTotalAmount( item?.minimumPurchase *  (item?.price - item?.discount));
      setTotalCheckoutDiscount(init=> init + ( item?.minimumPurchase * item?.discount) )
     setTotalCheckoutCost(prev=>{
      return prev + ( item?.minimumPurchase *  (item?.price - item?.discount));
     })
      setTotalCount(item?.minimumPurchase);
      return () => (totalOnce.current = false);
    }
  }, [totalAmount, target, setTotalCheckoutCost, setTotalCount, item, setTotalCheckoutDiscount, setTotalAmount]);

  const handleCartCount = (e) => {
    setTotalCount(e.target.value);
    setTotalAmount(e.target.value * (item?.price - item?.discount));
    setTotalCheckoutDiscount(init=> init + ( e.target.value * item?.discount) )

    setTotalCheckoutCost(prev=>{
      return prev + (e.target.value * (item?.price - item?.discount))
     })
  };
  const handleIncrease = () =>
    setTotalCount((prev) => {
      setTotalAmount((prev + 1) * (item?.price - item?.discount));
    setTotalCheckoutDiscount(init=> init + ((prev + 1) * item?.discount) )
      setTotalCheckoutCost(init=> init + ((prev + 1) * (item?.price - item?.discount)))
      return ++prev;
    });
  const handleDecrease = () => {
    if (totalCount > item?.minimumPurchase) {
      setTotalCount((prev) => {
        setTotalAmount((prev - 1) * (item?.price - item?.discount));
        setTotalCheckoutDiscount(init=> init - ((prev - 1) * item?.discount) )
        setTotalCheckoutCost(init=> init - ((prev - 1) * (item?.price - item?.discount)))
        return --prev;
      });
    } else if (totalCount <= 0) {
      setTotalCount(item?.minimumPurchase);
    }
  };
  return (
    <div className="cartCard" ref={ref}>
      <div className="cartCardLeft">
        <img
          src={item?.bannerImage?.media}
          alt={item?.title}
          className="cartCardLeftImage"
        />
      </div>
      <div className="cartCardRight">
        <div className="cartCardRightTitle reduceText2">
          {item?.title}{" "}
        </div>
        <div className="cartCardRightPrice">
          {currency?.symbol}
          {formattedAmount({
            amount: item?.price - item?.discount,
            currencyValue: currency?.value,
          })}
        </div>

        {target === "checkout" && <div className="cartCardRightTotal">
          {currency?.symbol}
          {formattedAmount({
            amount: totalAmount - item?.discount,
            currencyValue: currency?.value,
          })}
        </div>}
        {target === "checkout" && <div className="productInfoCalculationContainer">
          <div className="productInfoCalculationContainerCount">
            <div className="productInfoCalculationContainerCountTitle">
              Count:
            </div>

            <input
              type={"number"}
              className={item?.minimumPurchase === totalCount ? "productInfoCalculationContainerCountInput minimumReached" : "productInfoCalculationContainerCountInput"}
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
        </div>}
        <div className="cartCardRightMinimum">Minimum purchase: {item?.minimumPurchase} </div>
        <div className="footerItems">
          <div className="footerItemsIcon" onClick={handleWishlist({productId: item?._id})}>
            Wishlist <IoHeart />
          </div>
          <div className="footerItemsIcon" onClick={handleDeleteCartItem({productId: item?._id})}>
            {" "}
            Trash <IoTrash />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartCard;
