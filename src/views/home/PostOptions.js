// import { memo } from "react";
// import { mediaQuery } from "../../utilities-config/mediaSelector";
// import SwipeableDrawer from "../../bucket/SwipeableDrawer";

// const iOS =
//   typeof navigator !== "undefined" &&
//   /iPad|iPhone|iPod/.test(navigator.userAgent);

// const PostOptions = (props) => {
//   const {  openOptions, optionsArr, handler, setZIndex,
//     handleOverlayContainer } = props;
//   let arr = optionsArr

//   return (
//     <div>
//       <SwipeableDrawer
//       anchor={mediaQuery() === "mobile" ? "bottom" : "left"}
//         open={openOptions}
//         onClose={handler}
//         onOpen={handler}
//         disableBackdropTransition={!iOS}
//         disableDiscovery={iOS}
//         setZIndex={setZIndex}
// handleOverlayContainer={handleOverlayContainer}
//       >
//         <section className="regContainer">
//           <div className="postMenuContainerTitle">Post option</div>
//           <div className="postOptionBtns">
//             {arr.map(
//               (item, i) =>
//                 item.display && (
//                   <div className="postOptionBtn" key={i} onClick={item.click}>
//                     {item.name}  {item?.count && item?.count > 0 && <span className="postOptionsCount">{item?.count}</span>} 
//                   </div>
//                 )
//             )}
//           </div>
//         </section>
//       </SwipeableDrawer>
//     </div>
//   );
// };

// export default memo(PostOptions);
