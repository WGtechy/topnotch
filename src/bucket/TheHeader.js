import { Link } from "react-router-dom";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  IoBusinessOutline,
  IoStorefront,
  IoVideocam,
} from "react-icons/io5";
import useUrlSearchParams from "../utilities-config/useUrlSearchParams";
import TheSearchSlide from "./TheSearchSlide";
import TheCartSlider from "./TheCartSlider";
import TheAuthorizationSlide from "./TheAuthorizationSlide";
import { useSelector } from "react-redux";

const TheHeader = ({
  history,
  accountId,
  isMobile,
  locations,
  isNavbarVisible,
  buildingCategories,
  pathname,
  currency,
  account,
  taxRate,
}) => {
  const { data: app } = useSelector((state) => state.app);
  const [overlay, setOverlay] = useState(false);
  const [openHeaderDrop, setOpenHeaderDrop] = useState(false);
  const { c, ctype } = useUrlSearchParams();

  useEffect(() => {
    let style = document?.body.parentNode.style;
    if (openHeaderDrop) {
      if (style) {
        style.overflowY = "hidden";
        document.getElementById("bd").classList.add("styleBody");
      }
    } else {
      if (style?.overflowY === "hidden") {
        document.getElementById("bd").classList.remove("styleBody");
        style.overflowY = "auto";
      }
    }
  }, [openHeaderDrop]);

  const toggleOverlay = () => {
    setOverlay(false);
    setOpenHeaderDrop(false);
  };

  const [searchBar, setSearchBar] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const handleSearch = useCallback(() => setSearchBar((prev) => !prev), []);

  const handleToggleDrop = useCallback(() => {
    history.push("/dashboard");
  }, [history]);

  const handleCart = useCallback(() => setOpenCart((prev) => !prev), []);

  const searchProps = useMemo(
    () => ({
      open: searchBar,
      handleClose: handleSearch,
      locations,
      buildingCategories,
    }),
    [searchBar, handleSearch, locations, buildingCategories]
  );

  const cartProps = useMemo(
    () => ({
      open: openCart,
      accountId,
      taxRate,
      currency,
      account,
      history,
      handleClose: handleCart,
    }),
    [openCart, history, account, currency, handleCart, taxRate, accountId]
  );
  let categories = [
    { name: "Home", icon: IoVideocam, link: "", display: app?._id },
   
    {
      name: "Properties",
      icon: IoBusinessOutline,
      link: "property",
      display: app?.allowProperties,
    },
    {
      name: "Other products",
      icon: IoStorefront,
      link: "products",
      display: app?.allowProducts,
    },

  ];

  const handleSignIn = useCallback(() => {
    history.push(`/?ctype=auth`);
  }, [history]);

  const handleCloseAuth = useCallback(() => history.goBack(), [history]);

  const signProps = useMemo(
    () => ({
      history,
      handleClose: handleCloseAuth,
      isMobile,
      ctype,
    }),
    [ctype, handleCloseAuth, history, isMobile]
  );

  return (
    <>
      <div className={overlay ? "overlay" : ""} onClick={toggleOverlay}></div>
      <div className={pathname === "/" ? " homePpageNavbar navbar" : "navbar"}>
        <div
          className={
            isNavbarVisible
              ? pathname === "/"
                ? "navbarContent navbarShow"
                : "navbarContentOtherPages navbarContent navbarShow"
              : pathname === "/"
              ? "navbarContent navbarHide"
              : "navbarContent navbarHide navbarContentOtherPages"
          }
        >
          <section className="leftHeaderMenu">
            <Link to="/" className="leftHeaderMenuLogo">
              Topnotch{" "}
              {c
                ? c !== "Home" && (
                    <span className="leftHeaderMenuCategory">{c}</span>
                  )
                : null}
            </Link>
            {pathname === "/" &&
              c &&
              (c === "Product" ? null : (
                <div className="leftHeaderMenuCategory">{c}</div>
              ))}

            {!isMobile && (
              <div className="leftHeaderMenuItems">
                {categories.map(
                  (item, i) =>
                    item.display && (
                      <Link
                        to={item?.name === "Home" ? "/" : `/${item?.link}`}
                        className={
                          c === item.name
                            ? "leftHeaderMenuItemsItem activeMenu"
                            : "leftHeaderMenuItemsItem"
                        }
                        key={i}
                      >
                        <item.icon /> {item.name}
                      </Link>
                    )
                )}
              </div>
            )}
          </section>
          <div className="rightHeaderMenu">
            {/* {pathname === "/" && (
              <div
                className="headerMenuIcon headerAvatar"
                onClick={handleSearch}
              >
                <IoSearch />
              </div>
            )} */}
            {/* {accountId ? (
              !isMobile || pathname !== "/" ? (
                <TheAvatar
                  firstName={firstName}
                  surname={surname}
                  imageURL={picture}
                  style={{ height: "2rem", width: "2rem" }}
                  click={handleToggleDrop}
                />
              ) : null
            ) : null} */}

            {!accountId && (
              <div onClick={handleSignIn} className="rightHeaderMenuSignOut">
                Sign in
              </div>
            )}

            {/* {c === "Product" && (
              <div className="headerMenuIcon" onClick={handleCart}>
                <IoCart className="headerMenuIconCart" />
                <span className="headerMenuIconValue">{cartCount}</span>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <TheSearchSlide {...searchProps} />
      <TheCartSlider {...cartProps} />
      <TheAuthorizationSlide {...signProps} />
    </>
  );
};

export default memo(TheHeader);
