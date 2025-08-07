import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { formattedAmount } from "../../utilities-config/numberFormatter";

const Advert = ({ advert, currency }) => {
  return (
    <div className="advert">
      <div className="advertTitle">Check this out</div>
      <div className="advertItem">
        <div className="advertItemImage">
          <img src={advert.img} alt="advert-image" />
        </div>
        <div className="advertItemContent">
          <div className="advertItemContentTitle">{advert.name}</div>
          <div className="advertItemContentPrice">
            <span className="advertItemContentPriceCurrency">
              {currency.symbol}
            </span>
            <span className="advertItemContentPriceAmount">
              {formattedAmount({
                amount: advert.price.amount,
                currencyValue: currency?.value,
              })}{" "}
            </span>
            <span className="advertItemContentPriceDependent">
              {advert.price.priceDependent}
            </span>
          </div>
        </div>
        {advert?.slug && (
          <NavLink to={advert.slug} className="advertItemBtn">
            Check this out
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Advert;
