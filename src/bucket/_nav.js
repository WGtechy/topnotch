import {
  PiCaretDownLight,
  PiBuildingsDuotone,
  PiCarProfileLight,
  PiHouseLine,
} from "react-icons/pi";

const adminMenu = () => [];

const generalMenu = () => [
  { route: "Home", to: "/" },
  {
    route: "More",
    icon: PiCaretDownLight,
    sub: [
      { route: "About Us", to: "/about-us" },
      { route: "Contact Us", to: "/contact-us" },
      { route: "Career", to: "/career" },
    ],
  },
  { route: "Sign-In", to: "/auth" },
];

const generalMenuMobile = ({ accountId, isAdmin, manager }) => [
  { route: "Home", to: "/", display: true },
  // { route: "Dashboard", to: "/dashboard" , display: isAdmin ? true : false},
  {
    route: "More",
    icon: PiCaretDownLight,
    display: isAdmin || manager ? true : false,
    sub: [
      {
        route: "App settings",
        to: "/media-and-settings",
        display: isAdmin ? true : false,
      },
      {
        route: "Draft products",
        to: "/archive",
        display: isAdmin || manager ? true : false,
      },
    ],
  },

  {
    route: "Orders",
    icon: PiCaretDownLight,
    display: false,
    sub: [
      {
        route: "Recent orders",
        to: "/orders/recent-orders",
        display: accountId ? true : false,
      },
      {
        route: "Pending orders",
        to: "/orders/pending-orders",
        display: accountId ? true : false,
      },
      {
        route: "Failed orders",
        to: "/orders/failed-orders",
        display: accountId ? true : false,
      },
      {
        route: "Suspended orders",
        to: "/orders/suspended-rent",
        display: accountId ? true : false,
      },
      {
        route: "Completed orders",
        to: "/orders/completed-rent",
        display: accountId ? true : false,
      },
    ],
  },
  { route: "Our Services", to: "/services", display: true },
  { route: "FAQs", to: "/faq", display: true },
  { route: "About Us", to: "/about-us", display: true },
  { route: "Contact Us", to: "/contact-us", display: true },
  { route: "Career", to: "/career", display: true },
  { route: "Sign In", to: "/auth", display: accountId ? false : true },
  { route: "Sign Out", click: true, display: accountId ? true : false },
];

const generalMenuMobileSignedOut = ({ accountId, isAdmin }) => [
  { route: "Home", to: "/", display: true },
  { route: "About Us", to: "/about-us", display: true },
  { route: "Contact Us", to: "/contact-us", display: true },
  { route: "Sign In", to: "/auth", display: accountId ? false : true },
];

export {
  adminMenu,
  generalMenu,
  generalMenuMobileSignedOut,
  generalMenuMobile,
};
