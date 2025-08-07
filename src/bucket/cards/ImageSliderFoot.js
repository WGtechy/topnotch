import { useCallback, useRef, useState } from "react";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { mediaQuery } from "../../utilities-config/mediaSelector";

const ImageSliderFoot = ({ images, title, handleImageClick }) => {
  const imageListRef = useRef(null);
  const sliderScrollbarRef = useRef(null);
  const scrollbarThumbRef = useRef(null);

  const handleScrollThumb = (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumbRef.current.offsetLeft;
    const maxThumbPosition =
      sliderScrollbarRef.current.getBoundingClientRect().width -
      scrollbarThumbRef.current.offsetWidth;
    const maxScrollLeft =
      imageListRef.current.scrollWidth - imageListRef.current.clientWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumbRef.current.style.left = `${boundedPosition}px`;
      imageListRef.current.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleImageList = () => {
    // Show or hide slide buttons based on scroll position
    const maxScrollLeft =
      imageListRef.current.scrollWidth - imageListRef.current.clientWidth;

    const scrollPosition = imageListRef.current.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbarRef.current.clientWidth -
        scrollbarThumbRef.current.offsetWidth);
    scrollbarThumbRef.current.style.left = `${thumbPosition}px`;
  };

  const handleBack = () => {
    const scrollAmount = (imageListRef.current.clientWidth * -1) / 4;
    imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const handleForward = () => {
    const scrollAmount = (imageListRef.current.clientWidth * 1) / 4;
    imageListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="imageSliderFoot">
      <div className="imageSliderFootWrapper">
        <ul className="imageList" ref={imageListRef} onScroll={handleImageList}>
          {images.map((item, i) => (
            // <div key={i} className="shortletPageImagesContainerArrayItem">
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={`${item.media}`}
              alt={title}
              onClick={handleImageClick(i)}
              // className="shortletPageImagesContainerArrayItemImage"
              className="imageItem"
              key={i}
              //
            />
            // </div>
          ))}
        </ul>
        {images?.length > 6 && mediaQuery() === "desktop" && <div className="sliderWrapperNavigation">
          <div
            className="shortletPageImagesContainerDisplayArrow shortletPageImagesContainerDisplayLeftArrow"
            onClick={handleBack}
          >
            <PiArrowLeft />
          </div>
          <div
            className="shortletPageImagesContainerDisplayArrow shortletPageImagesContainerDisplayRightArrow"
            onClick={handleForward}
          >
            <PiArrowRight />
          </div>
        </div>}
      </div>
      {images?.length > 7 && <div className="imageSliderFootScrollbar" ref={sliderScrollbarRef}>
        <div className="imageSliderFootScrollbarTrack">
          <div
            className="imageSliderFootScrollbarThumb"
            ref={scrollbarThumbRef}
            onMouseDown={handleScrollThumb}
          ></div>
        </div>
      </div>}
    </div>
  );
};

export default ImageSliderFoot;
