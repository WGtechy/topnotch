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

const CardThree = ({ data, currency }) => {

  // const handleClick = ()=>history.push(`/${productType}/${slug}`)

  return (
    <Link to={`/${data?.link}`} className="cardThree">
      <div className="cardThreeImage">
        <img
          src={data?.img}
          alt="cart-product"
          className="cardThreeImageItem"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      <div className="cardThreeContent">
        <div className="cardThreeContentTitle">{data?.title}</div>
        <div className="cardThreeContentDescription reduceText">
          {data?.description}
        </div>
        <div className="cardThreeContentPrice">
          <span className="cardThreeContentPriceSymbol">
            {currency?.symbol}
          </span>
          <span className="cardThreeContentPriceValue">
            {" "}
            {formattedAmount({
              amount: data?.totalAmount,
              currencyValue: currency?.value,
            })}{" "}
          </span>
          {data?.priceDependent && (
            <span className="cardThreeContentPriceDependent">
              {data?.priceDependent}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardThree;
