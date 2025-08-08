import React, {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from "react";
import {
  IoCart,
  IoShareSocial,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import {
  formattedAmount,
  formattedNumber,
} from "../../../utilities-config/numberFormatter";
import {
  videoMimtype,
} from "../../../utilities-config/utils";
import { productCrud } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { frontURL } from "../../../utilities-config/urlConfig";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProductInfoSlide1 from "../productDetailFolder/productDescription/component/ProductInfoSlide1";
import useUrlSearchParams from "../../../utilities-config/useUrlSearchParams";

const HomePage = forwardRef(
  (
    {
      product,
      isMobile,
      taxRate,
      history,
      currency,
  isAdmin,
  isManager,
      volume,
      productPage,
      account,
      index,
      toggleVolume,
      accountId,
      postId,
      focusItem,
    },
    ref
  ) => {
    const [track, setTrack] = useState(null);

    const ctype = useUrlSearchParams()
    const mediaDescription = useRef("");
    const mediaName = useRef("");
    const imageListRef = useRef(null);
    // const [openComment, setOpenComment] = useState(false)
    const mediaFileRef = useRef(null);
    const [openTour, setOpenTour] = useState(false);
    const [showIcons, setShowIcons] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [mediaIsPlaying, setMediaIsPlaying] = useState(true);
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
    const [trackId, setTrackId] = useState(null);
    const [fileIndexTrackId, setFileIndexTrackId] = useState(null);

    const handleClickPlay = useCallback(
      ({ action }) =>
        () => {
          if (action === "play") {
            setMediaIsPlaying((prev) => !prev);
            mediaFileRef.current.play(); } else if (action === "pause") {
            setMediaIsPlaying((prev) => !prev);
            mediaFileRef.current.pause();
          }
        },
      [mediaFileRef]
    );
    const handleBack = () => {
      const scrollAmount = (imageListRef.current.clientWidth * -1) / 4;
      imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      mediaFileRef.current.pause();
    };
    const handleForward = () => {
      const scrollAmount = (imageListRef.current.clientWidth * 1) / 4;
      imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    function getTime() {
      var minutes, seconds;
      minutes = parseInt(Number(track?.mediaTime) / 60);
      seconds = parseInt(Number(track?.mediaTime) % 60);
      return (
        <div className="homeContentScreenItemMediaTime">
          {minutes} : {seconds}
          {"s"}
        </div>
      );
    }

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
          `${frontURL}/product-details/?pn=${product?.slug}&pid=${product?._id}`
        ),
        display: true,
        name: "Share",
      },
      { icon: IoCart, action: checkout, display: isMobile, name: "Checkout" },
    ];
 
   
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

    useEffect(() => {
      if (product) {
        mediaName.current = product?.title;
        mediaDescription.current = product?.description;
      }
    }, [product]);

    const goBack = useCallback(() => {
      history.goBack();
    }, [history]);
  
 const productInfoSlide = useMemo(
      () => ({
        ctype,
        handleClose: goBack,
        parentDialog: true,
        productId: product?._id,
        currency,
        setTrack,
        productPage,
        taxRate,
        isAdmin,
        isManager,
        isMobile,
        track,
        accountId,
        history,
        account,
      }),
      [
        goBack,
        ctype,
        currency,
        productPage,
        taxRate,
        account,

        isAdmin,
        isManager,
        accountId,
        history,
        product,
        isMobile,
        track,
      ]
    );

    const handleTourSlide = () => setOpenTour((prev) => !prev);
  const tourProps = {
    open: openTour,
    handleClose: handleTourSlide,
    currency,
    account,
    accountId,
    data: product,
  };
   

    useEffect(() => {
      if (mediaFileRef.current && focusItem !== postId) {
        mediaFileRef.current.pause();
      }
    }, [focusItem, postId]);


      
    return (
      <>
        <div
          className="homeContentScreenItem"
          ref={ref}
          data={postId}
          index={index + 1} 
        >
          <div className="homeContentScreenItemMedia">
            <div className="homeContentScreenItemMediaItem" ref={imageListRef}>
             <video
                      // ref={focusElement || null}
                      alt="item-media"
                      data={product?.videos[0]?._id}
                      // key={i}
                      src={product?.videos[0]?.media}
                      onContextMenu={(e) => e.preventDefault()}
                      loop
                      // onError={(e) => handleImageError(e)}
                      className="homeContentScreenItemMediaItemVideo"
                      preload="auto"
                      title={product?.title}
                      webkit-playsinline="true"
                      playsInline={true}
                      autoPlay={true}
                      // autoPlay={  focusItem === postId ? true : false}
                      muted={volume ? "" : "muted"}
                      loading="lazy"
                    />

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
            {videoMimtype.includes(track?.mimetype) && getTime()}           
          </div>
          <div className="homeContentScreenItemDescription">
              {product?.media?.length > 1 && (
                <div className="homeContentScreenItemDescriptionCount">
                  <span>
                    {currentSlide} of {product?.media.index}
                    {product?.media?.length} media files
                  </span>
                </div>
              )}
              <div className="homeContentScreenItemDescriptionPrice">
                {" "}
                {currency?.symbol}
                {formattedAmount({
                  amount: product?.price,
                  currencyValue: currency?.value,
                })}{" "}
              </div>
              <div className="homeContentScreenItemDescriptionTitle reduceText1">
                {product?.title}{" "}
              </div>
              <div
                className={
                  showDescription
                    ? " homeContentScreenItemDescriptionAbout"
                    : "homeContentScreenItemDescriptionAbout reduceText"
                }
                onClick={handleShowDescription(track?._id)}
              >
                {" "}
                {product?.description}
              </div>
              <div className="homeContentScreenItemDescriptionBtns">
                <div
                  className="homeContentScreenItemDescriptionBtnsItem btnBooking"
                  onClick={checkout}
                >
                  {" "}
                  {["Shortlet", "Hotel"].includes(product?.productType)
                    ? "Proceed to Booking"
                    : "Checkout"}{" "}
                </div>
              </div>
            </div>
        </div>
        <ProductInfoSlide1 {...productInfoSlide} />

      </>
    );
  }
);

export default HomePage;
