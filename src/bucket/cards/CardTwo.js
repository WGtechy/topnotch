import React, { forwardRef, useCallback } from "react";
import {
  PiBathtub,
  PiBed,
  PiMapPin,
  PiShareNetwork,
  PiToilet,
} from "react-icons/pi";
import { formattedAmount } from "../../utilities-config/numberFormatter";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { IoCart, IoHeart, IoShareSocial } from "react-icons/io5";
import { cartCrud } from "../../redux/actions";
import { useDispatch } from "react-redux";

const CardTwo = forwardRef(
  (
    {
      options,
      title,
      description,
      price,
      priceDependent,
      location,
      currency,
      discount,
      slug,
      bannerImage,
      productType,
      link,
      product,
    },
    ref
  ) => {
    const shareHandler = useCallback(() => {
      if (window.navigator.share) {
        navigator
          .share({
            url: link,
            title: title,
            text: description,
          })
          .then(() => {
            return;
          })
          .catch((error) => null);
      } else {
        // alert("Please don't forget to share");
        return null;
      }
    }, [link, title, description]);

    const dispatch = useDispatch();

    const handleCart = () => dispatch(cartCrud(product));

    const allOptions = [
      { name: "Add to cart", icon: IoCart, click: handleCart },
      {
        name: "Wishlist",
        icon: IoHeart,
        click: null,
      },
      {
        name: "Share",
        icon: IoShareSocial,
        click: shareHandler,
      },
    ];
    return (
      <div className="cardOne" ref={ref}>
        <Link to={link} className="cardOneImage">
          <img
            src={bannerImage?.media || "/logo.png"}
            alt="property"
            className="cardOneImageItem"
            onContextMenu={(e) => e.preventDefault()}
          />
        </Link>

        <Link to={link} className="cardOneContent">
          {title && <div className="cardOneContentTitle">{title}</div>}
          {description && (
            <div className="cardOneContentDescription reduceText">
              {description}
            </div>
          )}
          {location?.neighborhood && (
            <div className="cardOneContentLocation">
              {" "}
              <PiMapPin className="iconClass" />{" "}
              <span>{location.neighborhood}</span>
            </div>
          )}
          <div className="cardOneContentPrice">
            <div className="cardOneContentPriceValue">
              <span className="cardOneContentPriceValueSymbol">
                {" "}
                {currency?.symbol}{" "}
              </span>
              {formattedAmount({
                amount: price - discount || 0,
                currencyValue: currency?.value,
              })}
            </div>
            <div className="cardOneContentPriceFormer">
              <span className="cardOneContentPriceSFormerymbol">
                {" "}
                {currency?.symbol}{" "}
              </span>

              {formattedAmount({
                amount: price,
                currencyValue: currency?.value,
              })}
            </div>
            {priceDependent &&
              ["shortlets", "automobiles", "hotels"].includes(productType) && (
                <span className="cardOneContentPriceDependent">
                  {priceDependent}
                </span>
              )}
          </div>
        </Link>
        <div className="cardOneFooter">
          {allOptions.map((item, i) => (
            <div
              key={i}
              className={
                item.value === "share"
                  ? "cardOneFooterItem share"
                  : "cardOneFooterItem"
              }
              onClick={item?.click}
            >
              <item.icon
                className={
                  item.value === "share"
                    ? "cardOneFooterItemIcon iconClass share"
                    : "cardOneFooterItemIcon iconClass"
                }
              />
              <div className="cardOneFooterItemContent">
                {item.value !== "share" && (
                  <span className="cardOneFooterItemContentValue">
                    {item.value}
                  </span>
                )}
                <div className="cardOneFooterItemContentName">{item?.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default CardTwo;
