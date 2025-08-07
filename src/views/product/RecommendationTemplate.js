import React, { useRef } from "react";
import { IoLocation } from "react-icons/io5";
import { formattedAmount } from "../../utilities-config/numberFormatter";
import { handleImageError } from "../../utilities-config/utils";

const RecommendationTemplate = ({ data, display, currency, setData }) => {
  const contentRef = useRef();

  const handleRemove = (data) => {
    setData((prev) => {
      return prev.filter((x) => x._id !== data?._id);
    });
  };

  return display ? (
    <div className="recommendationTemplate" ref={contentRef}>
      {!!data?.length &&
        data.map((item, i) => (
          <div className="recommendationTemplateItem" key={i}>
            <div className="recommendationTemplateItemImage">
              <img
                src={item?.bannerImage}
                alt={item?.name || item?.slug || item?.product?.title}
                className="recommendationTemplateItemImageImg"
                loading="lazy"
                onError={(e) => handleImageError(e)}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="recommendationTemplateItemContent">
              <div className="recommendationTemplateItemContentTitle reduceText1">
                {item?.name || item?.product?.title || item?.firstName}{" "}
                {item?.surname || ""}
              </div>
              {["Shortlet", "Hotel", "Property"].includes(
                item?.productType
              ) && (
                <div className="recommendationTemplateItemContentLocation">
                  <IoLocation /> {item?.neighborhood || ""} {item?.city || ""}{" "}
                  {item?.country || ""}
                </div>
              )}
              {item?.price || item?.totalAmount ? (
                <div className="recommendationTemplateItemContentPrice">
                  {currency?.symbol}
                  {formattedAmount({
                    amount: item?.totalAmount || item?.price,
                    currencyValue: item?.currency?.value,
                  })}
                </div>
              ) : null}
              <div
                className="recommendationTemplateItemContentDelete"
                onClick={handleRemove}
              >
                Remove
              </div>
            </div>
          </div>
        ))}
    </div>
  ) : null;
};

export default RecommendationTemplate;
