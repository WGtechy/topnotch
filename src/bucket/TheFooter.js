import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { social } from "../views/data";
import { useSelector } from "react-redux";

const TheFooter = () => {
  const { data: app } = useSelector((state) => state.app);

  return "";
  // <footer className="footer">
  //   <section className="footerTop">
  //     {/* <div className="footerTopLogo">
  //       <img src="logo.png" alt="topnotch logo" className="footerTopLogoImg" />
  //     </div> */}
  //     <div className="footerTopLinks">
  //       <div className="footerTopLinksColumn">
  //         <h2>Topnotch</h2>
  //         <Link to="/?c=Automobile">Autos</Link>
  //         <Link to="/?c=Interior">Interiors</Link>
  //         <Link to="/?c=Product">Products</Link>
  //         <Link to="/?c=Property">Properties</Link>
  //         <Link to="/?c=Shortlet">Shortlet</Link>
  //       </div>
  //       <div className="footerTopLinksColumn">
  //         <h2>Resources</h2>
  //         <Link to="/about-us">About us</Link>
  //         <Link to="/contact-us"> Contact </Link>
  //         <Link to="/blog">Blog</Link>
  //         <Link to="/faq">FAQ</Link>
  //       </div>
  //       <div className="footerTopLinksColumn">
  //         <h2>Policies</h2>
  //         <Link to="/policies/bookings">Bookings </Link>
  //         <Link to="/policies/car-rentals">Rental</Link>
  //         <Link to="/privacy-policy"> Privacy </Link>
  //         <Link to="/terms-and-conditions"> Terms of use </Link>
  //         {/* <a href="/">Dribbble</a> */}
  //       </div>
  //       <div className="footerTopLinksColumn footerTopLinkSocials">
  //         <div className="footerTopLinkSocialsTitle">Social Media</div>
  //         <div className="footerTopLinkSocialsInfo">
  //           Follow us on social media to get the latest.
  //         </div>
  //         <div className="contactFormContentInfoSocial">
  //           {social(app?.contact).map(
  //             (item, i) =>
  //               item?.display &&
  //               item.link && (
  //                 <a
  //                   href={item.link}
  //                   className="contactFormContentInfoSocialItem"
  //                   key={i}
  //                 >
  //                   <item.icon className={item.className} />
  //                 </a>
  //               )
  //           )}{" "}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  //   <section className="footerBottom">
  //     <p className="footerBottomCopyright">© 2024 All rights reserved</p>
  //     <div className="footerBottomLegal">
  //       <Link to="/contact-us"> Contact </Link>
  //       <Link to="/terms-and-conditions"> Terms & Conditions </Link>
  //       <Link to="/privacy-policy"> Privacy policy </Link>
  //     </div>
  //   </section>
  // </footer>
};

export default TheFooter;
