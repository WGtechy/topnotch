import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import {
  IoCart,
  IoShareSocial,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import { productCrud } from "../../redux/actions";
import { useDispatch } from "react-redux";
import {
  formattedAmount,
  formattedNumber,
} from "../../utilities-config/numberFormatter";
import {
  handleImageError,
  imageMimtype,
  videoMimtype,
} from "../../utilities-config/utils";
import TourSlide from "../home/postCardComponents/TourSlide";
import { frontURL } from "../../utilities-config/urlConfig";
import useUrlSearchParams from "../../utilities-config/useUrlSearchParams";

const ScreenLeftSection = ({
  postId,
  product,
  disableAutoPlay,
  currency,
  history,
  account,
  volume,
  toggleVolume,
  accountId,
  isMobile,
}) => {
  const imageListRef = useRef(null);
      const ctype = useUrlSearchParams()
  
  const mediaFileRef = useRef(null);
  const [openTour, setOpenTour] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


  const shareHandler = useCallback(
    (url) => () => {
      if (window.navigator.share) {
        navigator
          .share({
            // url,
            title: product?.title,
            text: url,
          })
          .then(() => {
            return;
          })
          .catch((error) => null);
      } else {
        // alert("Please don't forget to share");
        return null;
      }
    },
    [product]
  );
  const observer = useRef(null);
  const [fileIndexTrackId, setFileIndexTrackId] = useState(null);

  const focusElement = useCallback(
    (node) => {
      observer.current = new IntersectionObserver(
        (entries) => {
          let entry = null;
          for (entry of entries) {
            if (
              entry?.isIntersecting &&
              entry.target?.classList[0] === "homeContentScreenItemMediaItemVideo"
            ) {
              !disableAutoPlay && entry.target?.play();
              mediaFileRef.current = entry.target;
            } else {
              if (
                entry.target?.classList[0] === "homeContentScreenItemMediaItemVideo"
              ) {
                entry.target?.pause();
                mediaFileRef.current = entry.target;
              }
            }
            if (entry.isIntersecting) {
              setFileIndexTrackId(entry.target.getAttribute("data"));
            }
          }
        },
        {
          threshold: 0.5,
        }
      );
      if (node) observer?.current?.observe(node);
    },
    [disableAutoPlay]
  );
   
  const dispatch = useDispatch();

  const postSaveUpdateServer = useCallback(() => {
    if (accountId) {
      dispatch(
        productCrud({
          crud: "SAVED",
          postId: postId,
          accountId,
        })
      );

      setIsSaved((prev) => !prev);
    } else {
      if (ctype !== "auth") {
        history.push(`/?redirect=true&ctype=auth`);
      }
    }
  }, [accountId, history, dispatch, postId, ctype]);

    const checkout = () => history.push(`/product-details/${product?.slug}?pid=${product?._id}`);

  const rightIcons = [
    {
      icon: volume ? IoVolumeHigh : IoVolumeMute,
      action: toggleVolume,
      name: "Volume",
      display: videoMimtype.includes(product?.videos[0]?.mimetype) ? true : false,
    },
    {
      icon: IoShareSocial,
      action: shareHandler(
        `${frontURL}/?pn=${product?.slug}&pid=${product?._id}`
      ),
      display: true,
      name: "Share",
    },
    { icon: IoCart, action: checkout, display: isMobile, name: "Checkout" },
  ];

 
  const handleSwitchIconsView = useCallback(
    (data) => () => {
      if (!isMobile) {
        setShowIcons(data);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    if (isMobile) {
      setShowIcons(true);
    }
  }, [isMobile]);

  const [showDescription, setShowDescription] = useState(null);
  const handleShowDescription = useCallback(
    (_id) => () => {
      if (_id === showDescription) {
        setShowDescription(null);
      } else {
        setShowDescription(_id);
      }
    },
    [showDescription]
  );

  const currentSlide =
    !!product?.media?.length &&
    product?.media.findIndex((x) => x._id === fileIndexTrackId) + 1;

  const handleTour = () => setOpenTour((prev) => !prev);
  const tourProps = {
    open: openTour,
    handleClose: handleTour,
    currency,
    accountId,
    data: product,
    account
  }; 
    
  return (
    <>
      <div
        className="homeContentScreenItemMedia"
        onMouseEnter={handleSwitchIconsView(true)}
        onMouseLeave={handleSwitchIconsView(false)}
      >
        <div className="homeContentScreenItemMediaItem" ref={imageListRef}>
          <div className="homeContentScreenItemMediaItemOverlay"></div>
          {!!product?.videos?.length &&
            product?.videos.map((item, i) =>
              videoMimtype.includes(item?.mimetype) ? (
                <video
                  ref={focusElement || null}
                  alt="item-media"
                  data={item?._id}
                  key={i}
                  src={item?.media}
                  onContextMenu={(e) => e.preventDefault()}
                  loop
                  // onError={(e) => handleImageError(e)}
                  className="homeContentScreenItemMediaItemVideo"
                  preload="auto"
                  title={item.name}
                  webkit-playsinline="true"
                  playsInline={true}
                  autoPlay={disableAutoPlay ? false : true}
                  muted={volume ? "" : "muted"}
                  loading="lazy"
                />
              ) : (
                imageMimtype.includes(item?.mimetype) && (
                  <img
                    key={i}
                    data={item?._id}
                    src={item.media}
                    alt={item.name}
                    ref={focusElement || null}
                    className="homeContentScreenItemMediaItemImg"
                    loading="lazy"
                    onError={(e) => handleImageError(e)}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )
              )
            )}
        </div>
        <div className="homeContentScreenItemMediaDescription">
          {product?.media?.length > 1 && (
            <div className="homeContentScreenItemMediaDescriptionCount">
              <span>
                {currentSlide} of {product?.media.index}
                {product?.media?.length} media files
              </span>
            </div>
          )}
          <div className="homeContentScreenItemMediaDescriptionPrice">
            {" "}
            {currency?.symbol}
            {formattedAmount({
              amount: product?.price,
              currencyValue: currency?.value,
            })}{" "}
          </div>
          <div className="homeContentScreenItemMediaDescriptionTitle reduceText1">
            {product?.title}{" "}
          </div>
          <div
            className={
              showDescription
                ? " homeContentScreenItemMediaDescriptionAbout"
                : "homeContentScreenItemMediaDescriptionAbout reduceText"
            }
            onClick={handleShowDescription(product?._id)}
          >
            {" "}
            {product?.description}
          </div>
          <div className="homeContentScreenItemMediaDescriptionBtns">
            <div
              className="homeContentScreenItemMediaDescriptionBtnsItem btnBooking"
              onClick={checkout}
            >
              {" "}
              {["Shortlet", "Hotel"].includes(product?.productType)
                ? "Proceed to Booking"
                : "Checkout"}{" "}
            </div>
            {product?.isOnsiteTour || product?.isVirtualTour ? (
              <div
                className="homeContentScreenItemMediaDescriptionBtnsItem btnTour"
                onClick={handleTour}
              >
                Take a tour
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={
            showIcons
              ? "homeContentScreenItemMediaFooter"
              : "homeContentScreenItemMediaFooter hideAllIcons"
          }
        >
          {rightIcons.map((item, i) =>
            item.display ? (
              item.action ? (
                <div
                  className={`homeContentScreenItemMediaFooterIcon ${
                    item?.iconClassName || ""
                  }`}
                  key={i}
                  content={item.name}
                  onClick={item.action}
                >
                  <item.icon />{" "}
                  {item?.value && (
                    <span className="homeContentScreenItemMediaFooterIconValue">
                      {formattedNumber(item.value)}
                    </span>
                  )}
                </div>
              ) : (
                <Link
                  className="homeContentScreenItemMediaFooterIcon"
                  key={i}
                  to={item.link}
                >
                  <item.icon />
                  {item?.value && (
                    <span className="homeContentScreenItemMediaFooterIconValue">
                      {formattedNumber(item.value)}
                    </span>
                  )}
                </Link>
              )
            ) : null
          )}
        </div>
       
      </div>
      <TourSlide {...tourProps} />
    </>
  );
};

export default ScreenLeftSection;
