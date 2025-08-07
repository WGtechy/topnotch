import React, { useRef, useState } from "react";
import {
  handleImageError,
  imageMimtype,
  videoMimtype,
} from "../../../../../utilities-config/utils";
import { formattedAmount } from "../../../../../utilities-config/numberFormatter";
import { IoFilmOutline, IoImage, IoVideocam } from "react-icons/io5";
import TheItemsScrollTemplate from "../../../../../bucket/TheItemsScrollTemplate";

const PricingDetail = (props) => {
  const {
    focusElement,
    product,
    handleSetMediaFile,
    currency,
    isMobile,
  } = props;
  const [openMediaFiles, setOpenMediaFiles] = useState(false);
  const mediaRef = useRef();


  const handleMediaFiles = () => setOpenMediaFiles((prev) => !prev);
  

  const displayCostings =
    product?.agencyFee ||
    product?.legalFee ||
    product?.cautionFee ||
    product?.serviceCharge ||
    product?.taxRate
      ? true
      : false;
  const total = [
    {
      title: "Agency fee",
      value: formattedAmount({
        amount: product?.agencyFee,
        currencyValue: currency?.value,
      }),
      display: product?.agencyFee ? true : false,
    },
    {
      title: "Legal fee",
      value: formattedAmount({
        amount: product?.legalFee,
        currencyValue: currency?.value,
      }),
      display: product?.legalFee ? true : false,
    },
    {
      title: "Caution fee",
      value: formattedAmount({
        amount: product?.cautionFee,
        currencyValue: currency?.value,
      }),
      display: product?.cautionFee ? true : false,
    },
    {
      title: "Service charge",
      value: formattedAmount({
        amount: product?.serviceCharge,
        currencyValue: currency?.value,
      }),
      display: product?.serviceCharge ? true : false,
    },
    // {title: 'Tax', value: `${formattedAmount({amount: product?.taxRate * product?.price, currencyValue: currency?.value})} at ${taxRate}%`, display: product?.taxable && taxRate ? true : false},
  ];

  return (
    <div className="productInfoDetail">
      {product?.price && (
        <div className="productInfoDetailPrice">
          {" "}
          {currency.symbol}{" "}
          {formattedAmount({
            amount: product?.price - product?.discount || 0,
            currencyValue: currency.value,
          })}{" "}
          {product?.priceDependent && product?.marketingType === "Rent" && (
            <span className="shortletPageHeaderBottomPriceDependent">
              Per {product?.priceDependent}
            </span>
          )}
        </div>
      )}
      {displayCostings && (
        <ul className="productInfoDetailCosts">
          {total.map(
            (item, i) =>
              item?.display && (
                <li key={i} className="productInfoDetailCostsItem">
                  <span className="productInfoDetailCostsItemTitle">
                    {item?.title}:
                  </span>
                  <span className="productInfoDetailCostsItemValue">
                    {currency?.symbol}
                    {item?.value}{" "}
                  </span>
                </li>
              )
          )}
        </ul>
      )}
      {product?.serviceChargeDescription && (
        <div className="productInfoDetailServiceCharge">
          <div className="productInfoDetailServiceCharge">
            Service charge description
          </div>
          <div>{product?.serviceChargeDescription}</div>
        </div>
      )}
      {/* {product?.productType && (
        <div className="productInfoDetailProductType">
          Product specification: {product?.productType}{" "}
        </div>
      )} */}
      {["hotel", "Automobile", "Shotlet", "Property"].includes(
        product?.productType
      ) && (
        <div className="productInfoDetailMarketingType">
          Market action: {product?.marketingType}
        </div>
      )}
      {/* {!!product?.media?.length && (
        <div className="productInfoDetailMedia">
          <div
            className="productInfoDetailMediaTitle"
            onClick={handleMediaFiles}
          >
            <div className="productInfoDetailMediaTitleName">Media files: </div>
            <div className="productInfoDetailMediaTitleValue">
              {product?.media?.length} <IoFilmOutline />
            </div>
          </div>
          {openMediaFiles && (
            <div className="productInfoDetailMediaContent" ref={mediaRef}>
              <TheItemsScrollTemplate
                scrollRef={mediaRef}
                isMobile={isMobile}
                disabled={product?.media?.length <= 3 ? true : false}
              >
                {!!product?.media?.length &&
                  product?.media.map((item, i) => (
                    <div className="productInfoDetailMediaContentItem" key={i}>
                      {videoMimtype.includes(item?.mimetype) ? (
                        <video
                          ref={focusElement || null}
                          alt="item-media"
                          data={item?._id}
                          key={i}
                          src={item?.media}
                          onContextMenu={(e) => e.preventDefault()}
                          onClick={handleSetMediaFile(item)}
                          onError={(e) => handleImageError(e)}
                          className="productInfoDetailMediaContentItemVideo"
                          preload="auto"
                          title={item.name}
                          webkit-playsinline="true"
                          playsInline={true}
                          loading="lazy"
                        />
                      ) : (
                        imageMimtype.includes(item?.mimetype) && (
                          <img
                            src={item.media}
                            onClick={handleSetMediaFile(item)}
                            alt={item.name}
                            className="productInfoDetailMediaContentItemImg"
                            loading="lazy"
                            onError={(e) => handleImageError(e)}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        )
                      )}
                      <div className="productInfoDetailMediaContentItemIcon">
                        {videoMimtype.includes(item?.mimetype) ? (
                          <IoVideocam />
                        ) : (
                          <IoImage />
                        )}
                      </div>
                    </div>
                  ))}
              </TheItemsScrollTemplate>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default PricingDetail;
