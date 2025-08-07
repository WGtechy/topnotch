import React, { useRef } from "react";
import TheAvatar from "../TheAvatar";
import Image from "../Image";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductsWidget = ({ items, loadMoreLink, emptyMessage }) => {
  const itemsRef = useRef(null);

  return (
    <div className="widgetProductGrid">
      {!!items?.length ? (
        <div className="widgetProductGridContainer">
          <div className="widgetProductGridContainerTop">
            {items[0]?._id && (
              <Link
                to={`${loadMoreLink}/${items[0]?._id}`}
                className="widgetProductGridContainerTopItem"
              >
                <div className="widgetProductGridContainerTopItemLeft">
                  <Image
                    src={
                      !!items[0]?.productId?.images?.length
                        ? items[0]?.productId?.images[0]
                        : "/apt2-6.jpg"
                    }
                    pictureStyle={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="widgetProductGridContainerTopItemRight">
                  <div className="widgetProductGridContainerTopItemRightTitle">
                    {items[0]?.productId?.title}
                  </div>
                  <div className="widgetProductGridContainerTopItemRightPrice">
                    <span className="widgetProductGridContainerTopItemRightPriceCurrency">
                      {items[0]?.currency?.symbol}
                    </span>{" "}
                    <span className="widgetProductGridContainerTopItemRightPriceValue">
                      {items[0]?.totalAmount}
                    </span>
                  </div>
                  <div className="widgetProductGridContainerTopItemRightOptions">
                    <div className="widgetProductGridContainerTopItemRightOptionOption">
                      {items[0]?.prductId?.productType}
                    </div>
                    <div className="widgetProductGridContainerTopItemRightOptionOption">
                      {items[0]?.prductId?.marketingType}
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {items[1]?._id && (
              <Link
                to={`${loadMoreLink}/${items[1]?._id}`}
                className="widgetProductGridContainerTopItem"
              >
                <div className="widgetProductGridContainerTopItemLeft">
                  <Image
                    src={
                      !!items[1]?.productId?.images?.length
                        ? items[1]?.productId?.images[0]
                        : "/apt2-6.jpg"
                    }
                    pictureStyle={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="widgetProductGridContainerTopItemRight">
                  <div className="widgetProductGridContainerTopItemRightTitle">
                    {items[1]?.productId?.title}
                  </div>
                  <div className="widgetProductGridContainerTopItemRightPrice">
                    <span className="widgetProductGridContainerTopItemRightPriceCurrency">
                      {items[1]?.currency?.symbol}
                    </span>{" "}
                    <span className="widgetProductGridContainerTopItemRightPriceValue">
                      {items[1]?.totalAmount}
                    </span>
                  </div>
                  <div className="widgetProductGridContainerTopItemRightOptions">
                    <div className="widgetProductGridContainerTopItemRightOptionOption">
                      {items[1]?.prductId?.productType}
                    </div>
                    <div className="widgetProductGridContainerTopItemRightOptionOption">
                      {items[1]?.prductId?.marketingType}
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="widgetProductGridContainerBottom">
            {items[2]?._id && (
              <Link
                to={`${loadMoreLink}/${items[2]?._id}`}
                className="widgetProductGridContainerBottomItem"
              >
                <div className="widgetProductGridContainerBottomItemLeft">
                  <Image
                    src={
                      !!items[2]?.productId?.images?.length
                        ? items[2]?.productId?.images[0]
                        : "/apt2-6.jpg"
                    }
                    pictureStyle={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="widgetProductGridContainerBottomItemRight">
                  <div className="widgetProductGridContainerBottomItemRightTitle">
                    {items[2]?.productId?.title}
                  </div>
                  <div className="widgetProductGridContainerBottomItemRightPrice">
                    <span className="widgetProductGridContainerBottomItemRightPriceCurrency">
                      {items[2]?.currency?.symbol}
                    </span>{" "}
                    <span className="widgetProductGridContainerBottomItemRightPriceValue">
                      {items[2]?.totalAmount}
                    </span>
                  </div>
                  <div className="widgetProductGridContainerBottomItemRightOptions">
                    <div className="widgetProductGridContainerBottomItemRightOptionOption">
                      {items[2]?.prductId?.productType}
                    </div>
                    <div className="widgetProductGridContainerBottomItemRightOptionOption">
                      {items[2]?.prductId?.marketingType}
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {items[3]?._id && (
              <Link
                to={`${loadMoreLink}/${items[3]?._id}`}
                className="widgetProductGridContainerBottomItem"
              >
                <div className="widgetProductGridContainerBottomItemLeft">
                  <Image
                    src={
                      !!items[3]?.productId?.images?.length
                        ? items[3]?.productId?.images[0]
                        : "/apt2-6.jpg"
                    }
                    pictureStyle={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="widgetProductGridContainerBottomItemRight">
                  <div className="widgetProductGridContainerBottomItemRightTitle">
                    {items[3]?.productId?.title}
                  </div>
                  <div className="widgetProductGridContainerBottomItemRightPrice">
                    <span className="widgetProductGridContainerBottomItemRightPriceCurrency">
                      {items[3]?.currency?.symbol}
                    </span>{" "}
                    <span className="widgetProductGridContainerBottomItemRightPriceValue">
                      {items[3]?.totalAmount}
                    </span>
                  </div>
                  <div className="widgetProductGridContainerBottomItemRightOptions">
                    <div className="widgetProductGridContainerBottomItemRightOptionOption">
                      {items[3]?.prductId?.productType}
                    </div>
                    <div className="widgetProductGridContainerBottomItemRightOptionOption">
                      {items[3]?.prductId?.marketingType}
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="widgetProductGridContainerLoad">
            <Link
              to={loadMoreLink}
              className="widgetProductGridContainerLoadLink"
            >
              Load more
            </Link>
          </div>
        </div>
      ) : (
        <div className="widgetProductGridEmpty"> {emptyMessage}</div>
      )}
      {items?.length === 6 && (
        <Link to={loadMoreLink} className="widgetProductGridMore">
          Load more
        </Link>
      )}
    </div>
  );
};

export default ProductsWidget;
