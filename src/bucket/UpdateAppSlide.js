import React, { forwardRef, useMemo, useRef, useState } from "react";
import { appBarStyle, arrowStyle, toolStyle } from "../utilities-config/style";
import { IoArrowBack } from "react-icons/io5";
import InputComponent from "./formComponent/InputComponent";
import TextAreaComponent from "./formComponent/TextAreaComponent";
import { filesTemplate } from "../utilities-config/imageFunction";
import { useDispatch } from "react-redux";
import { productCrud } from "../redux/actions/products.action";
// import { useDispatch } from "react-redux";

const categories = ["Uncategorized"];
const countries = [];
const neighborhoods = [];
const states = [];

const UpdateAppSlide = ({
  open,
  handleClose,
  target,
  handleSubmit,
  homePageHomeContentTitle,
  homePageHomeContentDescription,
}) => {
  const dispatch = useDispatch();
  const productName = useRef("");
  // const dispatch = useDispatch()
  const [localFiles, setLocalFiles] = useState([]);
  const [serverFiles, setServerFiles] = useState([]);
  //   const [homePageHomeContentSubTitleSlide, setHomePageHomeContentSubTitleSlide] = useState([])

  const shortDescription = useRef("");
  const fullDescription = useRef("");
  const newCategory = useRef("");
  const bedroom = useRef("");
  const bathroom = useRef("");
  const carPark = useRef("");
  const pool = useRef("");
  const shared = useRef("");
  const furnishiing = useRef("");
  const [country, setCountry] = useState("");
  const price = useRef(0);
  const tax = useRef(0);
  const [duplicateUnavail, setDuplicateUnavail] = useState([
    // unavailableDates
  ]);

  const [checkInDates, setCheckInDates] = useState([]);

  const policy = useRef("");

  const handleImage = async (e) => {
    let mediaArray = [...e.target.files];
    const mediaData = new FormData();
    mediaData.append("crud", "CREATE");
    for (let mid of mediaArray) {
      mediaData.append("media", mid);
      // mediaData.append("productId", productId);
    }
    dispatch(productCrud(mediaData));
  };

  //   const submitNewToServer = async (e) => {
  //     const data = {};
  //     dispatch(productCrud(data));
  //   };

  //   const handleNewCountry = (e) => setNewCountry(e.target.value);
  //   const handleCountry = (e) => {
  //     setCountry(e.target.value);
  //     if (e.target.value !== "New country") {
  //       // dispatch(getStates(e.target.value))
  //     } else {
  //       setState("New state");
  //       setNeighborhood("New neighborhood");
  //     }
  //   };
  //   const handleState = (e) => {
  //     setState(e.target.value);
  //     if (e.target.value !== "New state" || country !== "New country") {
  //       // dispatch(getNeighborhood(e.target.value))
  //     }
  //   };

  //   const handleNeighborhood = (e) => {
  //     setNeighborhood(e.target.value);
  //     if (e.target.value !== "New state" || country !== "New country") {
  //       // dispatch(getNeighborhood(e.target.value))
  //     }
  //   };
  //   const handleCategory = (e) => {
  //     setCategory(e.target.value);
  //   };
  const handleHomePageHomeContentTitle = (e) =>
    (homePageHomeContentTitle.current = e.target.value);
  const handleHomePageHomeContentDescription = (e) =>
    (homePageHomeContentDescription.current = e.target.value);

  const handleShortDescription = (e) =>
    (shortDescription.current = e.target.value);

  const calendarProps = useMemo(
    () => ({
      unavailableDates: duplicateUnavail,
      selection: true,
      setCheckInDates,
      title: "Unavailable days",
    }),
    [duplicateUnavail]
  );

  const sendToServer = () => {};
  return (
    < >
      {/* <AppBar sx={appBarStyle}>
        <Toolbar sx={toolStyle}>
          <div onClick={handleClose} className="modalBack">
            <IoArrowBack style={arrowStyle} />
            <span className="headerRightSection">Update app </span>
          </div>
        </Toolbar>
      </AppBar> */}
      <div className="productPage">
        <form className="productPageForm" onSubmit={sendToServer}>
          {target === "homeVideos" && (
            <div className="productPageFormSectionImage">
              <div className="productPageFormSectionImageTitle">Files</div>
              {filesTemplate({
                accept: [],
                localFiles,
                serverFiles,
                setLocalFiles,
                setServerFiles,
              })}
            </div>
          )}

          {target === "homeContent" && (
            <div className="productPageFormSection1">
              <InputComponent
                type={"text"}
                placeholder="Box title"
                defaultValue={homePageHomeContentTitle.current}
                title="Box title"
                showLabel={true}
                required={true}
                display={true}
                onChange={handleHomePageHomeContentTitle}
              />
            </div>
          )}
          {target === "homeContent" && (
            <div className="productPageFormSection2">
              <TextAreaComponent
                defaultValue={homePageHomeContentDescription.current}
                onChange={handleHomePageHomeContentDescription}
                display={true}
                placeholder={"Box description"}
                name={"Box description"}
                rows={4}
                required={true}
                title={"Box description"}
              />
            </div>
          )}
          {/* <div className="productPageFormSection1">
            <InputComponent
              type={"text"}
              placeholder="Name"
              defaultValue={productName.current}
              title="Product name"
              showLabel={true}
              required={true}
              display={true}
              onChange={handleProductName}
            />
          </div>
          <div className="productPageFormSection2">
            <TextAreaComponent
              defaultValue={shortDescription.current}
              onChange={handleShortDescription}
              display={true}
              placeholder={"Short description"}
              name={"Short description"}
              rows={4}
              required={true}
              title={"Short description"}
            />
            <TextAreaComponent
              defaultValue={fullDescription.current}
              onChange={handleFullDescription}
              display={true}
              required={true}
              placeholder={"Full description"}
              name={"Full description"}
              rows={4}
              title={"Full description"}
            />
          </div>
          <div className="productPageFormSection3">
            <SelectComponent
              name={"Category"}
              required={true}
              placeholder={"Category"}
              options={[
                "Select category",
                "Create new category",
                ...categories,
              ]}
              defaultValue={category}
              handleChangeSelect={handleCategory}
              display={isAutomobile ? false : true}
              showLabel={true}
              title={"Select category"}
            />
            <InputComponent
              type={"text"}
              placeholder="New category"
              defaultValue={newCategory.current}
              title="New category name"
              showLabel={true}
              display={category === "Create new category" ? true : false}
              required={true}
              onChange={handleNewCategory}
            />
          </div>
          <div className="productPageFormSection3">
            <SelectComponent
              name={"Country"}
              required={true}
              placeholder={"Country"}
              options={["Select country", "New country", ...countries]}
              defaultValue={country}
              handleChangeSelect={handleCountry}
              display={isAutomobile ? false : true}
              showLabel={true}
              title={"Select country"}
            />
            <InputComponent
              type={"text"}
              placeholder="New country"
              defaultValue={newCountry.current}
              title="New country name"
              showLabel={true}
              display={country === "New country" ? true : false}
              required={true}
              onChange={handleNewCountry}
            />
          </div>
          <div className="productPageFormSection3">
            <SelectComponent
              name={"State"}
              required={true}
              placeholder={"State"}
              options={["Select state", "New state", ...states]}
              defaultValue={state}
              handleChangeSelect={handleState}
              display={
                country && !["New country", "Select Country"].includes(country)
                  ? true
                  : false
              }
              showLabel={true}
              title={"Select state"}
            />
            <InputComponent
              type={"text"}
              placeholder="New state"
              defaultValue={newState}
              title="New state name"
              showLabel={true}
              display={newCountry && state === "New state" ? true : false}
              required={true}
              onChange={handleNewState}
            />
          </div>
          <div className="productPageFormSection3">
            <SelectComponent
              name={"Neighborhood"}
              required={true}
              placeholder={"Neighborhood"}
              options={[
                "Select neighborhood",
                "New neighborhood",
                ...neighborhoods,
              ]}
              defaultValue={neighborhood}
              handleChangeSelect={handleNeighborhood}
              display={
                state && !["New state", "Select state"].includes(state)
                  ? true
                  : false
              }
              showLabel={true}
              title={"Select neighborhood"}
            />
            <InputComponent
              type={"text"}
              placeholder="New neighborhood"
              defaultValue={newNeighborhood}
              title="New neighborhood name"
              showLabel={true}
              display={
                newState && neighborhood === "New neighborhood" ? true : false
              }
              required={true}
              onChange={handleNewNeighborhood}
            />
          </div> */}
          {/* <div className="productPageFormSection5">
            <InputComponent
              type={"number"}
              placeholder="Bedroom"
              defaultValue={bedroom.current}
              title="Bedroom"
              showLabel={true}
              display={isAutomobile ? false : true}
              required={true}
              onChange={handleBedroom}
            />
            <InputComponent
              type={"number"}
              placeholder="Bathroom"
              defaultValue={bathroom.current}
              title="Bathroom"
              showLabel={true}
              display={isAutomobile ? false : true}
              required={true}
              min={1}
              max={10}
              onChange={handleBathroom}
            />
            <InputComponent
              type={"number"}
              placeholder="Car park"
              defaultValue={carPark.current}
              title="Car park"
              showLabel={true}
              display={isAutomobile ? false : true}
              required={true}
              min={1}
              max={10}
              onChange={handleCarPark}
            />
            <SelectComponent
              name={"Pool"}
              required={true}
              placeholder={"Pool"}
              options={["No", "Yes"]}
              defaultValue={furnishiing.current}
              handleChangeSelect={handlePool}
              display={isAutomobile ? false : true}
              showLabel={true}
              title={"Pool type"}
            />
          </div>
          <div className="productPageFormSection3">
            <SelectComponent
              name={"Shared apartment"}
              required={true}
              placeholder={"Shared"}
              options={["No", "Yes"]}
              defaultValue={shared.current}
              handleChangeSelect={handleShared}
              display={isAutomobile ? false : true}
              showLabel={true}
              title={"Shared type"}
            />
            <SelectComponent
              name={"Furnishing"}
              required={true}
              placeholder={"Furnishing"}
              options={["Furnished", "Unfurnished"]}
              defaultValue={furnishiing.current}
              handleChangeSelect={handleFurnishing}
              display={isAutomobile ? false : true}
              showLabel={true}
              title={"Furnishing type"}
            />
          </div>
          <div className="productPageFormSection6">
            <TextAreaComponent
              defaultValue={policy.current}
              onChange={handlePolicy}
              display={true}
              placeholder={"Property policy"}
              name={"Property policy"}
              rows={4}
              required={true}
              title={"Property policy"}
            />{" "}
          </div>
          <div className="productPageFormSection3 priceSection">
            <InputComponent
              type={"number"}
              placeholder="Price"
              defaultValue={price.current}
              title="Price"
              showLabel={true}
              display={true}
              required={true}
              min={1000}
              max={100000000000}
              onChange={handlePrice}
            />
            <InputComponent
              type={"number"}
              placeholder="tax"
              defaultValue={tax.current}
              title="tax"
              showLabel={true}
              display={true}
              required={true}
              min={10}
              max={10000000}
              onChange={handleTax}
            />
          </div> */}
          <button className="productFormBtn" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateAppSlide;
