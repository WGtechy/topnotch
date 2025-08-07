import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Image from "../Image";

const Template2 = ({
  name,
  description,
  list,
  img,
  btns
}) => {
  // const bgImg = { backgroundImage: "url(homeBanner1.jpg)" };

  return (
      <div className="servicesContent">
        <div className="servicesContentLeft">
          {name && <div className="servicesContentLeftTitle">{name}</div>}
          {description && (
            <div className="servicesContentLeftDescription reduceVision">
              {description}
            </div>
          )}
          {!btns?.array?.length && (
          <div className="servicesContentRightBtns">
              <Link to={btns?.link} className="servicesContentRightBtnsItem">
                  {btns?.name}
              </Link>
          </div>)}
          {!list?.length && !!btns?.array?.length && (
          <div className="servicesContentRightBtns">
            {btns?.array.map((item, i) => (
              <Link to={item?.link} className="servicesContentRightBtnsItem" key={i}>
                  {item?.name}
              
              </Link>
            ))}
          </div>)}
          {img && (
            <div className="servicesContentLeftImage">
              <Image src={img} alt={"banner image"} />
            </div>
          )}
        </div>
        {!!list?.length && (
          <ul className="servicesContentRight">
            {list.map((info, i) => (
              <li className="servicesContentRightItem" key={i}>
                <div className="servicesContentRightItemTitle">
                  {info.name}
                </div>
                <div className="servicesContentRightItemDescription">
                  {info.description}
                </div>
              
              </li>
            ))}
        {!!btns?.array?.length && (
          <div className="servicesContentRightBtns">
            {btns?.array.map((item, i) => (
              <Link to={item?.link} className="servicesContentRightBtnsItem" key={i}>
                  {item?.name}
              
              </Link>
            ))}
          </div>)}
          </ul>
        )}
      </div>
  );
};

export default Template2;
