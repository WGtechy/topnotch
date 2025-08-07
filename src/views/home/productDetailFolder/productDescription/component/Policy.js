import React from "react";
import { FaScaleBalanced } from "react-icons/fa6";

const Policy = ({ policies, handleClose }) => {
  return (
    <div className="productInfoPolicies">
      <span className="productInfoPoliciesTitle">
        <span className="productInfoPoliciesTitleIcon">
          {" "}
          <FaScaleBalanced />
        </span>
        Policies
      </span>
      <div className="productInfoPoliciesContent">
        {!!policies?.length &&
          policies.slice(0, 4).map((item, i) => (
            <div className="productInfoPoliciesContentItem" key={i}>
            <div className="productInfoPoliciesContentItemTitle" > {item.title} </div>
            <div className="productInfoPoliciesContentItemDescription reduceTex2" > {item.description} </div>
            </div>
          ))}
      </div>
      <div className="productInfoPoliciesBtn" onClick={handleClose}>
        See more policies
      </div>
    </div>
  );
};

export default Policy;
