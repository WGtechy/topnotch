import React, { useEffect, useRef, useState } from "react";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";

const PictureSlideModal = ({ open, handleClose, startIndex, images }) => {
  const [viewIndex, setViewIndex] = useState(0);
  const imageSllideRef = useRef(null);
  useEffect(() => {
    if (open) {
      setViewIndex(startIndex);
    }
  }, [startIndex, open]);

  const prevItem = () => {
    if (viewIndex === 0) {
      setViewIndex(images.length - 1);
    } else {
      setViewIndex((prev) => prev - 1);
    }
  };
  const nextItem = () => {
    if (viewIndex === images.length - 1) {
      setViewIndex(0);
    } else {
      setViewIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={open ? "overlay" : ""}>
      {open && (
        <div className="imageSlide" ref={imageSllideRef}>
          <div className="imageSlideContainer">
            <img
              onContextMenu={(e) => e.preventDefault()}
              className=" imageSlideContainerImage"
              alt={"display items"}
              src={`${images[viewIndex].media}`}
              // overlayImageView
            />
            <div className="imageSlideContainerFooter">
              <div
                className=" imageSlideContainerFooterLeft"
                onClick={prevItem}
              >
                <PiArrowLeft />
              </div>
              <div
                className="imageSlideContainerFooterClose"
                onClick={handleClose(0)}
              >
                Close
              </div>

              <div
                className="imageSlideContainerFooterRight"
                onClick={nextItem}
              >
                <PiArrowRight />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PictureSlideModal;
