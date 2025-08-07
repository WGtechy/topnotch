import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { formattedAmount } from "../utilities-config/numberFormatter";
import { IoArrowBack, IoArrowForward, IoLocation } from "react-icons/io5";
import { handleImageError } from "../utilities-config/utils";

const ScrollableTemplate1 = (props) => {
  const {
    isMobile,
    data,
    styleClass,
    currency,
    isLink,
    onClick,
    isShop,
    disableScroll,
    title,
    alreadySelectedItems,
  } = props;
  const scrollRef = useRef();

  const handleBack = () => {
    const scrollAmount = (scrollRef.current.clientWidth * -1) / 4;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const handleForward = () => {
    const scrollAmount = (scrollRef.current.clientWidth * 1) / 4;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleIsAdded = useCallback(
    (_id) => {
      let res = alreadySelectedItems.find((x) => x._id === _id);
      return res ? "Added" : "Add to cart";
    },
    [alreadySelectedItems]
  );
  return (
    <div
      className={isShop ? "scrollTemplate1 applyBackground" : "scrollTemplate1"}
      style={styleClass}
      ref={scrollRef}
    >
      {!isMobile && !disableScroll && (
        <div className="scrollTemplate1LeftScroll" onClick={handleBack}>
          <IoArrowBack className="scrollTemplate1LeftScrollIcon" />
        </div>
      )}

      {data.map((item, i) =>
        isLink ? (
          <Link
            to={`/?pn=${item?.slug}&pid=${item._id}`}
            className="scrollTemplate1Item"
            key={i}
          >
            <div className="scrollTemplate1ItemImage">
              <img
                src={
                  item?.bannerImage?.media ||
                  item?.picture ||
                  item?.productId?.bannerImage?.media
                }
                alt={item?.title || item?.slug || item?.productId?.title}
                className="scrollTemplate1ItemImageImg"
                loading="lazy"
                onError={(e) => handleImageError(e)}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="scrollTemplate1ItemContent">

            <div className="scrollTemplate1ItemContentTitle reduceText1">
              {item?.title}
            </div>
            {["Shortlet", "Hotel", "Property"].includes(item?.productType) && (
              <div className="scrollTemplate1ItemContentLocation">
                <IoLocation /> {item?.neighborhood || ""} {item?.city || ""}{" "}
                {item?.country || ""}
              </div>
            )}
            {item?.price && (
              <div className="scrollTemplate1ItemContentPrice">
                {currency?.symbol}
                {formattedAmount({ amount: item?.price })}
              </div>
            )}
            </div>
          </Link>
        ) : (
          <div
            onClick={onClick(title ? { item, title } : item)}
            className="scrollTemplate1Item"
            key={i}
          >
            <div className="scrollTemplate1ItemImage">
              <img
                src={
                  item?.bannerImage?.media ||
                  item?.picture ||
                  item?.productId?.bannerImage?.media
                }
                alt={item?.title || item?.slug || item?.productId?.title}
                className="scrollTemplate1ItemImageImg"
                loading="lazy"
                onError={(e) => handleImageError(e)}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="scrollTemplate1ItemContent">
            <div className="scrollTemplate1ItemContentTitle reduceText1">
              {item?.title || item?.productId?.title || item?.firstName}{" "}
              {item?.surname || ""}
            </div>
            {["Shortlet", "Hotel", "Property"].includes(item?.productType) && (
              <div className="scrollTemplate1ItemContentLocation">
                <IoLocation /> {item?.neighborhood || ""} {item?.city || ""}{" "}
                {item?.country || ""}
              </div>
            )}
            {item?.price || item?.totalAmount ? (
              <div className="scrollTemplate1ItemContentPrice">
                {item?.currency?.symbol || currency?.symbol}
                {formattedAmount({
                  amount: item?.totalAmount || item?.price,
                  currencyValue: item?.currency?.value,
                })}
              </div>
            ) : null}
            {isShop && (
              <div className="scrollTemplate1ItemContentCartBtn">
                {handleIsAdded(item?._id)}
              </div>
            )}
            </div>
          </div>
        )
      )}
      {!isMobile && !disableScroll && (
        <div className="scrollTemplate1RightScroll" onClick={handleForward}>
          <IoArrowForward className="scrollTemplate1RightScrollIcon" />
        </div>
      )}
    </div>
  );
};

export default ScrollableTemplate1;
