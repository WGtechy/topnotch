import { memo } from "react";
  import {IoClose } from "react-icons/io5";
import AppBar from "../../../../../bucket/dialog/AppBar";
import Dialog from "../../../../../bucket/dialog/Dialog";
import Toolbar from "../../../../../bucket/dialog/Toolbar";
  const FeatureSlide = (props) => {
    const { 
      open,
      handleClose,
    parentDialog,
    features,
    } = props;
  
    return (
      <Dialog
        parentDialog={parentDialog}
        adjustFullscreen={true}
        open={open}
        onClose={handleClose}
      >
        <AppBar>
          <Toolbar>
            <div onClick={handleClose} className="modalBack">
              <IoClose className="arrowStyle" />
              <span className="headerLeftSection">Features</span>
            </div>
          </Toolbar>
          
        </AppBar>
        {!!features?.length && (
        <div className="productInfoFeaturesContent">
          {features
            .filter((x) => x.feature.active)
            .map(
              (feat, i) =>
                feat?.feature?.active && (
                  <div className="productInfoFeaturesContentItem" key={i}>
                    <div className="productInfoFeaturesContentItemTitle">
                      {feat.feature?.name}
                    </div>
                    {!!feat?.subFeatures?.length && (
                      <div className="productInfoFeaturesContentItemSub">
                        {feat.subFeatures.map(
                          (sub, i) =>
                            sub.name.active && (
                              <div
                                className="productInfoFeaturesContentItemSubItem"
                                key={i}
                              >
                                <div className="productInfoFeaturesContentItemSubItemTitle">
                                  {" "}
                                  {sub?.name?.name}{" "}
                                </div>
                                <div
                                      className="productInfoFeaturesContentItemSubItemSub"
                                    >
                                {!!sub.subFeatureItem.length &&
                                  sub.subFeatureItem.map((subItem, i) => (
                                   subItem?.active && <div
                                      className="productInfoFeaturesContentItemSubItemSubItem"
                                      key={i}
                                    >
                                      {" "}
                                      {subItem?.name}{" "}
                                    </div>
                                  ))}
                              </div>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>
                )
            )}
        </div>
      )}
      </Dialog>
    );
  };
  
  export default memo(FeatureSlide);
  