import { memo,  useState } from "react";
  import {IoClose } from "react-icons/io5";
import AppBar from "./dialog/AppBar";
import useUrlSearchParams from "../utilities-config/useUrlSearchParams";
import Dialog from "./dialog/Dialog";
import Toolbar from "./dialog/Toolbar";
// import { PropertSearch } from "./PropertSearch";
  const SearchSlide = (props) => {
    const {
      open,
      handleClose,
      locations,
      buildingCategories
    } = props;

    const {c} = useUrlSearchParams()
    const [page, setPage] = useState(0)
    const [currentData, setCurrentData] = useState([])

  const [content, setContent] = useState("")
  const handleContent = e=>setContent(e.target.value)

  const handleSubmit = e=>{
    e.preventDefault();
    // Dispatch search
  }

  const propertyProps = {
     placeholder: `Search ${c === "All" ? "" : c}`,
      locations,
      buildingCategories,
      page,
      setPage,
      productType: c === "All" ? "" : c,
      setCurrentData
  }

    return (
      <Dialog
        parentDialog={true}
        open={open}
        adjustFullscreen={true}
        onClose={handleClose}
      >
        <AppBar>
          <Toolbar>
            <div onClick={handleClose} className="modalBack">
              <IoClose className="arrowStyle" />
              <div className="headerLeftSection">
              <div>Search</div>
              <div style={{fontSize: '.7rem'}}>{c === "All" ? "" : c}</div>
              </div>
            </div>
                      {<form className="headerSearchBar" onSubmit={handleSubmit}><input type="search" onChange={handleContent} autoFocus={true} className="headerSearchBarInput"/></form>}
          </Toolbar>
          
        </AppBar>
       {/* {["Shortlet", "Hotel", "Property"].includes(c) ? <PropertSearch {...propertyProps} /> : <EmptyDataPage  message={"Search for a product"}/>} */}
      </Dialog>
    );
  };
  
  export default memo(SearchSlide);
  