import React, { forwardRef, useMemo, useRef, useState } from "react";
import { appBarStyle, arrowStyle, toolStyle } from "../utilities-config/style";
import { IoArrowBack } from "react-icons/io5";
import InputComponent from "./formComponent/InputComponent";
import TextAreaComponent from "./formComponent/TextAreaComponent";
import SelectComponent from "./formComponent/SelectComponent";
import Calendar from "./Calendar";
import CalendarSelectComponent from "./formComponent/CalendarSelectComponent";
import ButtonComponent from "./formComponent/ButtonComponent";
import { filesTemplate } from "../utilities-config/imageFunction";

const categories = ["Uncategorized"]
const countries = []
const neighborhoods = []
const states = []
const UpdateProductPage = ({ open, handleClose, title, isAutomobile }) => {
  const productName = useRef("");
  // const dispatch = useDispatch()
  const [localFiles, setLocalFiles] = useState([])
  const [serverFiles, setServerFiles] = useState([])
  const shortDescription = useRef("");
  const fullDescription = useRef("");
  const newCategory = useRef("");
  const bedroom = useRef("");
  const bathroom = useRef("");
  const carPark = useRef("");
  const pool = useRef("");
  const shared = useRef("");
  const furnishiing = useRef("");
  const [country, setCountry] = useState("")
  const price = useRef(0)
  const tax = useRef(0)
  const [duplicateUnavail, setDuplicateUnavail] = useState([
    // unavailableDates
  ]);

  const [checkInDate, setCheckInDate] = useState([])


  
  
  const policy = useRef("")
  const [newCountry, setNewCountry] = useState("");
  const [newState, setNewState] = useState("");
  const [newNeighborhood, setNewNeighborhood] = useState("");
  const [state, setState] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [category, setCategory] = useState("")
  const handlePrice = (e) => (price.current = e.target.value);
  const handleTax = (e) => (tax.current = e.target.value);
  const handleBathroom = (e) => (bathroom.current = e.target.value);
  const handleShared = (e) => (shared.current = e.target.value);
  const handleFurnishing = (e) => (furnishiing.current = e.target.value);
  const handleCarPark = (e) => (carPark.current = e.target.value);
  const handleFullDescription = (e) => (productName.current = e.target.value);
  const handleNewCategory = (e) => (newCategory.current = e.target.value);
  const handleNewNeighborhood = (e) => (setNewNeighborhood(e.target.value));
  const handleNewState = (e) => (setNewState(e.target.value));
  const handleBedroom = (e) => (bedroom.current = e.target.value);
  const handlePool = (e) => (pool.current = e.target.value);
  const handlePolicy = (e) => (policy.current = e.target.value);
  


  const handleNewCountry = (e) => (setNewCountry(e.target.value));
  const handleCountry = (e) => {
    setCountry(e.target.value)
    if(e.target.value !== "New country"){  
      // dispatch(getStates(e.target.value))
    } else {
      
      setState("New state")
      setNeighborhood("New neighborhood")
    }
  };
  const handleState = (e) => {
    setState(e.target.value)
    if(e.target.value !== "New state" || country !== "New country"){

      // dispatch(getNeighborhood(e.target.value))
    }
  };

  const handleNeighborhood = (e) => {
    setNeighborhood(e.target.value)
    if(e.target.value !== "New state" || country !== "New country"){

      // dispatch(getNeighborhood(e.target.value))
    }
  };
  const handleCategory = (e) => {
    setCategory(e.target.value)
  };
  const handleProductName = (e) => (productName.current = e.target.value);
  const handleShortDescription = (e) =>
    (shortDescription.current = e.target.value);

  const calendarProps = useMemo(
    () => ({ unavailableDates:duplicateUnavail,
              selection: true,
              setCheckInDate,
              title: 'Unavailable days'
    }),
    [duplicateUnavail]
  );

const sendToServer = ()=>{}
  return (
    <
    >
      {/* <AppBar sx={appBarStyle}>
        <Toolbar sx={toolStyle}>
          <div onClick={handleClose} className="modalBack">
            <IoArrowBack style={arrowStyle} />
            <span className="headerRightSection">{title} </span>
          </div>
        </Toolbar>
      </AppBar> */}
      <div className="updateProductPage">
        <form className="updateProductPageForm" onSubmit={sendToServer}>
          <div className="updateProductPageFormSectionImage">
            <div className="updateProductPageFormSectionImageTitle">Files</div>
            {filesTemplate({accept:[],
  localFiles,
  serverFiles,
  setLocalFiles,
  setServerFiles})}

           
          </div>
          <div className="updateProductPageFormSection1">
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
          <div className="updateProductPageFormSection2">
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
          <div className="updateProductPageFormSection3">
            <SelectComponent
            name={"Category"} 
            required={true} 
            placeholder={"Category"} 
            options={["Select category", "Create new category", ...categories]}
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
          <div className="updateProductPageFormSection3">
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
          <div className="updateProductPageFormSection3">

            <SelectComponent
            name={"State"} 
            required={true} 
            placeholder={"State"} 
            options={["Select state", "New state", ...states]}
            defaultValue={state}
            handleChangeSelect={handleState}
            display={country && !["New country", "Select Country"].includes(country) ? true : false}
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
          <div className="updateProductPageFormSection3">

              <SelectComponent
            name={"Neighborhood"} 
            required={true} 
            placeholder={"Neighborhood"} 
            options={["Select neighborhood", "New neighborhood", ...neighborhoods]}
            defaultValue={neighborhood}
            handleChangeSelect={handleNeighborhood}
            display={ state && !["New state", "Select state"].includes(state)   ? true : false}
            showLabel={true}
            title={"Select neighborhood"}
             />
              <InputComponent
              type={"text"}
              placeholder="New neighborhood"
              defaultValue={newNeighborhood}
              title="New neighborhood name"
              showLabel={true}
              display={newState && neighborhood === "New neighborhood" ? true : false}
              required={true}
              onChange={handleNewNeighborhood}
            />
          </div>
          <div className="updateProductPageFormSection5"> 
           
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
          <div className="updateProductPageFormSection3"> 
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
          <div className="updateProductPageFormSection6"> 
            <TextAreaComponent
              defaultValue={policy.current}
              onChange={handlePolicy}
              display={isAutomobile ? false : true}
              placeholder={"Property policy"}
              name={"Property policy"}
              rows={4}
              required={true}
              title={"Property policy"}
            /> </div>
          <div className="updateProductPageFormSection3 priceSection">
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
             </div>
          {!isAutomobile && <div className="updateProductPageFormSection4">
      <CalendarSelectComponent {...calendarProps} />
      </div>}
      <button className="productFormBtn">Proceed</button>
        </form>
      </div>
    </>
  );
};

export default UpdateProductPage;
