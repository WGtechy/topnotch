import React, { useCallback, useState } from "react";
import { generalMenu } from "./_nav";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const TheHeaderDesktop = ({ accountId, token, setOverDesktopMenu }) => {
  const handleMouseOver = useCallback(
    (sub) => () => {
      if (!!sub?.length) {
        setOverDesktopMenu((prev) => !prev);
      }
    },
    [setOverDesktopMenu]
  );
  const handleCloseOver = useCallback(
    (sub) => () => !!sub?.length && setOverDesktopMenu(false),
    [setOverDesktopMenu]
  );
  const [activeLink, setActiveLink] = useState("");
  const clickLink = useCallback(
    (link) => () => {
      setActiveLink(link);
    },
    []
  );

  return (
    <div>
      <div className="menu-bar">
        {/* <Link to="/" className="mobileMenuLeftLogo">
            <img
              src="/logo.png"
              alt="topnotchLogo"
              className=""
              onContextMenu={(e) => e.preventDefault()}
            />
              <div className="mobileMenuLeftLogoText">Topnotch</div>
        
          </Link> */}
        <div className="menu-barLeft">
          <Link to="/" className="menu-barLeftLogo">
            <img
              src="/logo.png"
              alt="topnotchLogo"
              className=""
              onContextMenu={(e) => e.preventDefault()}
            />
          </Link>
          <span>Topnotch</span>
        </div>
        <ul>
          {generalMenu().map((item, i) => (
            <li
              key={i}
              className={
                activeLink === item.to
                  ? "sidebarLinkIconActive sidebarLinkContainerList"
                  : "sidebarLinkContainerList"
              }
              // onMouseLeave={handleCloseOver(item.sub)}
              onMouseOver={handleMouseOver(item.sub)}
            >
              <Link
                to={item?.to}
                title={item.route}
                onClick={clickLink(item?.to)}
                className="tooltip"
              >
                <span className="link hide">{item.route}</span>
                {/* <span className="tooltipContent">{item.route}</span> */}
              </Link>
              {/* Icon */}
              {item?.icon && (
                <div className="sidebarLinkIcon">
                  <item.icon
                    className={
                      item.route === "Home" ? "sidebarLinkIconHome" : ""
                    }
                  />
                </div>
              )}
              {!!item?.sub && (
                <div className="dropdown-menu">
                  <ul>
                    {item.sub.map((subItem, i) => (
                      <li
                        key={i}
                        className={
                          activeLink === subItem.to
                            ? "sidebarLinkIconActive sidebarLinkContainerList"
                            : "sidebarLinkContainerList"
                        }
                      >
                        <Link
                          to={subItem?.to}
                          title={subItem.route}
                          onClick={clickLink(subItem?.to)}
                          className="tooltip"
                        >
                          <span className="link hide">{subItem.route}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
          {/* <li>Home</li>
        <li>About</li>
        <li>Pages <i className="fas fa-caret-down"></i>

            <div className="dropdown-menu">
                <ul>
                  <li>Pricing</li>
                  <li>Portfolio</li>
                  <li>
                    Team <i className="fas fa-caret-right"></i>
                    
                    <div className="dropdown-menu-1">
                      <ul>
                        <li>Team-1</li>
                        <li>Team-2</li>
                        <li>Team-3</li>
                        <li>Team-4</li>
                      </ul>
                    </div>
                  </li>
                  <li>FAQ</li>
                </ul>
              </div>
        </li>
        <li>Blog
        </li>
        <li>Contact us</li> */}
        </ul>
      </div>
    </div>
  );
};

export default TheHeaderDesktop;
