// import React, { useCallback, useState } from "react";
// import { IoTrash } from "react-icons/io5";
// import { SelectComponent } from ".";

// const containerStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
//   margin: "5px",
// };

// const nameStyle = {
//   fontSize: "0.7rem",
//   padding: "0 10px",
// };

// const ServicesTemplate = ({
//   selections,
//   options,
//   setSelections,
//   templateTitle,
//   firstTitle,
//   secondTitle,
//   display,
//   type,
//   isStream,
// }) => {
//   const [name, setName] = useState("");
//   const [template, setTemplate] = useState(false);

//   const handleRemoveItem = useCallback(
//     (item) => () => {
//         setSelections((init) => init.filter((dat) => dat.redirection !== item));
//     },
//     [setSelections]
//   );

//   const handlerNew = () => setTemplate((prev) => !prev);
//   const handleNameInput = (e) => setName(e.target.value);

//   const handleSave = () => {
//     if (name) {
//         setSelections((init) => [{ name}, ...init]);
      
//       setName("");
//       handlerNew();
//     }
//   };

//   return display ? (
//     <div className="inputContainer ">
//       <label className="inputContainer__label">
//         <div>{templateTitle}</div>
//       </label>
//       <div className="modalContainerArray">
//         {!template && (
//           <div className="modalContainerArrayNew" onClick={handlerNew}>
//            Add new
//           </div>
//         )}
//         {
//           selections?.length > 0 &&
//           selections.map((item, i) => (
//             <div className="inlineAvatarAndName" key={i}>
//               <div className="inlineAvatarAndNameDesc">
//                 <div> {item.name} </div>
//               </div>
//               <div
//                 className="deleteIcon"
//                 onClick={handleRemoveItem(item.redirection)}
//               >
//                 <IoTrash />{" "}
//               </div>
//             </div>
//           ))
//         }
//       </div>

//       {template ? (
//         <div
//           className="multipleFormElementContainerItemsItem"
//           style={containerStyle}
//         >
//           {options?.length > 0 ? (
//             <select
//               className="inputContainer__text"
//               required={true}
//               placeholder={name}
//               id={name}
//               onChange={(e) => handleNameInput(e)}
//             >
//               {options.map((item, index) => (
//                 <option key={index} value={item._id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <div className="inputContainer">
//               <label htmlFor={name}>
//                 <small style={nameStyle}>{firstTitle}</small>
//               </label>
//               <input
//                 placeholder={name}
//                 type="text"
//                 required={true}
//                 defaultValue={templateDisplay === "object" ? name : ""}
//                 autoComplete="off"
//                 min={0}
//                 onChange={(e) => handleNameInput(e)}
//                 title={firstTitle}
//                 id={name}
//                 name={name}
//                 className="inputContainer__text"
//               />
//             </div>
//           )}
//           {name.toLocaleLowerCase().search('youtube') !== -1 &&<div className="inputContainer">
//             <div className="display__row inputContainer__text">
//               <label htmlFor="switch">
//                 Embed URL and Live stream on this platform
//               </label>
//               <span className="switch" onChange={handleSwitch}>
//                 <input
//                   type="checkbox"
//                   id="switch"
//                   defaultValue={
//                     templateDisplay === "object" ? liveStream : false
//                   }
//                 />
//                 <label htmlFor="switch"></label>
//               </span>
//             </div>
//           </div>}
//             {name.toLocaleLowerCase().search('youtube') === -1 ?
//           <div className="inputContainer">
//             <label htmlFor={redirection}>
//               <small style={nameStyle}>{secondTitle}</small>
//             </label>
//             <input
//               placeholder={secondTitle}
//               type={type}
//               required={true}
//               defaultValue={
//                 templateDisplay === "object" ? redirection : ""
//               }
//               autoComplete="off"
//               min={0}
//               onChange={(e) => handleURLInput(e)}
//               title={secondTitle}
//               id={redirection}
//               name={redirection}
//               className="inputContainer__text"
//             />
//           </div> : liveStream ? 
//           <div className="inputContainer">
//             <label htmlFor={redirection}>
//               <small style={nameStyle}>YouTube video Id</small>
//             </label>
//             <input
//               placeholder={'Provide the YouTube video Id'}
//               type={'search'}
//               required={true}
//               defaultValue={
//                 templateDisplay === "object" ? redirection : ""
//               }
//               autoComplete="off"
//               min={0}
//               onChange={(e) => handleURLInput(e)}
//               title={'Provide the YouTube video Id'}
//               id={redirection}
//               name={redirection}
//               className="inputContainer__text"
//             />
//           </div> : <div className="inputContainer">
//             <label htmlFor={redirection}>
//               <small style={nameStyle}>{secondTitle}</small>
//             </label>
//             <input
//               placeholder={secondTitle}
//               type={type}
//               required={true}
//               defaultValue={
//                 templateDisplay === "object" ? redirection : ""
//               }
//               autoComplete="off"
//               min={0}
//               onChange={(e) => handleURLInput(e)}
//               title={secondTitle}
//               id={redirection}
//               name={redirection}
//               className="inputContainer__text"
//             />
//           </div>}
          
//           <div className="multipleFormElementContainerItemsItemContainer">
//             <div
//               className="multipleFormElementContainerItemsItemContainerBtn"
//               onClick={handleSave}
//             >
//               Add
//             </div>
//             <div
//               className="multipleFormElementContainerItemsItemContainerBtn"
//               onClick={handlerNew}
//             >
//               Close
//             </div>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   ) : null;
// };

// export default ServicesTemplate;
