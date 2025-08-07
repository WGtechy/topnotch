import React, { useRef } from "react";
import EmptyDataPage from "../../bucket/EmptyDataPage";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { loadingIcon } from "../../bucket/loading-components/loadingIcon";
const footerSpace = {
  // height: "8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: "2rem",
};
const HomeTemplate = ({
  isMobile,
  data,
  c,
  cardDisplayMobile,
  loading,
  cardDisplayWide,
}) => {
    const wideContainerRef = useRef();
  
        const handlePageBack = () => {
            const scrollAmount = (wideContainerRef.current.clientWidth * -1) / 4;
            wideContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            // pause autoplay
            // if(count > 0){
            //   setCount(prev=>1 - prev)
            // }
          };
          const handlePageForward = () => {
            const scrollAmount = (wideContainerRef.current.clientWidth * 1) / 4;
            wideContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            // if(count <= data?.length){
            //   setFocusItem(data[1 + count]?._id)
            //   setCount(prev=>1 + prev)
            // }
          };
   
  return (
    <>
        <div className="homeContent">
          {isMobile ? (
            <div className="homeContentScreen">
              {data.map((item, i) => {
                if (data.length === i + 1) {
                  return cardDisplayMobile({ item, i, ref: true });
                } else {
                  return cardDisplayMobile({ item, i });
                }
              })}
            </div>
          ) : (
            <div className="homePage" ref={wideContainerRef}>
              {data.map((item, i) => {
                if (data.length === i + 1) {
                  return cardDisplayWide({ item, i, ref: true });
                } else {
                  return cardDisplayWide({ item, i });
                }
              })}
            </div>
          )}
          <div className="homeContentScroll">
            <div
              className="homeContentScrollUp"
              onClick={handlePageBack}
            >
              <IoArrowBack />
            </div>
            <div
              className="homeContentScrollDown"
              onClick={handlePageForward}
            >
              <IoArrowForward />
            </div>
          </div>
        </div>
      { loading && (
        <div style={footerSpace}>{loadingIcon}</div>
      )}
    </>
  );
};

export default HomeTemplate;
