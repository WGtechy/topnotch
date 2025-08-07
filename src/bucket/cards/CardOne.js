import React, { forwardRef } from "react";
import {
  PiBathtub,
  PiBed,
  PiMapPin,
  PiShareNetwork,
  PiToilet,
} from "react-icons/pi";
import { formattedAmount } from "../../utilities-config/numberFormatter";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CardOne = forwardRef(
  (
    {
      automobile,
      options,
      images,
      title,
      description,
      price,
      priceDependent,
      location,
      date,
      currency,
      slug,
      history,
      productType,
      itemLink,
    },
    ref
  ) => {
    const allOptions = [
      { name: "Bedrooms", value: options?.bedrooms, icon: PiBed, click: null },
      { name: "Toilets", value: options?.toilets, icon: PiToilet, click: null },
      {
        name: "Bathrooms",
        value: options?.bathrooms,
        icon: PiBathtub,
        click: null,
      },
      {
        name: "Share",
        icon: PiShareNetwork,
        value: "share",
        click: null,
      },
    ];

    const handleClick = () => history.push(`/${itemLink}/${slug}`);

    return (
      <div className="cardOne" ref={ref}>
        <div className="cardOneImage" onClick={handleClick}>
          <img
            src={images[0].media}
            alt="property"
            className="cardOneImageItem"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="cardOneContent" onClick={handleClick}>
          <div className="cardOneContentTitle">{title}</div>
          <div className="cardOneContentDescription reduceText">
            {description}
          </div>
          {location && (
            <div className="cardOneContentLocation">
              {" "}
              <PiMapPin className="iconClass" /> <span>{location}</span>
            </div>
          )}
          <div className="cardOneContentPrice">
            <span className="cardOneContentPriceSymbol">
              {currency?.symbol}
            </span>
            <span className="cardOneContentPriceValue">
              {" "}
              {formattedAmount(price * (currency?.value || 1))}{" "}
            </span>
            {priceDependent && (
              <span className="cardOneContentPriceDependent">
                {priceDependent}
              </span>
            )}
          </div>
        </div>
        {!!allOptions.length && !automobile && (
          <div className="cardOneFooter">
            {allOptions.map(
              (item, i) =>
                item?.value && (
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
                      <div className="cardOneFooterItemContentName">
                        {item?.name}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    );
  }
);

export default CardOne;
