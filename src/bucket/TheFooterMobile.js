import React from "react";
import TheAvatar from "./TheAvatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useUrlSearchParams from "../utilities-config/useUrlSearchParams";
import { IoBed, IoBusiness, IoBusinessOutline, IoCar, IoCart, IoPaperPlane, IoSettings, IoStorefront, IoVideocam } from "react-icons/io5";
import { useSelector } from "react-redux";


const TheFooterMobile = ({ accountId, firstName, surname, history, picture }) => {
  const {data: app} = useSelector(state=>state.app)
      const {c} = useUrlSearchParams()
      
      const handleToggleDrop = () => {
       history.push("/dashboard")
      }
      
    let categories = [
    { name: "All", icon: IoVideocam, link: "", display: app?._id },
    { name: "Shortlet", icon: IoBed, link: "shortlet", display: app?.allowShortlets },
    { name: "Property", icon: IoBusinessOutline, link: "property", display: app?.allowProperties },
    { name: "Product", icon: IoStorefront, link: "products", display: app?.allowProducts },
    { name: "Hotel", icon: IoBusiness, link: "hotel", display: app?.allowHotels },
    { name: "Interior", icon: IoBed, link: "interior", display: app?.allowInteriors },
    { name: "Automobile", icon: IoCar, link: "automobile", display: app?.allowAutomobiles },
  ];


  return (
    <div className="mobileFooter">
        <>
          <div className="mobileFooterLeft">
          <div className="mobileFooterLeftLink">
            {categories.map((item, i) => item.display && (
              <Link to={item?.name === "All" ? "/" :`/${item?.link}`} className={c === item?.name ? "mobileFooterLeftItem titleActive" : "mobileFooterLeftItem"} key={i}>
                {item?.name }
              </Link>
            ))}{" "}
            </div>
            {accountId && <div className="mobileFooterLeftAvatar">
              <TheAvatar
                firstName={firstName}
                surname={surname}
                imageURL={picture}
                click={handleToggleDrop}
                style={{ height: "2rem", width: "2rem" }}
              />
            </div>}
          </div>
        </>
     
    </div>
  );
};

export default TheFooterMobile;
