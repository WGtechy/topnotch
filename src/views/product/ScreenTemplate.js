import React, {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from "react";
// import { handleImageError } from "../../../utilities-config/imageFunction";

import ScreenLeftSection from "./ScreenLeftSection";
import ScreenRightSection from "./ScreenRightSection";

const ScreenTemplate = forwardRef(
  (
    {
      mediaFiles,
      product,
      isMobile,
      taxRate,
handleTourPayment,
      isAdmin,
      isManager,
      history,
      isProduct,
      currency,
      ctype,
      volume,
      postSaved,
      showDetail,
      productPage,
      account,
      index,
      toggleVolume,
      token,
      accountId,
      // selectedItemRef,
      cartCount,
      postId,
      totalLikes,
      postLikes,
      totalComments,
      disableAutoPlay,
    },
    ref
  ) => {
    const [track, setTrack] = useState(null);

    const mediaDescription = useRef("");
    const mediaName = useRef("");
    const shareContent = useCallback(() => {
      if (window.navigator.share) {
        let url = `${history.location.pathname}/${history.location?.search}`;
        navigator
          .share({
            url,
            title: product?.title,
            text: product?.description,
          })
          .then(() => {
            return;
          })
          .catch((error) => null);
      } else {
        // alert("Please don't forget to share");
        return null;
      }
    }, [product, history]);

    // useEffect(() => {
    //   if (media) {
    //     setTrack(mediaFiles[Number(media)]);
    //   } else {
    //     setTrack(null);
    //   }
    // }, [media, mediaFiles]);

    // const handleDeleteMedia = () => {
    //   dispatch();
    //   // postCRUD(
    //   //   {
    //   //     crud: "DELETE-MEDIA",
    //   //     postId: product?._id,
    //   //     target: product?.target?.postFor,
    //   //     targetId: product?.target?.targetId,
    //   //     mediaId: product?._id,
    //   //   },
    //   //   "DELETE-MEDIA"
    //   // )

    //   // setMediaFiles((prev) => {
    //   //   let newFiles = prev.filter((x) => x._id !== product._id);
    //   //   setPost((prev) => {
    //   //     return {
    //   //       ...prev,
    //   //       media: newFiles,
    //   //     };
    //   //   });
    //   //   return newFiles;
    //   // });
    // };

    useEffect(() => {
      if (product) {
        mediaName.current = product.title;
        mediaDescription.current = product.description;
      }
    }, [product]);

    const leftProps = useMemo(
      () => ({
        postId,
        product,
        totalLikes,
        postLikes,
        postSaved,
        totalComments,
        track,
        account,
        disableAutoPlay,
        currency,
        history,
        mediaFiles,
        handleTourPayment,
        volume,
        toggleVolume,
        accountId,
        setTrack,
        isMobile,
        cartCount,
      }),
      [
        product,
        track,
        currency,
        history,
        mediaFiles,
        handleTourPayment,
        postId,
        postSaved,
        totalLikes,
        account,
        postLikes,
        totalComments,
        disableAutoPlay,
        volume,
        toggleVolume,
        accountId,
        setTrack,
        isMobile,
        cartCount,
      ]
    );

    const rightProps = useMemo(
      () => ({
        product,
        track,
        history,
        cartCount,
        token,
        setTrack,
        taxRate,
        accountId,
        toggleVolume,
        isMobile,
        currency,
        shareContent,

        totalComments,
        totalLikes,
        postId,
      }),
      [
        product,
        history,
        shareContent,
        isMobile,
        setTrack,
        cartCount,
        taxRate,
        toggleVolume,
        totalComments,
        totalLikes,
        postId,
        accountId,
        currency,
        token,
        track,
      ]
    );

    const goBack = useCallback(() => {
      history.goBack();
    }, [history]);

    const productInfoSlide = useMemo(
      () => ({
        ctype,
        handleClose: goBack,
        parentDialog: true,
        product,
        currency,
        setTrack,
        totalLikes: product?.postId?.totalLikes || totalLikes || 0,
        postLikes: product?.postId?.postLikes || postLikes || 0,
        totalComments: product?.postId?.totalComments || totalComments || 0,
        postSaved: product?.postId?.postSaved || postSaved || 0,
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
        totalLikes,
        postLikes,
        totalComments,
        postSaved,
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
 
    const authrozationProps = useMemo(
      () => ({
        history,
        token,
        isMobile,
        ctype,
        handleClose: goBack,
      }),
      [history, token, isMobile, ctype, goBack]
    );

    return (
      <>
        <div
          className="homeContentScreenItem"
          ref={ref}
          data={postId}
          index={index + 1}
        >
          {!isProduct && <ScreenLeftSection {...leftProps} />}
          {showDetail && <ScreenRightSection {...rightProps} />}
        </div>
      </>
    );
  }
);

export default ScreenTemplate;
