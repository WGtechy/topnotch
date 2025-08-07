import React, { useRef } from 'react'
import TheAvatar from '../TheAvatar'
import { PiArrowLeft, PiArrowRight } from 'react-icons/pi'

const Admin = ({items, selectedAdmin, handleSelectAdmin, adminAction}) => {
    const sliderScrollbarRef = useRef(null)
    const itemsRef = useRef(null)
    const scrollbarThumbRef = useRef(null)


const handleScrollThumb = e => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumbRef.current.offsetLeft;
        const maxThumbPosition = sliderScrollbarRef.current.getBoundingClientRect().width - scrollbarThumbRef.current.offsetWidth;
    const maxScrollLeft = itemsRef.current.scrollWidth - itemsRef.current.clientWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumbRef.current.style.left = `${boundedPosition}px`;
            itemsRef.current.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
  



const handleImageList = ()=>{
     // Show or hide slide buttons based on scroll position
    const maxScrollLeft = itemsRef.current.scrollWidth - itemsRef.current.clientWidth;

    const scrollPosition = itemsRef.current.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbarRef.current.clientWidth - scrollbarThumbRef.current.offsetWidth);
    scrollbarThumbRef.current.style.left = `${thumbPosition}px`;


}


const handleBack =()=>{
        const scrollAmount =( itemsRef.current.clientWidth * -1) / 4;
        itemsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
const handleForward =()=>{
        const scrollAmount = (itemsRef.current.clientWidth * 1 / 4);
        itemsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
    
  return (
    <>
    <div className="leftDashboardContentTitle">Admin</div>
    <div className="dashboardSplitLeftAdminsContainer" ref={itemsRef}>
      {!!items?.length ? (
        items.map((item, i) => (
          <div
            className="dashboardSplitLeftAdminsContainerItem"
            key={i}
            onClick={handleSelectAdmin(item)}
            
          >
            <TheAvatar
              name={item.name}
              img={item.picture}
              style={{ height: "7rem", width: "7rem" }}
            />
            <div className="dashboardSplitLeftAdminsContainerItemBottom">
              <div className="dashboardSplitLeftAdminsContainerItemBottomName">
                {item.name}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="dashboardSplitLeftAdminsContainerEmpty">
          No admin added yet
        </div>
      )}
      {items?.length > 1 && 2 && (
        <div
          className="dashboardSplitLeftAdminsContainerMore"
          onClick={handleSelectAdmin()}
        >
          Load more
        </div>
      )}
    </div>
    {items?.length > 3 && <div className="dashboardSplitLeftAdminsNavigation">
          <div
            className="dashboardSplitLeftAdminsNavigationLeft "
            onClick={handleBack}
          >
            <PiArrowLeft />
          </div>
          <div
            className="dashboardSplitLeftAdminsNavigationLeft"
            onClick={handleForward}
          >
            <PiArrowRight />
          </div>
        </div>}
    {selectedAdmin && (
      <div className="dashboardSplitLeftAdminsSelected">
        <div className="dashboardSplitLeftAdminsSelectedTitle">
          What do you want to do with {selectedAdmin.name}?
        </div>
        <div className="dashboardSplitLeftAdminsSelectedProfile">
          <TheAvatar
            name={selectedAdmin.name}
            img={selectedAdmin.picture}
            style={{ height: "2rem", width: "2rem", fontSize: '1rem' }}
          />
          <div className="dashboardSplitLeftAdminsSelectedProfileName">
            {selectedAdmin.name}
          </div>
        </div>
        <div className="dashboardSplitLeftAdminsSelectedActions">
          {adminAction.map((item, i) => (
            <div
              className="dashboardSplitLeftAdminsSelectedActionsItem"
              key={i}
              onClick={item.click}
              style={{ background: item.background }}
            >
             <span> <item.icon /></span> <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
  )
}

export default Admin