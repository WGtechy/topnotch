import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Checkout from "./component/Checkout";
import Reviews from "./component/Reviews";
import Recommendations from "./component/Recommendations";
import Features from "./component/Features";
import Ratings from "./component/Ratings";
import Policy from "./component/Policy";
import TheFooter from "../../../../bucket/TheFooter";
import CalendarComponent from "./component/CalendarComponent";
// import { getCart } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import PolicySlide from "./component/PolicySlide";
import FeatureSlide from "./component/FeatureSlide";
import PricingDetail from "./component/PricingDetail";
import MediaSlide from "./component/MediaSlide";
import { handleImageError } from "../../../../utilities-config/utils";
import TheItemsScrollTemplate from "../../../../bucket/TheItemsScrollTemplate";
import ProceedToPayment from "../../../checkout/ProceedToPayment";
import ProductCheckoutSlide from "../../../checkout/ProductCheckoutSlide";
import { IoLocation } from "react-icons/io5";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { productCrud } from "../../../../redux/actions";

const ProductInfo = ({
  product,
  currency,
  isMobile,
  history,
  isAdmin,
  isManager,
  accountId,
  taxRate,
  track,
  ctype,
  viewOnly,
  account,
  totalComments,
  totalLikes,
}) => {
  const [showProductDescription, setShowProductDescription] = useState(false);
  const [checkInCalendar, setCheckInCalendar] = useState(new Date());
  const dispatch = useDispatch();
  const [openMediaSlide, setOpenMediaSlide] = useState(false);
  const [active, setActive] = useState("");
  const [checkOutCalendar, setCheckOutCalendar] = useState();
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [openPayment, setOpenPayment] = useState(false);

  const [checkInDates, setCheckInDates] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  // const [totalProducts, setTotalProducts] = useState(0);
  const scrollToCalendar = useRef(null);
  const [openMedia, setOpenMedia] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const scrollToMedia = useRef(null);
  const mediaRef = useRef();
  const scrollToRecommendations = useRef(null);
  const [selectedTrack, setSelectedTrack] = useState(false);
  const scrollToFeatures = useRef(null);
  const scrollToReviews = useRef(null);
  const [openFeatures, setOpenFeatures] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const scrollToPolicies = useRef(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const handlePayment = useCallback(() => {
    setOrderDetails();
    setOpenPayment((prev) => !prev);
  }, []);

  const handleScrollToCalendar = useCallback(() => {
    scrollToCalendar?.current?.scrollIntoView({ behaviour: "smooth" });
    setActive("Calendar");
  }, []);

  const observer = useRef(null);

  const handlePolicy = useCallback(() => setOpenPolicy((prev) => !prev), []);
  const handleFeature = useCallback(() => setOpenFeatures((prev) => !prev), []);

  const focusElement = useCallback((node) => {
    // if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        let entry = null;
        for (entry of entries) {
          if (entry?.isIntersecting) {
            // setActive(entry.target.classList[0])
            setActive("");
          } else {
            setActive("");
          }
        }
      },
      {
        threshold: 1,
        rootMargin: "10px",
      }
    );
    if (node) observer?.current?.observe(node);
  }, []);

  useEffect(() => {
    if (product && accountId && !viewOnly) {
      if (!ctype || ctype === "info") {
        if (
          !["Shortlet", "Hotel", "Automobile", "Property"].includes(
            product?.productType
          )
        ) {
          // dispatch(getCart({ productId: product?.id, accountId: accountId }));
        } else if (["Shortlet", "Hotel"].includes(product?.productType)) {
          // dispatch(getSaveItem())
        }
      }
    }
  }, [product, dispatch, accountId, ctype, viewOnly]);

  const handleFullProductDescription = () =>
    setShowProductDescription((prev) => !prev);

  const descriptionRef = useRef(null);

  const [selectedRecommendations, setSelectedRecommendations] = useState([]);
  const handleSelectRecommendation = useCallback(
    (item) => () => {
      setSelectedRecommendations((prev) => {
        let del = prev.find((x) => x._id === item._id);

        if (del) {
          return prev.filter((x) => x._id !== del._id);
        } else {
          return [
            ...prev,
            {
              _id: item?._id,
              productId: {
                _id: item?._id,
                title: item?.title,
                bannerImage: item?.bannerImage,
                price: item?.price,
                discount: item?.discount,
                minimumPurchase: item?.minimumPurchase,
              },
            },
          ];
        }
      });
    },
    []
  );

  const calendarProps = useMemo(
    () => ({
      product,
      setCheckInCalendar,
      setCheckOutCalendar,
      setTotalAmount,
      checkInCalendar,
      setCheckoutErrorMessage,
      checkOutCalendar,
      setTotalCount,
      setCheckInDates,
      checkInDates,
      viewOnly,
    }),
    [checkInCalendar, viewOnly, checkOutCalendar, product, checkInDates]
  );


  const checkoutProps = useMemo(
    () => ({
      totalCount,
      currency,
      history,
      product,
      accountId,
      setCheckInTime,
      checkInDates,
      setCheckInDates,
      setTotalAmount,
      selectedRecommendations,
      checkInCalendar,
      checkOutCalendar,
      setTotalCount,
      isMobile,
      handlePayment,
      checkoutErrorMessage,
      totalAmount,
      goToCalendar: handleScrollToCalendar,
    }),
    [
      totalCount,
      currency,
      checkoutErrorMessage,
      product,
      checkInDates,
      checkInCalendar,
      handlePayment,
      checkOutCalendar,
      accountId,
      isMobile,
      selectedRecommendations,
      totalAmount,
      history,
      handleScrollToCalendar,
    ]
  );

  const recommendationsProps = useMemo(
    () => ({
      product,
      currency,
      handleSelectRecommendation,
      selectedRecommendations,
      isMobile,
    }),
    [
      product,
      currency,
      isMobile,
      handleSelectRecommendation,
      selectedRecommendations,
    ]
  );

  const handleSetMediaFile = useCallback(
    (data) => () => {
      setOpenMedia((prev) => !prev);
      setSelectedTrack(data);
    },
    [setSelectedTrack, setOpenMedia]
  );

  const pricingDetailsProps = useMemo(
    () => ({
      focusElement,
      product,
      currency,
      isMobile,
      taxRate,
      handleSetMediaFile,
    }),
    [focusElement, handleSetMediaFile, product, taxRate, currency, isMobile]
  );

  const policySlideProps = useMemo(
    () => ({
      handleClose: handlePolicy,
      open: openPolicy,
      policies: product?.policies,
      parentDialog:
        ["checkout", "cart"].includes(ctype) || viewOnly ? false : true,
    }),
    [ctype, openPolicy, handlePolicy, product, viewOnly]
  );

  const featureSlideProps = useMemo(
    () => ({
      handleClose: handleFeature,
      parentDialog:
        ["checkout", "cart"].includes(ctype) || viewOnly ? false : true,
      product,
      open: openFeatures,
    }),
    [product, ctype, openFeatures, handleFeature, viewOnly]
  );

  const handleCloseMediaSlide = useCallback(() => {
    setSelectedTrack(null);
    setOpenMediaSlide((prev) => !prev);
  }, []);

  const mediaSlideProps = useMemo(
    () => ({
      open: openMediaSlide,
      track,
      isMobile,
      mediaFiles: product?.media,
      selectedTrack,
      setSelectedTrack,
      handleClose: handleCloseMediaSlide,
    }),
    [
      handleCloseMediaSlide,
      product,
      setSelectedTrack,
      isMobile,
      track,
      selectedTrack,
      openMediaSlide,
    ]
  );

  const handleOpenFeatures = useCallback(
    () => setOpenFeatures((prev) => !prev),
    []
  );

  const ratingMediaFilesRef = useRef(null);

  const allPropertiesFeatures = useMemo(
    () => ({
      open: openFeatures,
      handleClose: handleOpenFeatures,
      features: product?.features,
    }),
    [openFeatures, handleOpenFeatures, product]
  );
  const handleClosePayment = () => setOpenPayment((prev) => !prev);

  const proceedToPaymentProps = useMemo(
    () => ({
      accountId,
      product,
      account,
      order: {},
      firstName: account?.firstName,
      surname: account?.surname,
      address: account?.address,
      handlePayment,
      open: openPayment,
      handleClose: handleClosePayment,
      phone: account?.phone,
      email: account?.email,
      checkInDates,
      totalAmount,
      totalCount,
      checkInCalendar,
      checkOutCalendar,
      checkInTime,
      currency,
      cartProducts: selectedRecommendations,
    }),
    [
      account,
      product,
      checkInDates,
      totalAmount,
      selectedRecommendations,
      checkInTime,

      totalCount,
      checkInCalendar,
      checkOutCalendar,
      currency,
      accountId,
      handlePayment,
      openPayment,
    ]
  );
  const commentProps = {accountId,  postId: product?.postId}

  const handleDeleteProduct = ()=>{
    dispatch(productCrud({
      crud: "DELETE",
      accountId,
      productId: product._id,
    }))
  }
  return (
    <>
      <div className="productInfo">
        <div className="productInfoTop" onClick={()=>console.log(product._id)}>
          {!["Hotel", "Shortlet", "Property", "Automobile", "Interior"].includes(
            product?.productType
          ) &&
            !!product?.images?.length && (
              <div className="productInfoBanner" ref={ratingMediaFilesRef}>
                <TheItemsScrollTemplate
                  scrollRef={ratingMediaFilesRef}
                  minimuCount={2}
                  isMobile={isMobile}
                >
                  {product?.bannerImage?.media && (
                    <img
                      src={product?.bannerImage.media}
                      alt={product?.title}
                      className="productInfoBannerImg"
                      loading="lazy"
                      onError={(e) => handleImageError(e)}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  )}
                  {product?.images.map((img, i) => (
                    <img
                      src={img?.media}
                      key={i}
                      alt={img?.title}
                      className="productInfoBannerImg"
                      loading="lazy"
                      onError={(e) => handleImageError(e)}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  ))}
                </TheItemsScrollTemplate>
              </div>
            )}
            {isAdmin && <div className="productInfoTopBtns">
            <Link  className="productInfoTopBtnsItem" to={`/product/${product?._id}`}>Update</Link>
            <div  className="productInfoTopBtnsItem" onClick={handleDeleteProduct}>Delete</div>
            </div>}

          <h2 className="productInfoTitle reduceText2">{product?.title}</h2>
          {product?.country &&
            ["Hotel", "Shortlet", "Property", "Automobile"].includes(
              product?.productType
            ) && (
              <div className="productInfoLocation">
              <IoLocation />  {product?.neighborhood}, {product?.city}, {product?.country}.
              </div>
            )}
          {/* Reviews */}
          {["Hotel", "Shortlet", "Property", "Automobile"].includes(
            product?.productType
          ) && (
            <Reviews
              rating={product?.rating || 0}
              totalLikes={totalLikes || 0}
              totalComments={totalComments || 0}
              currency={currency}
              discount={product?.discount || 0}
            />
          )}
        <div className="productInfoDescription">
          <div
            ref={descriptionRef}
            className={
              showProductDescription
                ? "productInfoDescriptionContent"
                : "productInfoDescriptionContent reduceText6"
            }
            onClick={handleFullProductDescription}
          >
            {product?.description}
          </div>
        </div>
        </div>

        <span ref={scrollToMedia}></span>
        <PricingDetail {...pricingDetailsProps} />

        {/* Media description */}
        {/* {!viewOnly &&
          ["Hotel", "Shortlet", "Property", "Automobile"].includes(
            product?.productType
          ) && (
            <div className="productInfoMedia">
              <div className="productInfoMediaTitle" id="Media">
                Media: {track?.name}
              </div>
              <div className="productInfoMediaDescription">
                {track?.description}
              </div>
            </div>
          )}
        <span className="Media" ref={focusElement}></span> */}

        {/* Recommendations */}
        <span ref={scrollToRecommendations}></span>
        {!!product?.recommendations?.length && (
          <Recommendations {...recommendationsProps} />
        )}
        <span className="Recommendations" ref={focusElement}></span>

        {/* Features */}
        <span ref={scrollToFeatures}></span>
        {!!product?.features?.length && <Features {...featureSlideProps} />}
        <span className="Features" ref={focusElement}></span>

        {/* Calendar */}
        <span ref={scrollToCalendar}></span>
        {["Hotel", "Shortlet"].includes(product?.productType) && (
          <CalendarComponent {...calendarProps} />
        )}
        <span className="Calendar" ref={focusElement}></span>

       

        {/* Policy */}
        <span ref={scrollToPolicies}></span>
        {!!product?.policies?.length && <Policy {...policySlideProps} />}
        <span className="Policies" ref={focusElement}></span>

      <Comment {...commentProps} />
        {/* Calculation */}

        {!viewOnly && product?.price && <Checkout {...checkoutProps} />}

        {!viewOnly && ctype && <TheFooter />}
      </div>
      <PolicySlide {...policySlideProps} />
      {["Shortlet", "Hotel", "Automobile", "Serivce"].includes(
        product?.productType
      ) && <FeatureSlide {...allPropertiesFeatures} />}

      <MediaSlide {...mediaSlideProps} />
      <ProductCheckoutSlide {...proceedToPaymentProps} />
    </>
  );
};

export default ProductInfo;
