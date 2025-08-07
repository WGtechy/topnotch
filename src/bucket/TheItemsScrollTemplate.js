import React, { useRef } from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const TheItemsScrollTemplate = (props) => {
    const {isMobile, disabled} = props
    const xref = useRef()

    const handleBack = () => {
        const scrollAmount = (xref.current.clientWidth * -1) / 4;
        xref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      };
      const handleForward = () => {
        const scrollAmount = (xref.current.clientWidth * 1) / 4;
        xref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      };
    
  return (
    <div className='scrollTemplate' ref={xref}>
    
    {!isMobile && !disabled && (
              <div
                className="scrollTemplateLeftScroll"
                onClick={handleBack}
              >
                <IoArrowBack className="scrollTemplateLeftScrollIcon" />
              </div>
          )}
    {props.children}
            {!isMobile && !disabled && (
              <div
                className="scrollTemplateRightScroll"
                onClick={handleForward}
              >
                <IoArrowForward className="scrollTemplateRightScrollIcon" />
              </div>
          )}
    </div>
  )
}

export default TheItemsScrollTemplate