import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Image from "../Image";

const ProductHorizontalWidget = ({ items, loadMoreLink, emptyMessage }) => {
  return (
    <div className="widgetProductAside">
      {!!items?.length ? (
        items.map((order, i) => (
          <Link
            to={`${loadMoreLink}/${order?._id}`}
            className="widgetProductAsideItem"
          >
            <div className="widgetProductAsideItemLeft">
              <Image
                src={
                  !!order?.productId?.images?.length
                    ? order?.productId?.images[0]
                    : "/apt2-6.jpg"
                }
                pictureStyle={{ borderRadius: "10px" }}
              />
            </div>
            <div className="widgetProductAsideItemRight">
              <div className="widgetProductAsideItemRightTitle">
                {order?.productId?.title}
              </div>
              <div className="widgetProductAsideItemRightPrice">
                <span className="widgetProductAsideItemRightPriceCurrency">
                  {order?.currency?.symbol}
                </span>{" "}
                <span className="widgetProductAsideItemRightPriceValue">
                  {order?.totalAmount}
                </span>
              </div>
              <div className="widgetProductAsideItemRightOptions">
                <div className="widgetProductAsideItemRightOptionOption">
                  {order?.prductId?.productType}
                </div>
                <div className="widgetProductAsideItemRightOptionOption">
                  {order?.prductId?.marketingType}
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="widgetProductAsideEmpty"> {emptyMessage}</div>
      )}
      {items?.length === 6 && (
        <Link to={loadMoreLink} className="widgetProductAsideMore">
          Load more
        </Link>
      )}
    </div>
  );
};

export default ProductHorizontalWidget;
