// import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
// import {
//   appBarStyle,
//   arrowStyle,
//   toolStyle,
// } from "../../utilities-config/style";
// import { IoArrowBack } from "react-icons/io5";
// import InputComponent from "../formComponent/InputComponent";
// import TextAreaComponent from "../formComponent/TextAreaComponent";
// import SelectComponent from "../formComponent/SelectComponent";
// import CalendarSelectComponent from "../formComponent/CalendarSelectComponent";
// import { useDispatch } from "react-redux";
// import { productCrud } from "../../redux/actions/products.action";
// import CheckComponent from "../formComponent/CheckBoxComponent";
// import MultipleSelect from "../formComponent/MultipleSelect";
// import TheMediaModal from "../TheMediaModal";
// import TimeComponent from "../formComponent/TimeComponent";
// import ImageUpload from "../ImageUpload";
// import ArrayAndAdd from "../formComponent/ArrayAndAdd";

// const UpdateProduct = ({
//   open,
//   handleClose,
//   isAdmin,
//   title,
//   isAutomobile,
//   locations,
//   productType,
//   accountId,
//   autoCategories,
//   buildingCategories,
//   updateProduct,
// }) => {
//   const dispatch = useDispatch();

//   // const dispatch = useDispatch()
//   const productTitle = useRef("");
//   const shortDescription = useRef("");
//   const fullDescription = useRef("");
//   const bedrooms = useRef(0);
//   const bathrooms = useRef(0);
//   const toilets = useRef(0);
//   const parking = useRef(0);
//   const price = useRef(0);
//   const [live, setLive] = useState("Draft");
//   const [country, setCountry] = useState("");
//   // const [newCategory, setNewCategory] = useState(false)
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [newCategories, setNewCategories] = useState([]);
//   const [checkInDates, setCheckInDates] = useState([]);
//   const [neighborhoods, setNeighborhoods] = useState([]);
//   const [citiesAndNeighbors, setCitiesAndNeighbors] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [countries, setCountries] = useState([]);
//   // const [adverts, setAdverts] = useState([]);
//   // const [recommendations, setRecommendations] = useState([]);
//   // const [openAdverts, setOpenAdverts] = useState(false);
//   // const [openRecommendations, setOpenRecommendations] = useState(false);
//   const [videos, setVideos] = useState([]);
//   const [openBanner, setOpenBanner] = useState(false);
//   const [bannerImage, setBannerImage] = useState(undefined);
//   const [openMediaFiles, setOpenMediaFiles] = useState(false);
//   const [openVideoFiles, setOpenVideoFiles] = useState(false);
//   const [checkInTime, setCheckInTime] = useState(null);
//   const [checkOutTime, setCheckOutTime] = useState(null);
//   const [images, setImages] = useState([]);
//   const [city, setCity] = useState("");
//   const [neighborhood, setNeighborhood] = useState("");
//   const [marketingType, setMarketingType] = useState("Rent"); // not added to form
//   const [priceDependent, setPriceDependent] = useState("Day"); // not added to form
//   const handlePrice = (e) => (price.current = e.target.value);
//   const handleDiscount = (e) => (discount.current = e.target.value);
//   const handleBathroom = (e) => (bathrooms.current = e.target.value);
//   const handleCarPark = (e) => (parking.current = e.target.value);
//   const handleFullDescription = (e) =>
//     (fullDescription.current = e.target.value);
//   const handleTaxRate = (e) => (taxRate.current = e.target.value);
//   const handleBedroom = (e) => (bedrooms.current = e.target.value);
//   const handleToilets = (e) => (toilets.current = e.target.value);
//   const handleShared = (e) => setShared(e.target.checked);
//   const handleFurnishing = (e) => setFurnished(e.target.checked);
//   const handleTaxable = (e) => setTaxable(e.target.checked);
//   const handleGym = (e) => setGym(e.target.checked);
//   const handleTennis = (e) => setTennis(e.target.checked);
//   const handleCinema = (e) => setCinema(e.target.checked);
//   const handleSwimmingPool = (e) => setSwimmingPool(e.target.checked);
//   const handlePolicy = (e) => (policies.current = e.target.value);
//   const handleMarketingType = (e) => setMarketingType(e.target.value);
//   const handlePriceDependent = (e) => setPriceDependent(e.target.value);
//   const handleOtherFeatures = (e) => (otherFeatures.current = e.target.value);

//   const handleLive = (e) => setLive(e.target.value);
//   // const handleSet = ()=> setNewCategory(prev=>!prev)
//   // const handleNeighborhood = (e) => setNeighborhood(e.target.value);
//   // const handleCity = (e) => {
//   //   let search = e.target.value;
//   //   setCity(e.target.value);
//   //   let found = citiesAndNeighbors.find((x) => x.name === search);
//   //   if (!!found?.neighborhood?.length) {
//   //     for (let item of found?.neighborhood) {
//   //       setNeighborhoods((prev) => [...prev, item]);
//   //     }
//   //   }
//   // };
//   // const onceCount = useRef(true);
//   // useEffect(() => {
//   //   if (!!locations?.length && onceCount.current && open) {
//   //     for (let item of locations) {
//   //       setCountries((prev) => [...prev, item.country]);
//   //     }
//   //     return () => (onceCount.current = false);
//   //   }
//   // }, [locations, open]);
//   // const handleCountry = (e) => {
//   //   let search = e.target.value;
//   //   setCountry(e.target.value);
//   //   let found = locations.find((x) => x.country === search);

//   //   setCitiesAndNeighbors(found.cities);
//   //   for (let item of found.cities) {
//   //     setCities((prev) => [...prev, item.name]);
//   //   }
//   // };

//   const handleNeighborhood = (e) => {
//     let search = e.target.value;
//     if (search !== "Select neighborhood") {
//       setNeighborhood(search);
//     }
//   };
//   const handleCity = (e) => {
//     let search = e.target.value;
//     if (search !== "Select city") {
//       setCity(e.target.value);
//       let found = citiesAndNeighbors.find((x) => x.name === search);
//       if (!!found?.neighborhood?.length) {
//         for (let item of found?.neighborhood) {
//           setNeighborhoods((prev) => [...prev, item]);
//         }
//       }
//     }
//   };
//   useEffect(() => {
//     if (!!locations?.length) {
//       for (let item of locations) {
//         setCountries((prev) => [...prev, item.country]);
//       }
//     }
//   }, [locations]);
//   const handleCountry = (e) => {
//     let search = e.target.value;
//     if (search !== "Select country") {
//       setCountry(e.target.value || e);
//       let found = locations.find((x) => x.country === search);

//       setCitiesAndNeighbors(found.cities);
//       for (let item of found.cities) {
//         setCities((prev) => [...prev, item.name]);
//       }
//     }
//   };

//   const once = useRef(true);
//   useEffect(() => {
//     if ((once.current && updateProduct, open)) {
//       if (updateProduct?.location?.country) {
//         let found = locations.find(
//           (x) => x.country === updateProduct?.location?.country
//         );

//         setCitiesAndNeighbors(found.cities);
//         for (let i = 0; found.cities > i; i++) {
//           setCities((prev) => [...prev, found.cities[i]]);
//         }
//         for (let item of found.cities) {
//           setCities((prev) => [...prev, item.name]);
//         }
//       }
//       if (updateProduct?.location?.city) {
//         setCity(updateProduct?.location?.city);
//         let found = citiesAndNeighbors.find(
//           (x) => x.name === updateProduct?.location?.city
//         );
//         if (!!found?.neighborhood?.length) {
//           for (let item of found?.neighborhood) {
//             setNeighborhoods((prev) => [...prev, item]);
//           }
//         }
//       }
//       return () => (once.current = false);
//     }
//   }, [city, citiesAndNeighbors, updateProduct, country, locations, open]);
//   const handleProductTitle = (e) => (productTitle.current = e.target.value);
//   const handleShortDescription = (e) =>
//     (shortDescription.current = e.target.value);

//   // useEffect(() => {
//   //   if (updateProduct && open) {
//   //     // category: selectedCategories,
//   //     setMarketingType(updateProduct?.marketingType);
//   //     setPriceDependent(updateProduct?.priceDependent);
//   //     setLive(updateProduct?.live ? "Live" : "Draft");
//   //     fullDescription.current = updateProduct?.description;
//   //     shortDescription.current = updateProduct?.shortDescription;
//   //     setCountry(updateProduct?.location?.country);
//   //     setCity(updateProduct?.location?.city);
//   //     setNeighborhood(updateProduct?.location?.neighborhood);
//   //     productTitle.current = updateProduct?.title;
//   //     price.current = updateProduct?.price;
//   //     setTaxable(updateProduct?.taxable);
//   //     setDocuments(updateProduct?.documents);
//   //     setBannerImage(updateProduct?.bannerImage);
//   //     setImages(updateProduct?.images);
//   //     setVideos(updateProduct?.videos);
//   //     taxRate.current = updateProduct?.taxRate;
//   //     discount.current = updateProduct?.discount;
//   //     setCheckInDates(updateProduct?.unavailableDates);
//   //     policies.current = updateProduct?.policies;
//   //     otherFeatures.current = updateProduct?.features?.otherFeatures;
//   //     bedrooms.current = updateProduct?.features.bedrooms;
//   //     toilets.current = updateProduct?.features.toilets;
//   //     bathrooms.current = updateProduct?.features.bathrooms;
//   //     parking.current = updateProduct?.features.parking;
//   //     setShared(updateProduct?.features.shared);
//   //     setGym(updateProduct?.features.gym);
//   //     setFurnished(updateProduct?.features.furnished);
//   //     setSwimmingPool(updateProduct?.features.swimmingPool);
//   //     setTennis(updateProduct?.features.tennis);
//   //     setCinema(updateProduct?.features.cinema);
//   //     setCheckInTime(updateProduct?.checkInTime);
//   //     setCheckOutTime(updateProduct?.checkOutTime);
//   //     setLight(updateProduct?.features?.light);
//   //     setSmartTV(updateProduct?.features?.smartTV);
//   //     setDstv(updateProduct?.features?.dstv);
//   //     setInternet(updateProduct?.features?.features);
//   //     setKeepingService(updateProduct?.features?.updateProduct);
//   //     setSecurity(updateProduct?.features?.security);
//   //     setNetflix(updateProduct?.features?.netflix);
//   //     setGaming(updateProduct?.features?.gaming);
//   //     setSnooker(updateProduct?.features?.snooker);
//   //     setSmartHome(updateProduct?.features?.smartHome);
//   //   }
//   // }, [updateProduct, open]);
//   const calendarProps = useMemo(
//     () => ({
//       unavailableDates: checkInDates,
//       selection: true,
//       setCheckInDates,
//       title: "Unavailable days",
//       isUser: false,
//     }),
//     [checkInDates]
//   );

//   function sendToServer(e) {
//     e.preventDefault();

//     // const data = {
//     //   admin: isAdmin && accountId,
//     //   addedBy: accountId,
//     //   crud: updateProduct?._id ? "UPDATE" : "CREATE",
//     //   productId: updateProduct?._id,
//     //   productType, //String
//     //   category: selectedCategories,
//     //   newCategories,
//     //   marketingType,
//     //   checkInTime,
//     //   checkOutTime,
//     //   priceDependent,
//     //   documents,
//     //   live: live === "Live" ? true : false,
//     //   description: fullDescription.current,
//     //   shortDescription: shortDescription.current,
//     //   location: {
//     //     country: country === "Select country" ? "" : country,
//     //     city: city === "Select city" ? "" : city,
//     //     neighborhood:
//     //       neighborhood === "Select neighborhood" ? "" : neighborhood,
//     //   },
//     //   title: productTitle.current,
//     //   price: price.current,
//     //   taxable,
//     //   taxRate: taxRate.current,
//     //   discount: discount.current,
//     //   unavailableDates: checkInDates,
//     //   itemPolicies: policies.current,
//     //   bannerImage,
//     //   images,
//     //   videos,
//     //   features
//     // };
//     // dispatch(productCrud(data));
//     // handleClose();
//     // setBannerImage(null);
//     // setImages([]);
//     // setCheckInDates([]);
//   }
//   const handleCloseBanner = () => setOpenBanner((prev) => !prev);

//   const handleCloseMediaFiles = () => setOpenMediaFiles((prev) => !prev);
//   const handleCloseVideoFiles = () => setOpenVideoFiles((prev) => !prev);
//   // const handleCloseAdverts = () => setOpenAdverts((prev) => !prev);
//   // const handleCloseRecommendations = () =>
//   //   setOpenRecommendations((prev) => !prev);

//   const features = [
//     {
//       placeholder: "Tennis court",
//       defaultValue: updateProduct?.features?.tennis,
//       required: false,
//       title: "Tennis court",
//       display: isAutomobile ? false : true,
//       onChange: handleTennis,
//       showLabel: true,
//     },
//     {
//       placeholder: "furnished",
//       defaultValue: updateProduct?.features?.furnished,
//       required: false,
//       title: "Furnished",
//       display: isAutomobile ? false : true,
//       onChange: handleFurnishing,
//       showLabel: true,
//     },
//     {
//       placeholder: "Swimming pool",
//       defaultValue: updateProduct?.features?.swimmingPool,
//       required: false,
//       title: "Swimming pool",
//       display: isAutomobile ? false : true,
//       onChange: handleSwimmingPool,
//       showLabel: true,
//     },
//     {
//       placeholder: "Shared apartment",
//       defaultValue: updateProduct?.features?.shared,
//       required: false,
//       title: "Shared apartment",
//       display: isAutomobile ? false : productType === "Property" && true,
//       onChange: handleShared,
//       showLabel: true,
//     },
//     {
//       placeholder: "Gym house",
//       defaultValue: updateProduct?.features?.gym,
//       required: false,
//       title: "Gym house",
//       display: isAutomobile ? false : true,
//       onChange: handleGym,
//       showLabel: true,
//     },
//     {
//       placeholder: "Cinema",
//       defaultValue: updateProduct?.features?.cinema,
//       required: false,
//       title: "Cinema",
//       display: isAutomobile ? false : true,
//       onChange: handleCinema,
//       showLabel: true,
//     },

//   ];

//   return (
//     <>
//       <>
//         {/* <AppBar sx={appBarStyle}>
//           <Toolbar sx={toolStyle}>
//             <div onClick={handleClose} className="modalBack">
//               <IoArrowBack style={arrowStyle} />
//               <span className="headerRightSection">{title} </span>
//             </div>
//           </Toolbar>
//         </AppBar> */}
//         <div className="productPage">
//           <form className="productPageForm" onSubmit={sendToServer}>
//             <div className="productPageFormSection1">
//               <InputComponent
//                 type={"text"}
//                 placeholder="Name"
//                 defaultValue={productTitle.current}
//                 title="Product name"
//                 showLabel={true}
//                 required={true}
//                 display={true}
//                 onChange={handleProductTitle}
//               />

//               <MultipleSelect
//                 name="Select category"
//                 data={isAutomobile ? autoCategories : buildingCategories}
//                 display={true}
//                 selectedItems={selectedCategories}
//                 setSelectedItems={setSelectedCategories}
//                 newItems={newCategories}
//                 setNewItems={setNewCategories}
//               />
//             </div>
//             <div className="productPageFormSectionImage">
//               <div className="productPageFormSectionImageTitle">
//                 Product banner
//               </div>

//               <ImageUpload
//                 isSingle={true}
//                 media={bannerImage}
//                 display={true}
//                 filesFor={"banner"}
//                 local={true}
//                 htmlFor={"banner"}
//                 isImage={true}
//                 title={""}
//                 btnText={bannerImage ? "Change image" : "Click to add image"}
//                 isVideo={false}
//                 setMedia={setBannerImage}
//                 productId={updateProduct?._id}
//                 accountId={updateProduct?._id}
//               />
//             </div>
//             <div className="productPageFormSectionImage">
//               <div className="productPageFormSectionImageTitle">
//                 More images
//               </div>
//               <ImageUpload
//                 filesFor={"images"}
//                 local={true}
//                 isSingle={false}
//                 media={images}
//                 display={true}
//                 htmlFor={"images"}
//                 title={""}
//                 isImage={true}
//                 isVideo={false}
//                 btnText={"Add more files. Images only"}
//                 setMedia={setImages}
//                 productId={updateProduct?._id}
//                 accountId={updateProduct?._id}
//               />
//             </div>
//             <div className="productPageFormSectionImage">
//               <div className="productPageFormSectionImageTitle">
//                 Video clips
//               </div>
//               <ImageUpload
//                 filesFor={"images"}
//                 local={true}
//                 htmlFor={"videos"}
//                 isSingle={false}
//                 media={videos}
//                 display={true}
//                 title={""}
//                 isVideo={true}
//                 btnText={"Add video clips. videos only"}
//                 setMedia={setVideos}
//                 productId={updateProduct?._id}
//                 accountId={updateProduct?._id}
//               />
//             </div>
//             <div className="productPageFormSection3 priceSection">
//               <SelectComponent
//                 name={"Market type"}
//                 required={true}
//                 placeholder={"Market type"}
//                 options={["Select product market type", "Sale", "Rent"]}
//                 defaultValue={marketingType}
//                 handleChangeSelect={handleMarketingType}
//                 display={true}
//                 showLabel={true}
//                 title="Market type"
//               />
//               <InputComponent
//                 type={"number"}
//                 placeholder="Price"
//                 defaultValue={price.current}
//                 title="Price"
//                 showLabel={true}
//                 display={true}
//                 required={true}
//                 min={1000}
//                 max={100000000000}
//                 onChange={handlePrice}
//               />
//               <SelectComponent
//                 name={"Rent validity period"}
//                 required={true}
//                 placeholder={"Rent validity period"}
//                 options={["Select period", "Day", "Night", "Month", "Year"]}
//                 defaultValue={priceDependent}
//                 handleChangeSelect={handlePriceDependent}
//                 display={marketingType === "Rent" ? true : false}
//                 showLabel={true}
//                 title="Rent validity period"
//               />
//               <InputComponent
//                 type={"number"}
//                 placeholder="discount"
//                 defaultValue={discount.current}
//                 title="discount"
//                 showLabel={true}
//                 display={true}
//                 required={true}
//                 min={0}
//                 max={10000000}
//                 onChange={handleDiscount}
//               />
//             </div>
//             <div className="productPageFormSection3">
//               <CheckComponent
//                 labelColor={{ color: "#121417" }}
//                 placeholder={"Taxable"}
//                 defaultValue={taxable}
//                 required={false}
//                 title="Taxable"
//                 display={true}
//                 onChange={handleTaxable}
//                 showLabel={true}
//               />
//               <InputComponent
//                 type={"number"}
//                 placeholder="Tax rate in percentage"
//                 defaultValue={taxRate.current}
//                 title="Tax rate in percentage"
//                 showLabel={true}
//                 display={taxable ? true : false}
//                 required={true}
//                 min={1}
//                 max={10000000}
//                 onChange={handleTaxRate}
//               />
//             </div>

//             <div className="productPageFormSection2">
//               <TextAreaComponent
//                 defaultValue={shortDescription.current}
//                 onChange={handleShortDescription}
//                 display={true}
//                 placeholder={"Short description"}
//                 name={"Short description"}
//                 rows={4}
//                 required={true}
//                 title="Short description"
//               />
//               <TextAreaComponent
//                 defaultValue={fullDescription.current}
//                 onChange={handleFullDescription}
//                 display={true}
//                 required={true}
//                 placeholder={"Full description"}
//                 name={"Full description"}
//                 rows={4}
//                 title="Full description"
//               />
//             </div>

//             <div className="productPageFormSection3">
//               <SelectComponent
//                 name={"Country"}
//                 required={true}
//                 placeholder={"Country"}
//                 options={["Select country", ...countries]}
//                 defaultValue={updateProduct?.location?.country}
//                 handleChangeSelect={handleCountry}
//                 display={true}
//                 showLabel={true}
//                 title="Select country"
//               />

//               <SelectComponent
//                 name={"City"}
//                 required={true}
//                 placeholder={"City"}
//                 options={[`${city || "Select city"}`, ...cities]}
//                 defaultValue={updateProduct?.location?.city}
//                 handleChangeSelect={handleCity}
//                 display={country ? true : false}
//                 showLabel={true}
//                 title="Select city"
//               />

//               <SelectComponent
//                 name={"Neighborhood"}
//                 options={[
//                   `${neighborhood || "Select neighborhood"}`,
//                   ...neighborhoods,
//                 ]}
//                 required={true}
//                 placeholder={"Neighborhood"}
//                 defaultValue={updateProduct?.location?.neighborhood}
//                 handleChangeSelect={handleNeighborhood}
//                 display={city ? true : false}
//                 showLabel={true}
//                 title="Select neighborhood"
//               />
//             </div>

//             <div className="productPageFormSection3 ">
//               <InputComponent
//                 type={"number"}
//                 placeholder="Bedrooms"
//                 defaultValue={bedrooms.current}
//                 title="Bedrooms"
//                 showLabel={true}
//                 display={isAutomobile ? false : true}
//                 required={true}
//                 min={1}
//                 max={10}
//                 onChange={handleBedroom}
//               />
//               <InputComponent
//                 type={"number"}
//                 placeholder="Toilets"
//                 defaultValue={toilets.current}
//                 title="Toilets"
//                 showLabel={true}
//                 display={isAutomobile ? false : true}
//                 required={true}
//                 min={1}
//                 max={10}
//                 onChange={handleToilets}
//               />
//               <InputComponent
//                 type={"number"}
//                 placeholder="Bathroom"
//                 defaultValue={bathrooms.current}
//                 title="Bathroom"
//                 showLabel={true}
//                 display={isAutomobile ? false : true}
//                 required={true}
//                 min={1}
//                 max={10}
//                 onChange={handleBathroom}
//               />
//               <InputComponent
//                 type={"number"}
//                 placeholder="Car parking"
//                 defaultValue={parking.current}
//                 title="Car parking"
//                 showLabel={true}
//                 display={isAutomobile ? false : true}
//                 required={true}
//                 min={1}
//                 max={10}
//                 onChange={handleCarPark}
//               />
//             </div>
//             <div className="productPageFormSection3 productPageFormSection3Column">
//               <div className="productPageFormSection3Title">Features </div>

//               <div className="productPageFormSection3CheckBoxes">
//                 {features.map((item, i) => (
//                   <CheckComponent
//                     key={i}
//                     labelColor={{ color: "#121417" }}
//                     placeholder={item.placeholder}
//                     defaultValue={item.defaultValue}
//                     required={item.required}
//                     title={item.title}
//                     display={item.display}
//                     onChange={item.onChange}
//                     showLabel={item.showLabel}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="productPageFormSection3 ">
//               <TextAreaComponent
//                 defaultValue={otherFeatures.current}
//                 onChange={handleOtherFeatures}
//                 display={true}
//                 required={false}
//                 placeholder={"Other features"}
//                 name={"Other features"}
//                 rows={4}
//                 title="Other features"
//               />
//             </div>
//             <div className="productPageFormSection6">
//               <TextAreaComponent
//                 defaultValue={policies.current}
//                 onChange={handlePolicy}
//                 display={isAutomobile ? false : true}
//                 placeholder={"Property policies"}
//                 name={"Property policies"}
//                 rows={4}
//                 required={true}
//                 title="Property policies"
//               />{" "}
//             </div>
//             <div className="productPageFormSection6 arrayAndAddContainer">
//               <div className="arrayAndAddContainerTitle">
//                 Available documents
//               </div>
//               <ArrayAndAdd
//                 openInput={openDocuments}
//                 name={"Available documents"}
//                 value={documentItem}
//                 setValue={setDocumentItem}
//                 setInitial={setDocuments}
//                 setOpenInput={setOpenDocuments}
//                 initValue={documents}
//               />
//             </div>
//             {!isAutomobile && (
//               <div className="productPageFormSection4">
//                 <CalendarSelectComponent {...calendarProps} />
//               </div>
//             )}
//             {isAdmin && (
//               <div className="productPageFormSection3 priceSection">
//                 <SelectComponent
//                   name={"Product status"}
//                   required={true}
//                   placeholder={"Product status"}
//                   options={["Select product status", "Live", "Draft"]}
//                   defaultValue={live === "Live" ? "Live" : live}
//                   handleChangeSelect={handleLive}
//                   display={true}
//                   showLabel={true}
//                   title="Go live"
//                 />
//               </div>
//             )}
//             <button className="productFormBtn">
//               {updateProduct ? "Update" : "Submit"}
//             </button>
//           </form>
//         </div>
//       </>
//     </>
//   );
// };

// export default UpdateProduct;
