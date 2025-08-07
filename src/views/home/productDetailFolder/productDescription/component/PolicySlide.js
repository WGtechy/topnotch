import { memo } from "react";
  import {IoClose } from "react-icons/io5";
  import AppBar from "../../../../../bucket/dialog/AppBar";
import Dialog from "../../../../../bucket/dialog/Dialog";
import Toolbar from "../../../../../bucket/dialog/Toolbar";
  const PolicySlide = (props) => {
    const {
      open,
      handleClose,
    parentDialog,
    policies
    } = props;
  
    return (
      <Dialog
        parentDialog={parentDialog}
        open={open}
        adjustFullscreen={true}
        onClose={handleClose}
      >
        <AppBar>
          <Toolbar>
            <div onClick={handleClose} className="modalBack">
              <IoClose className="arrowStyle" />
              <span className="headerLeftSection">Policies</span>
            </div>
          </Toolbar>
          
        </AppBar>
        <div className="productInfoPoliciesContent">
        {!!policies?.length &&
          policies.slice(0, 4).map((item, i) => (
            <div className="productInfoPoliciesContentItem" key={i}>
            <div className="productInfoPoliciesContentItemTitle" > {item.title} </div>
            <div className="productInfoPoliciesContentItemDescription" > {item.description} </div>
            </div>
          ))}
      </div>
      </Dialog>
    );
  };
  
  export default memo(PolicySlide);
  