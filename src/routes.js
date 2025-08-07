import { Home} from "./views/home";

import {
  AboutUs,
  ContactUs,
  Error404,
  OrderReceipt,
  Checkout,
  Products,
  TermsAndConditions,
  Dashboard,
  // Authorization,
  CarRentalPolicy,
  ProductDetails,
    AddProduct,
  ChangePassword, Shortlet, Interior, Property, Automobile,
  Faqs,
  BookingPolicy,
  Receipt,
} from "./views";

const allComponent = {
  authPage: {
    Home,
    Dashboard,
    Checkout,
  Products,
    AddProduct,
    // ChangePassword,
    AboutUs,
    ContactUs,
  ProductDetails,
    OrderReceipt,
    CarRentalPolicy,
  TermsAndConditions,
  BookingPolicy,
 Shortlet, Interior, Property, Automobile,
    Receipt,
    Faqs,
    Error404,
  },

  entryPage: {
    Home,
  ProductDetails,
    Receipt,
    OrderReceipt,
  TermsAndConditions,
  Products,
  Checkout,
    ChangePassword,
     Shortlet, Interior, Property, Automobile,
    AboutUs,
    CarRentalPolicy,
    ContactUs,
  BookingPolicy,
    Error404,
    Faqs,
  },
};

const authRoutes = [
  { path: "/", exact: true, name: "Home", component: allComponent.authPage.Home },
  { path: "/shortlet", exact: true, name: "Home", component: allComponent.authPage.Shortlet },
  { path: "/interior", exact: true, name: "Home", component: allComponent.authPage.Interior },
  { path: "/property", exact: true, name: "Home", component: allComponent.authPage.Property },
  { path: "/automobile", exact: true, name: "Home", component: allComponent.authPage.Automobile },
  { path: "/products", exact: true, name: "Products", component: allComponent.authPage.Products },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: allComponent.authPage.Dashboard,
  },

  {
    path: "/order-confirmation",
    exact: true,
    name: "Receipt",
    component: allComponent.authPage.Receipt,
  },
  {
    path: "/faq",
    exact: true,
    name: "Frequently asked questions",
    component: allComponent.authPage.Faqs,
  },
  {
    path: "/successful-transaction",
    exact: true,
    name: "Order receipt",
    component: allComponent.authPage.OrderReceipt,
  },
  {
    path: "/checkout",
    exact: true,
    name: "Checkout",
    component: allComponent.authPage.Checkout,
  },

  {
    path: "/orders",
    exact: true,
    name: "",
    component: allComponent.entryPage.Error404,
  },

   {
    path: "/product",
    exact: true,
    name: "Add product",
    component: allComponent.authPage.AddProduct,
  },
   {
    path: "/product/:slug",
    exact: true,
    name: "Update product",
    component: allComponent.authPage.AddProduct,
  },

  {
    path: "/orders/:slug",
    exact: true,
    name: "Orders",
    component: allComponent.authPage.Orders,
  },
  {
    path: "/product-details/:slug",
    exact: true,
    name: "Product details",
    component: allComponent.authPage.ProductDetails,
  },

  {
    path: "/about-us",
    exact: true,
    name: "Abbout Us",
    component: allComponent.authPage.AboutUs,
  },
  {
    path: "/contact-us",
    exact: true,
    name: "Contact Us",
    component: allComponent.authPage.ContactUs,
  },
 {path: "/policies/bookings", exact: true, name: "Bookings", component: allComponent.entryPage.BookingPolicy},
  { path: "/policies/car-rentals", exact: true, name: "Car-rentals", component: allComponent.entryPage.CarRentalPolicy},
  { path: "/terms-and-conditions", exact: true, name: "Terms and conditions", component: allComponent.entryPage.TermsAndConditions},

  { path: "*", name: "Error", component: allComponent.authPage.Error404 },
];

const generalRoutes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: allComponent.entryPage.Home,
  },

  { path: "/shortlet", exact: true, name: "Home", component: allComponent.entryPage.Shortlet },
  { path: "/interior", exact: true, name: "Home", component: allComponent.entryPage.Interior },
  { path: "/property", exact: true, name: "Home", component: allComponent.entryPage.Property },
  { path: "/automobile", exact: true, name: "Home", component: allComponent.entryPage.Automobile },
  { path: "/products", exact: true, name: "Products", component: allComponent.entryPage.Products },
  {
    path: "/order-confirmation",
    exact: true,
    name: "Receipt",
    component: allComponent.entryPage.Receipt,
  },
  {
    path: "/product-details/:slug",
    exact: true,
    name: "Product details",
    component: allComponent.authPage.ProductDetails,
  },
  {
    path: "/faq",
    exact: true,
    name: "Frequently asked questions",
    component: allComponent.entryPage.Faqs,
  },
  {
    path: "/auth/change-password",
    exact: true,
    name: "Change password",
    component: allComponent.entryPage.ChangePassword,
  },
 {
    path: "/checkout",
    exact: true,
    name: "Checkout",
    component: allComponent.entryPage.Checkout,
  },
  {
    path: "/successful-transaction",
    exact: true,
    name: "Checkout",
    component: allComponent.entryPage.OrderReceipt,
  },
  {
    path: "/about-us",
    exact: true,
    name: "Abbout Us",
    component: allComponent.entryPage.AboutUs,
  },
  {
    path: "/contact-us",
    exact: true,
    name: "Contact Us",
    component: allComponent.entryPage.ContactUs,
  },
  { path: "/policies/bookings", exact: true, name: "Bookings", component: allComponent.entryPage.BookingPolicy},
   { path: "/policies/car-rentals", exact: true, name: "Car-rentals", component: allComponent.entryPage.CarRentalPolicy},
   { path: "/terms-and-conditions", exact: true, name: "Terms and conditions", component: allComponent.entryPage.TermsAndConditions},

  { path: "*", name: "Error", component: allComponent.entryPage.Error404 },
];

export { authRoutes, generalRoutes };
