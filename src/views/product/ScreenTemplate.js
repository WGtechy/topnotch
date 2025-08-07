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
