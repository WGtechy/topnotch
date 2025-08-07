import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import TheHeader from "./TheHeader";
import TheContent from "./TheContent";
import useMediaQuery from "../utilities-config/useMediaQuery";
import TheFooterMobile from "./TheFooterMobile";
import { getCartCount, personalProfile } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getApp } from "../redux/actions/app.actions";

const TheLayout = ({ account, token, data, ...props }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const {cartCount} = useSelector(state=>state.cart)

  const [currency, setCurrency] = useState({
    symbol: "₦",
    value: 1,
    name: "Naira",
  });
  const isMobile = useMediaQuery();
  const currencies = useMemo(
    () => [
      {
        symbol: "₦",
        value: 1,
        name: "Naira",
      },
      {
        symbol: "$",
        value: data?.settings?.currencies?.USD,
        name: "USD",
      },
      {
        symbol: "£",
        value: data?.settings?.currencies?.pounds,
        name: "Pounds",
      },
    ],
    [data]
  );
  const dispatch = useDispatch()
  const getCountOnce = useRef(true)
  useEffect(()=>{
    if(account?._id && getCountOnce.current){
      dispatch(getCartCount(account?._id));
      dispatch(personalProfile(account?._id))
      return getCountOnce.current = false
    }
  },[dispatch, account])

  let appOnce= useRef(true)

  useEffect(()=>{
    if(appOnce.current){      
      dispatch(getApp({accountId: account?._id || undefined}))
      return appOnce.current = false
    }
   
    
  },[dispatch, account])



  const headerProps = useMemo(
    () => ({
      history: props.history,
      accountId: account?._id,
      hash: props?.location?.hash,
      isNavbarVisible,
      account,
      locations: data?.locations,
      currency,
      firstName: account?.firstName,
      surname: account?.surname,
      picture: account?.picture,
    
      isMobile,
      taxRate: data?.settings?.taxRate || 0,
      cartCount,
      setCurrency,
      pathname: props?.location?.pathname,
      buildingCategories: data?.settings?.buildingCategories || [],
      currencies,
    }),
    [account, cartCount, data, currency, isMobile, currencies, isNavbarVisible, props]
  );

  useEffect(() => {
    let prevY = window.scrollY;
    window.addEventListener("scroll", function () {
      const { scrollY } = window;
      if (prevY < scrollY) {
        setIsNavbarVisible(false);
      } else {
        // upward scroll
        setIsNavbarVisible(true);
      }
      // else was horizontal scroll;
      prevY = scrollY;
    });
    // return window.removeEventListener("scroll");
  }, []);

  const contentProps = useMemo(
    () => ({
      account,
      token,
      accountId: account?._id,
      taxRate: data?.settings?.taxRate,
      appData: data,
      locations: data?.locations,
      currency,
      propertyFeatures: data?.settings?.propertyFeatures || [],
      setCurrency,
      isUser: data?.userType === "user" ? true : false,
      manager: account?.userType === "manager" ? true : false,
      isStaff: account?.userType === "staff" ? true : false,
      isAdmin: account?.userType === "admin" ? true : false,
      isMobile,
      cartCount,      
      firstName: account?.firstName,
      surname: account?.surname,
      picture: account?.picture,

      currencies,
      buildingCategories: data?.settings?.buildingCategories || [],
      autoCategories: data?.settings?.autoCategories || [],
      // isAdmin: account?.userType === "admin" ? true : false,
      advert: data?.advert || [],
      // pageLoader,
    }),
    [account, token, currency, cartCount, isMobile, currencies, data]
  );

  const footerMobileProps = useMemo(
    () => ({
      accountId: account?._id,
      firstName: account?.firstName,
      surname: account?.surname,
      picture: account?.picture,
      pathname: props?.location?.pathname,
      history: props.history,
    }),
    [props, account]
  );
  return (
    <div className="layout">
      <TheHeader {...headerProps} />
      <TheContent {...contentProps} />
      {["/", "/products", "/property"].includes(props.history?.location.pathname) && (
        <TheFooterMobile {...footerMobileProps} />
      )}
    </div>
  );
};

export default memo(TheLayout);
