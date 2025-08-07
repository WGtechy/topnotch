import React, { useCallback, useRef,  } from "react";
import { IoAdd, IoImage } from "react-icons/io5";
import { selectedMediaSlider } from "../utilities-config/mediaFileFunctions";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { mediaQuery } from "../utilities-config/mediaSelector";

const MediaForm = ({
  media,
  display,
  title,
  isSingle,
  setMedia,
  noEdit,
  setOpen,
  style,
  htmlFor,
  isVideo, isImage,
  btnText
}) => {
  // const [openMedia, setOpenMedia] = useState(false);

  const handleToggleMedia = () => {if(!noEdit){setOpen((prev) => !prev)}};
  // const imageUploadProps = {
  //   openSlideComponent: openMeetingFile,
    // haandleClose: ()=>setOpenMeetingFile(false),

    // isArray: true,
    // isPublic: false,
    // accountId,
    // cAccountId,
    // target: "User",
    // targetId: accountId,
    // title: "Meeting files",
    // selectedMediaArray: media,
    // setSelectedMediaArray: setMedia,
    // setSelectedMedia: setMedia,
  // };

  const handleDelete = useCallback(
    (i) => () => {
      setMedia((prev) => prev.filter((_, x) => x !== i));
    },
    [setMedia]
  );
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


  return display || display === undefined ? (
      <div className="media" style={style}>
        {title && title}
        {isSingle ? (
          <div className={media?.media || media ? "singleMediaContainer" : ""}>
            {media && (
              <img src={media?.media || media} className="singleMediaContainerImage" onContextMenu={(e) => e.preventDefault()} alt="item" loading="lazy" />
            )}
          </div>
        ) : (
          <div className="mediaContainer">
            {media?.length > 0 &&
              media.map((data, i) =>
                selectedMediaSlider({ data, isVideo, isImage, i, handleDelete, imageListRef, handleImageList})
              )}
          </div>
        )}
        {media?.length > 4 &&  mediaQuery() === "desktop" && <div className="sliderWrapperNavigation">
          <div
            className="sliderWrapperNavigationArrow sliderWrapperNavigationLeft"
            onClick={handleBack}
          >
            <PiArrowLeft />
          </div>
          <div
            className="sliderWrapperNavigationArrow sliderWrapperNavigationRight"
            onClick={handleForward}
          >
            <PiArrowRight />
          </div>
        </div>}
        <div className="mediaAdd" onClick={handleToggleMedia}>
              <IoImage className="addIcon" /> <div>{!!media?.length ? 'Click to add more file' : btnText || 'Click to add file'}</div>
            </div>
      </div>
  ) : null;
};

export default MediaForm
