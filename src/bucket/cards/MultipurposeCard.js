import React from "react";
import TheAvatar from "../TheAvatar";
import {
  PiEnvelope,
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiPhone,
  PiStarFill,
} from "react-icons/pi";

const MultipurposeCard = ({
  name,
  img,
  rating,
  comment,
  title,
  type,
  social,
  background,
}) => {
  const style = { width: "3rem", height: "3rem" };
  const socialObj = [
    { link: social?.facebook, icon: PiFacebookLogo, className: "facebook" },
    { link: social?.linkedin, icon: PiLinkedinLogo, className: "linkedin" },
    { link: social?.instagram, icon: PiInstagramLogo, className: "instagram" },
    { link: social?.phone, icon: PiPhone, className: "phone" },
    { link: social?.email, icon: PiEnvelope, className: "email" },
  ];



  const rate = () => {
    switch (rating) {
      case 1:
        return (
          <div className="ratingContainer">
            <PiStarFill className="iconRating" />
          </div>
        );
      case 2:
        return (
          <div className="ratingContainer">
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />{" "}
          </div>
        );
      case 3:
        return (
          <div className="ratingContainer">
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />
          </div>
        );
      case 4:
        return (
          <div className="ratingContainer">
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />
          </div>
        );
      case 5:
        return (
          <div className="ratingContainer">
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />{" "}
            <PiStarFill className="iconRating" />
          </div>
        );
      default:
        return "state";
    }
  };
  return (
    <div
      style={{ background }}
      className={
        type === "team" ? " realtorCard multipurposeCard" : "multipurposeCard"
      }
    >
      <div className="multipurposeCardTop">
        <TheAvatar name={name} img={img} style={style} />
        <div className="multipurposeCardTopSide">
          {name && <div className="multipurposeCardTopSideName">{name}</div>}
          {title && <div className="multipurposeCardTopSideTitle">{title}</div>}
          {rating && rate()}
        </div>
      </div>
      <div className="multipurposeCardContent">
        <div className="multipurposeCardContentDescription">{comment}</div>
        {/* {type === "ratings" && (
          <div className="multipurposeCardContentRating">
            {rate()}
          </div>
        )} */}
        {type === "team" && (
          <div className="multipurposeCardContentSocial">
            {socialObj.map(
              (item, i) =>
                item?.link && (
                  <a
                    href={item.link}
                    className="multipurposeCardContentSocialItem"
                    key={i}
                  >
                    {" "}
                    <item.icon className={item.className} />
                  </a>
                )
            )}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipurposeCard;
