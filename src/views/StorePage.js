// import React, {
//   Suspense,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import {
//   PiArrowLeft,
//   PiArrowRight,
//   PiBookmark,
//   PiCalendarCheck,
//   PiChatsCircle,
//   PiPencil,
//   PiPhoneLight,
//   PiShareNetwork,
//   PiTrash,
//   PiWhatsappLogo,
// } from "react-icons/pi";
// import ImageSliderFoot from "../bucket/cards/ImageSliderFoot";
// import ProductStickyFooter from "../bucket/ProductStickyFooter";
// import ProductPagePropertyFeatures from "../bucket/ProductPagePropertyFetures";
// // import { PiBathtub, PiBed, PiToilet } from "react-icons/pi";
// import PopularResidence from "../bucket/PopularResidence";
// import Calendar from "../bucket/Calendar";
// import CheckoutUpdate from "../bucket/CheckoutUpdate";
// import { frontURL } from "../utilities-config/urlConfig";
// import PopularAutos from "../bucket/PopularAutos";
// import { formattedAmount } from "../utilities-config/numberFormatter";
// import Advert from "../bucket/cards/Advert";
// import { useDispatch, useSelector } from "react-redux";
// import { cartCrud, getProduct, getCart, productCrud } from "../redux/actions";
// import UpdateProduct from "./product/UpdateProduct";
// import PictureSlideModal from "../bucket/PictureSlideModal";
// import Error404 from "./Error404";
// import { componentLoader } from "../bucket/loading-components/componentLoader";
// import useUrlSearchParams from "../utilities-config/useUrlSearchParams";
// import EmptyDataPage from "../bucket/EmptyDataPage";
// import { toastObject } from "../redux/toastObject";
// import { toast } from "react-toastify";
// import { TheConfirmationMessage } from "../bucket/TheConfirmationMessage";
// import { IoPause, IoPlay } from "react-icons/io5";
// import TheFooter from "../bucket/TheFooter";

// const StorePage = (props) => {
//   const {
//     currency,
//     history,
//     autoCategories,
//     buildingCategories,
//     locations,
//     isAdmin,
//     name,
//     accountId,
//     advert,
//   } = props;
//   const { product, loadingProduct, status, loadingNewProduct } = useSelector(
//     (state) => state.products
//   );

//   const [targetImage, setTargetImage] = useState(0);
//   const [targetVideo, setTargetVideo] = useState(0);
//   const [playingVideo, setPlayingVideo] = useState(null);
//   const videoRef = useRef(null);
//   const dispatch = useDispatch();
//   const [hideFullPolicy, setHideFullPolicy] = useState(true);
//   const [proceedToChat, setProceedToChat] = useState(false);
//   const [update, setUpdate] = useState(false);
//   // const isAutomobile = ["Shortlet", "Hotel", "Property"].includes(name) ? false : true;
//   const [openMedia, setOpenMedia] = useState(false);
//   const [imageIndex, setImageIndex] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [checkInDates, setCheckInDates] = useState([]);
//   const [checkInTime, setCheckInTime] = useState(null);
//   const [checkOutTime, setCheckOutTime] = useState(null);
//   const { cartItem } = useSelector((state) => state.cart);
//   const [openMessageBox, setOpenMessageBox] = useState(false);
//   const handleCloseMessageBox = () => setOpenMessageBox((prev) => !prev);
//   const params = useUrlSearchParams();
//   useEffect(() => {
//     if (params?.id && !loadingNewProduct) {
//       dispatch(getProduct(params?.id));
//     }
//   }, [dispatch, accountId, params.id, loadingNewProduct]);
//   // cartCrud
//   useEffect(() => {
//     if (accountId) {
//       dispatch(getCart({ productId: params?.id, accountId: accountId }));
//     } else {
//       localStorage.setItem("cart", null);
//       let _cart = localStorage.getItem("cart");
//       if (![null, undefined, "null"].includes(_cart) && params?.id) {
//         let items = JSON.parse(_cart);
//         if (!!items.length) {
//           const inStore = items.find((x) => x.productId === params.id);
//           if (inStore?._id) {
//             dispatch(getCart({ cartId: inStore._id }));
//           }
//         }
//       }
//     }
//     localStorage.setItem("authorization_url", null);
//     localStorage.setItem("purchase", null);
//   }, [dispatch, accountId, params.id]);

//   const handleProceedToChat = useCallback(() => {
//     if (
//       ["Shortlet", "Automobile"].includes(product?.productType) &&
//       product?.marketingType === "Rent"
//     ) {
//       setProceedToChat((prev) => !prev);
//     } else {
//       // Send to whatsapp directly
//     }
//   }, [product]);

//   useEffect(() => {
//     if (params?.target === "checkout") {
//       handleProceedToChat();
//     }
//   }, [params.target, handleProceedToChat]);

//   const shareContent = useCallback(
//     (item) => () => {
//       // let linkTo = link;
//       if (window.navigator.share) {
//         navigator
//           .share({
//             url: item,
//             title: product?.title,
//             text: product?.description,
//           })
//           .then(() => {
//             return;
//           })
//           .catch((error) => null);
//       } else {
//         // alert("Please don't forget to share");
//         return null;
//       }
//     },
//     [product]
//   );

//   useEffect(() => {
//     if (cartItem) {
//       setCheckInDates(cartItem.checkInDates);
//       setCheckInTime(cartItem.checkInTime);
//       setCheckOutTime(cartItem.checkOutTime);
//       setTotalAmount(cartItem.totalAmount);
//     }
//   }, [cartItem]);

//   const saveToCart = useCallback(
//     (type) => () => {
//       let serverData = {
//         productId: product._id,
//         accountId: accountId,
//         checkInDates,
//         checkInTime,
//         totalAmount,
//         currency,
//         checkOutTime,
//         count: checkInDates?.length,
//         crud: cartItem?._id ? "UPDATE" : "CREATE",
//       };
//       dispatch(cartCrud(serverData));
//       if (!accountId) {
//         // Get the former cart items
//         let _cart = localStorage.getItem("cart");
//         if (![null, undefined, "null"].includes(_cart)) {
//           let _cartArray = JSON.parse(_cart);
//           if (!!_cartArray?.length) {
//             let newItems = [
//               {
//                 productId: product._id,
//                 accountId: accountId,
//                 checkInDates,
//                 totalAmount,
//                 currency,
//                 count: checkInDates?.length,
//                 bannerImage: product?.bannerImage,
//               },
//               ..._cartArray,
//             ];
//             localStorage.setItem("cart", JSON.stringify(newItems));
//           } else {
//             let newItems = [
//               {
//                 productId: product._id,
//                 accountId: accountId,
//                 checkInDates,
//                 totalAmount,
//                 currency,
//                 count: checkInDates?.length,
//                 bannerImage: product?.bannerImage,
//                 productType: product.productType,
//               },
//             ];
//             localStorage.setItem("cart", JSON.stringify(newItems));
//           }
//         }
//       }
//     },
//     [
//       checkInDates,
//       currency,
//       checkOutTime,
//       accountId,
//       cartItem,
//       dispatch,
//       product,
//       checkInTime,
//       totalAmount,
//     ]
//   );
//   const handleDelete = () => setOpenMessageBox((prev) => !prev);
//   const handleUpdateProduct = () => setUpdate((prev) => !prev);

//   const [openWhatsappBox, setOpenWhatsappBox] = useState(false);
//   const [textDate, setTextDate] = useState("");
//   const proceedToWhatsapp = useCallback(() => {
//     if (!!checkInDates.length) {
//       for (let item of checkInDates) {
//         setTextDate(
//           (prev) => `${item.day}/${item.month}/${item.year}, ${prev}`
//         );
//       }
//     }
//     setOpenWhatsappBox((prev) => !prev);
//   }, [checkInDates]);
//   const icons = useMemo(
//     () => [
//       {
//         name: "Share",
//         iconName: PiShareNetwork,
//         click: () =>
//           shareContent({
//             url: `${frontURL}${history?.location?.pathname}?id=${product._id}`,
//             title: product.title,
//             description: product.description,
//           }),
//         display: product?.live ? true : false,
//       },
//       // { name: "Checkout", iconName: PiArrowsLeftRight, click: null, display: true},
//       {
//         name: "Save",
//         iconName: PiBookmark,
//         click: saveToCart,
//         display: product?.live
//           ? isAdmin || product?.addedBy?._id === accountId
//             ? false
//             : accountId
//             ? true
//             : false
//           : false,
//       },
//       {
//         name: ["Automobile"].includes(product?.productType)
//           ? "Hire"
//           : "Reservation",
//         iconName: PiCalendarCheck,
//         click: handleProceedToChat,
//         display:
//           product?.live && product?.marketingType === "Rent" ? true : false,
//       },
//       {
//         name: "Chat",
//         iconName: PiWhatsappLogo,
//         click: proceedToWhatsapp,
//         link: `https://wa.me/${product?.admin?.phone}?text=Please find my request here: ${frontURL}${history?.location?.pathname}?id=${params?.id}`,
//         display: product?.live && params?.id ? true : false,
//       },
//       {
//         name: "Call",
//         iconName: PiPhoneLight,
//         link: `tel:${product?.admin?.phone}`,
//         display: product?.live ? true : false,
//       },
//       {
//         name: "Edit",
//         iconName: PiPencil,
//         click: handleUpdateProduct,
//         display: accountId
//           ? isAdmin || product?.addedBy?._id === accountId
//             ? true
//             : false
//           : false,
//       },
//       {
//         name: "Delete",
//         iconName: PiTrash,
//         click: handleDelete,
//         display: accountId
//           ? isAdmin || product?.addedBy?._id === accountId
//             ? true
//             : false
//           : false,
//       },
//     ],
//     [
//       handleProceedToChat,
//       isAdmin,
//       saveToCart,
//       accountId,
//       params.id,
//       product,
//       history,
//       proceedToWhatsapp,
//       shareContent,
//     ]
//   );

//   const prevItem = () => {
//     if (targetImage === 0) {
//       setTargetImage(product?.images.length - 1);
//     } else {
//       setTargetImage((prev) => prev - 1);
//     }
//   };
//   const nextItem = () => {
//     if (targetImage === product?.images.length - 1) {
//       setTargetImage(0);
//     } else {
//       setTargetImage((prev) => prev + 1);
//     }
//   };
//   const prevVideoItem = () => {
//     if (targetVideo === 0) {
//       setTargetVideo(product?.videos.length - 1);
//     } else {
//       setTargetVideo((prev) => prev - 1);
//     }
//     setPlayingVideo(null);
//     videoRef.current.pause();
//   };
//   const nextVideoItem = () => {
//     if (targetVideo === product?.videos.length - 1) {
//       setTargetVideo(0);
//     } else {
//       setTargetVideo((prev) => prev + 1);
//     }
//     setPlayingVideo(null);
//     videoRef.current.pause();
//   };
//   const handleImageClick = useCallback(
//     (i) => () => {
//       setTargetImage(i);
//     },
//     []
//   );

//   const calendarProps = useMemo(
//     () => ({
//       unavailableDates: product?.unavailableDates,
//       title: "Available dates",
//       selection: false,
//       isUser: true,
//     }),
//     [product]
//   );

//   const proceedToChatProps = useMemo(
//     () => ({
//       open: proceedToChat,
//       handleClose: handleProceedToChat,
//       unavailableDates: product?.unavailableDates,
//       icons,
//       currency,
//       isAdmin,
//       textDate,
//       setTextDate,
//       shareContent,
//       phone: product?.admin?.phone,
//       checkInDates,
//       setCheckInDates,
//       totalAmount,
//       setTotalAmount,
//       checkInTime,
//       setCheckInTime,
//       checkOutTime,
//       setCheckOutTime,
//       saveToCart,
//       pathname: history?.location?.pathname,
//       product,
//       history: props.history,
//       accountId,
//       // cartItemId,
//     }),
//     [
//       proceedToChat,
//       history,
//       currency,
//       saveToCart,
//       shareContent,
//       textDate,
//       checkInDates,
//       props,
//       isAdmin,
//       checkOutTime,
//       setCheckOutTime,
//       checkInTime,
//       totalAmount,
//       handleProceedToChat,
//       icons,
//       product,
//       accountId,
//     ]
//   );
//   const popularProps = useMemo(
//     () => ({
//       currency,
//       history,
//       recommendations: product?.recommendations,
//       itemLink: product?.productType,
//     }),
//     [history, product, currency]
//   );

//   const popularAutoProps = useMemo(
//     () => ({
//       currency,
//       history,
//       recommendations: product?.recommendations,
//       itemLink: "automobiles",
//     }),
//     [history, currency, product]
//   );
//   const handleImageModal = useCallback(
//     (index) => () => {
//       setOpenMedia((prev) => !prev);
//       setImageIndex(index);
//     },
//     []
//   );
//   const mediaModalProps = {
//     open: openMedia,
//     handleClose: handleImageModal,
//     startIndex: imageIndex,
//     images: product?.images,
//   };
//   const handleDeleteProduct = () => {
//     props.history.goBack();
//     dispatch(productCrud({ crud: "DELETE", productId: product?._id }));
//     setOpenMessageBox(false);
//   };

//   const theConfirmationMessageProps = {
//     open: openMessageBox,
//     handleClose: handleCloseMessageBox,
//     click: handleDeleteProduct,
//     message: "Are you sure you want to delete this product ?",
//     title: "Confirmation required",
//   };

//   const theWhatsappProps = {
//     open: openWhatsappBox,
//     handleClose: proceedToWhatsapp,
//     link: `https://wa.me/${
//       product?.admin?.phone
//     }?text=Request link: ${frontURL}${history?.location?.pathname}?id=${
//       params?.id
//     } ${textDate || ""}`,

//     // link: `https://wa.me/${phone}?text=This is the link to my request ${frontURL}/request?id=${product?._id}  `,
//     message:
//       "We will redirect you to chat with our available customer care personnel on whatsapp. Please be aware that we will only available to respond to your messages from 9am to 9pm Nigeria time. Thank you. ",
//     title: "Confirmation required",
//   };

//   const handleControl = useCallback(
//     (media) => () => {
//       setPlayingVideo((prev) => {
//         if (prev) {
//           setPlayingVideo(null);
//           videoRef.current.pause();
//         } else {
//           setPlayingVideo(media);
//           videoRef.current.play();
//         }
//       });
//     },
//     []
//   );

//   const categoryTemplate = (
//     <ul className="productCategory">
//       {product?.category.map((item, i) => (
//         <li className="productCategoryItem" key={i}>
//           {item}
//         </li>
//       ))}
//     </ul>
//   );

//   const handleShowPolicy = () => setHideFullPolicy((prev) => !prev);
//   return (
//     <>
//       {/* Header */}
//       {/* <meta charSet="utf-8" /> */}
//       {/* <title>{product?.title}</title> */}
//       {/* <link
//       .find
//             rel="canonical"
//             href={`/${history?.location?.pathname}`}
//           />
//           {!!product?.images?.length && <link rel="apple-touch-icon" href={`/${product?.images[0]?.link}`} />}
//           {!!product?.images?.length && <link rel="shortcut icon" href={`/${product?.images[0]?.link}`} />}
//           <meta
//             property="og:image"
//             content={`/${!!product?.images?.length ? product?.images[0]?.link : ""}`}
//           ></meta>
//           <meta name="description" content={product?.description} /> */}
//       <Suspense fallback={componentLoader}>
//         {status === 404 && !loadingProduct ? (
//           <Error404 />
//         ) : loadingProduct && product?._id !== params?.id ? (
//           componentLoader
//         ) : product?._id ? (
//           <>
//             <div className="productPageContainer">
//               <div className="shortletPageHeader shortletPageContainerGlobalStyle">
//                 <div className="shortletPageHeaderTop">
//                   <div className="shortletPageHeaderTopLeft">
//                     <div className="shortletPageHeaderTopLeftTop">{name}</div>
//                   </div>
//                   <div className="shortletPageHeaderTopRight">
//                     {icons.map(
//                       (item, i) =>
//                         item?.display &&
//                         (item?.link ? (
//                           <a
//                             href={item?.link}
//                             className="shortletPageHeaderTopRightIcon"
//                             key={i}
//                           >
//                             {" "}
//                             <item.iconName />{" "}
//                             <span className="shortletPageHeaderTopRightIconName">
//                               {item.name}
//                             </span>
//                           </a>
//                         ) : (
//                           <div
//                             className="shortletPageHeaderTopRightIcon"
//                             key={i}
//                             onClick={item.click}
//                           >
//                             <item.iconName />{" "}
//                             <span className="shortletPageHeaderTopRightIconName">
//                               {item.name}
//                             </span>
//                           </div>
//                         ))
//                     )}
//                   </div>
//                 </div>
//                 <div className="shortletPageHeaderBottom">
//                   {!!product?.category?.length && categoryTemplate}
//                   <div className="shortletPageHeaderBottomTop">
//                     {product?.title}
//                   </div>
//                   {product?.shortDescription && (
//                     <div className="shortletPageHeaderBottomMiddle">
//                       {product.shortDescription}
//                     </div>
//                   )}
//                   <div className="shortletPageHeaderBottomBottom">
//                     <div className="shortletPageHeaderBottomBottomTitle">
//                       {" "}
//                       Product ID:{" "}
//                     </div>
//                     <span className="shortletPageHeaderBottomBottomValue">
//                       {product?.productId}
//                     </span>
//                   </div>
//                   {product?.productType !== "Automobile" && (
//                     <div className="shortletPageHeaderBottomLocation">
//                       {product?.location?.country &&
//                         `${product?.location?.country}/`}{" "}
//                       {product?.location?.city && `${product?.location?.city}/`}{" "}
//                       {product?.location?.neighborhood}
//                     </div>
//                   )}

//                   <div className="shortletPageHeaderBottomPrice">
//                     <span className="shortletPageHeaderBottomPriceAmount">
//                       <span className="shortletPageHeaderBottomPriceAmountCurrency">
//                         {currency.symbol}
//                       </span>{" "}
//                       <span className="shortletPageHeaderBottomPriceAmountFigure">
//                         {formattedAmount({
//                           amount: product?.price,
//                           currencyValue: currency.value,
//                         })}
//                       </span>
//                     </span>
//                     {product?.priceDependent &&
//                       product?.marketingType === "Rent" && (
//                         <span className="shortletPageHeaderBottomPriceDependent">
//                           Per {product?.priceDependent}
//                         </span>
//                       )}
//                   </div>
//                   {product?.marketingType === "Sale" && (
//                     <div className="shortletPageHeaderBottomBtns">
//                       <a
//                         href={`https://wa.me/${product?.admin?.phone}?text=${frontURL}/${history?.location?.pathname}&type=purchase`}
//                         className="shortletPageHeaderBottomBtnsItem"
//                       >
//                         {" "}
//                         Purchase{" "}
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="shortletPageContent">
//                 <div className="shortletPageContentLeft">
//                   {/* Product image */}
//                   {!!product?.images?.length && (
//                     <div className="shortletPageContentLeftImagesContainer shortletPageContentLeftContainerGlobalStyle">
//                       <div className="shortletPageContentLeftImagesContainerDisplay">
//                         <img
//                           onContextMenu={(e) => e.preventDefault()}
//                           className="shortletPageContentLeftImagesContainerDisplayImage"
//                           alt={product?.title}
//                           src={`${product?.images[targetImage].media}`}
//                           onClick={handleImageModal(targetImage)}
//                         />
//                         {product?.images?.length > 1 && (
//                           <div
//                             className="shortletPageContentLeftImagesContainerDisplayArrow shortletPageContentLeftImagesContainerDisplayLeftArrow"
//                             onClick={prevItem}
//                           >
//                             <PiArrowLeft />
//                           </div>
//                         )}
//                         {product?.images?.length > 1 && (
//                           <div
//                             className="shortletPageContentLeftImagesContainerDisplayArrow shortletPageContentLeftImagesContainerDisplayRightArrow"
//                             onClick={nextItem}
//                           >
//                             <PiArrowRight />
//                           </div>
//                         )}
//                       </div>

//                       {!!product?.images?.length && (
//                         <ImageSliderFoot
//                           images={product?.images}
//                           title={product?.title}
//                           handleImageClick={handleImageClick}
//                         />
//                       )}
//                     </div>
//                   )}

//                   {/* <div className="shortletPageContainerGlobalStyle">  */}
//                   {product?.productType !== "Automobile" && (
//                     <div className="shortletPageContentLeftDescription shortletPageContentLeftContainerGlobalStyle">
//                       <div className="shortletPageContentLeftDescriptionTitle">
//                         {" "}
//                         Features{" "}
//                       </div>
//                       <ProductPagePropertyFeatures
//                         features={product?.features}
//                       />
//                     </div>
//                   )}
//                   {/* </div> */}

//                   {product?.features?.otherFeatures && (
//                     <div className="shortletPageContentLeftDescription shortletPageContentLeftContainerGlobalStyle">
//                       <div className="shortletPageContentLeftDescriptionTitle">
//                         More features
//                       </div>
//                       <p className="shortletPageContentLeftDescriptionInfo">
//                         {product?.features?.otherFeatures}
//                       </p>
//                     </div>
//                   )}
//                   <div className="shortletPageContentLeftDescription shortletPageContentLeftContainerGlobalStyle">
//                     <div className="shortletPageContentLeftDescriptionTitle">
//                       {product?.productType} description
//                     </div>
//                     <p className="shortletPageContentLeftDescriptionInfo">
//                       {product?.description}
//                     </p>
//                   </div>
//                   {!!product?.documents?.length && (
//                     <div className="shortletPageContentLeftDescription shortletPageContentLeftContainerGlobalStyle">
//                       <div className="shortletPageContentLeftDescriptionTitle">
//                         Available documents
//                       </div>
//                       <ul className="shortletPageContentLeftDescriptionDocuments">
//                         {product.documents.map((item, i) => (
//                           <li
//                             className="shortletPageContentLeftDescriptionDocumentsItem"
//                             key={i}
//                           >
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                   {product?.policies && (
//                     <div className="shortletPageContentLeftDescription shortletPageContentLeftContainerGlobalStyle">
//                       <div className="shortletPageContentLeftDescriptionTitle">
//                         {product?.productType} policy
//                       </div>
//                       <div className="shortletPageContentLeftDescriptionPolicies">
//                         <p
//                           onClick={handleShowPolicy}
//                           className={
//                             hideFullPolicy
//                               ? "shortletPageContentLeftDescriptionPoliciesText"
//                               : "shortletPageContentLeftDescriptionPoliciesShow"
//                           }
//                         >
//                           {product?.policies}
//                         </p>
//                         {/* <div
//                         className="shortletPageContentLeftDescriptionPoliciesBtn"
//                         onClick={handleShowPolicy}
//                       >
//                         {hideFullPolicy ? "See more" : "See less"}
//                       </div> */}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 {!!advert?.length && (
//                   <div className="shortletPageContentRight">
//                     <Advert advert={advert} currency={currency} />
//                   </div>
//                 )}
//               </div>
//               {!!product?.videos?.length && (
//                 <div className="shortletPageContentLeftImagesContainer shortletPageContentLeftContainerGlobalStyle">
//                   <div className="shortletPageContentLeftImagesContainerDisplay display">
//                     <video
//                       src={`${product?.videos[targetVideo].media}`}
//                       onContextMenu={(e) => e.preventDefault()}
//                       ref={videoRef}
//                       alt="view"
//                       preload="auto"
//                       autoPlay={
//                         playingVideo === product?.videos[targetVideo].media
//                           ? true
//                           : false
//                       }
//                       loop
//                       playsInline
//                       loading="lazy"
//                       className="displayVideo"
//                     >
//                       {" "}
//                     </video>
//                     <div
//                       className="displayControl"
//                       onClick={handleControl(
//                         product?.videos[targetVideo].media
//                       )}
//                     >
//                       {playingVideo ? <IoPause /> : <IoPlay />}
//                     </div>

//                     {product?.videos?.length > 1 && (
//                       <div
//                         className="shortletPageContentLeftImagesContainerDisplayArrow shortletPageContentLeftImagesContainerDisplayLeftArrow"
//                         onClick={prevVideoItem}
//                       >
//                         <PiArrowLeft />
//                       </div>
//                     )}
//                     {product?.videos?.length > 1 && (
//                       <div
//                         className="shortletPageContentLeftImagesContainerDisplayArrow shortletPageContentLeftImagesContainerDisplayRightArrow"
//                         onClick={nextVideoItem}
//                       >
//                         <PiArrowRight />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//               {product?.marketingType === "Rent" && (
//                 <Calendar {...calendarProps} />
//               )}
//               {product?.marketingType === "Rent" && (
//                 <div className="makeReservation" onClick={handleProceedToChat}>
//                   {product?.productType === "Automobile"
//                     ? "Hire this car now "
//                     : isAdmin
//                     ? "Make a reservation for someone."
//                     : "Make your reservation now"}
//                 </div>
//               )}
//               {product?.productType !== "Automobile" &&
//                 !!product?.recommendations?.length && (
//                   <PopularResidence {...popularProps} />
//                 )}
//               {product?.productType === "Automobile" &&
//                 !!product?.recommendations?.length && (
//                   <PopularAutos {...popularAutoProps} />
//                 )}

//               <ProductStickyFooter icons={icons} phone={product?.phone} />
//               <CheckoutUpdate {...proceedToChatProps} />
//             </div>
//           </>
//         ) : (
//           <EmptyDataPage
//             message="Error loading product"
//             title="Contact admin"
//           />
//         )}
//       </Suspense>
//       <PictureSlideModal {...mediaModalProps} />
//       <UpdateProduct
//         open={update}
//         handleClose={handleUpdateProduct}
//         title={"Update"}
//         isAdmin={isAdmin}
//         isAutomobile={product?.productType === "Automobile" ? true : false}
//         locations={locations}
//         productType={product?.productType}
//         accountId={accountId}
//         autoCategories={autoCategories}
//         buildingCategories={buildingCategories}
//         updateProduct={product}
//       />
//       <TheConfirmationMessage {...theConfirmationMessageProps} />
//       <TheConfirmationMessage {...theWhatsappProps} />
//       <TheFooter token={true} />
//     </>
//   );
// };

// export default StorePage;
