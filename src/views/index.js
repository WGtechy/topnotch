import { lazy } from "react";
const Home = lazy(() => import("./home/Home"));

const ChangePassword = lazy(() =>
  import("./home/productDetailFolder/auth/ChangePassword")
);
const ContactUs = lazy(() => import("./ContactUs"));
const Error404 = lazy(() => import("./Error404"));
const AboutUs = lazy(() => import("./AboutUs"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Checkout = lazy(() => import("./checkout/ProceedToPayment"));
const OrderReceipt = lazy(() => import("./checkout/OrderReceipt"));
const CarRentalPolicy = lazy(() => import("./policies/CarRentalPolicy"));
const BookingPolicy = lazy(() => import("./policies/BookingPolicy"));
const TermsAndConditions = lazy(() => import("./policies/TermsAndConditions"));
const Receipt = lazy(() => import("./checkout/Receipt"));
const Products = lazy(() => import("./product/Products"));
const AddProduct = lazy(() => import("./product/AddProduct"));
const Shortlet = lazy(() => import("./home/postCardComponents/Shortlet"));
const Property = lazy(() => import("./home/postCardComponents/Property"));
const Automobile = lazy(() => import("./home/postCardComponents/Automobile"));
const Interior = lazy(() => import("./home/postCardComponents/Interior"));
    

const Faqs = lazy(() => import("./Faqs"));
const ProductDetails = lazy(() => import("./product/ProductDetails"));

export {
  Home,
  TermsAndConditions,
  Checkout,
  Receipt,
  ContactUs,
  Products,
  ProductDetails,
  BookingPolicy,
  Error404,
  AboutUs,
  Dashboard,
  Shortlet,
Property,
Automobile,
Interior,
  ChangePassword,
  OrderReceipt,
  AddProduct,
  Faqs,
  CarRentalPolicy,
};
