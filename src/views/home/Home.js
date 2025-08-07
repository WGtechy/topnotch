import { useState, memo, Suspense } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { componentLoader } from "../../bucket/loading-components/componentLoader";
import HomePageBanner from "../../bucket/HomePageBanner";
import PromoVideo from "../../bucket/PromoVideo";
import TheFooter from "../../bucket/TheFooter";

const Home = (props) => {
 
  return (
    <Suspense fallback={componentLoader}>
      <div className="home">
      <PromoVideo src={"./homeVideo.mp4"}/>
      <div className="homeContent">
      <h5 className="homeContentTop"> You're In Good Hands</h5>
      <h2 className="homeContentMiddle"> BUY YOUR PROPERTY <br /> THROUGH TOPNOTCH PROPERTIES</h2>
      <Link to="/property" className="homeContentBtn">Explore</Link>
      </div>
      </div> 
      <TheFooter />
    </Suspense>
  );
};

export default memo(Home);
