import React, { useState } from "react";
import Image from "../Image";

const Template1 = ({
  title,
  description,
  list,
  src,
  whyUs,
  commitment,
  objectives,
  mission,
  vision,
  whoWeAreImage,
  whoWeAre,
}) => {
  const [showAllTextObj, setShowAllTextObj] = useState(false);
  const handleContent = () => setShowAllTextObj((prev) => !prev);

  return (
    <div className="template1">
      <div className="template1Content">
        <div className="template1ContentLeft">
          {title && <div className="template1ContentLeftTitle">{title}</div>}
          {description && (
            <div
              onClick={handleContent}
              className={
                showAllTextObj
                  ? "template1ContentLeftDescription "
                  : "template1ContentLeftDescription reduceVision"
              }
            >
              {description}
            </div>
          )}
          {/* {title && <div className="template1ContentLeftBtn">Read more</div>}
          {src && (
            <div className="template1ContentLeftImage">
              <Image src={src} alt={"banner image"} />
            </div>
          )} */}
        </div>
      </div>

      {vision && (
        <div className="template1Info">
          <div className="template1InfoTitle">Our vision</div>
          <div className="template1InfoDescription">{vision}</div>
        </div>
      )}
      {mission && (
        <div className="template1Info">
          <div className="template1InfoTitle">Our mission</div>
          <div className="template1InfoDescription">{mission}</div>
        </div>
      )}

      {!!objectives?.length && (
        <div className="template1Info">
          <div className="template1InfoTitle">Our objectives</div>
          <ul className="template1InfoContainer">
            {objectives.map((info, i) => (
              <li className="template1InfoContainerItem" key={i}>
                {info}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="template1Content2">
        <div className="template1Content2Bottom">
          <div className="template1Content2BottomTitle">{whoWeAre.title}</div>
          <div className="template1Content2BottomDescription">
            {whoWeAre.description}
          </div>
        </div>
      </div>

      <div className="template1Content2">
        <div className="template1Content2WhyUs">
          <div className="template1Content2WhyUsTitle">
            Why Choose Topnotch NG Ltd?
          </div>
          <ul className="template1Content2WhyUsItem">
            {whyUs.map((x, i) => (
              <li className="template1Content2WhyUsItemList" key={i}>
                <div className="template1Content2WhyUsItemListTitle">
                  {x.name}
                </div>
                <div className="template1Content2WhyUsItemListDescription">
                  {x.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Template1;
