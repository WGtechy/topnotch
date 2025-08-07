import React, { Suspense, useCallback, useState } from "react";
import { pageLoader } from "../bucket/pageLoader";
import Template1 from "../bucket/allTemplates/Template1";
import { useSelector } from "react-redux";
import ContactUs from "./ContactUs";
import TheFooter from "../bucket/TheFooter";
import { componentLoader } from "../bucket/loading-components/componentLoader";

const AboutUs = ({ token }) => {
  const [showAllText, setShowAllText] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { data: app, loading } = useSelector((state) => state.app);



  const handleFaq = useCallback(
    (i) => () => {
      setOpenFaqIndex((prev) => (prev === i ? null : i));
    },
    []
  );


  return (
    <Suspense fallback={pageLoader}>
    {loading ? componentLoader :<div  className="mainHomeContainer">
    <div className="mainHomeContainerTop">
    {app?.homePage?.headingSecion?.image?.media && <div className="mainHomeContainerTopLeft" style={{backgroundImage: `url(${app?.homePage?.headingSecion?.image?.media})`}}>
    </div>}
   {app?.homePage?.headingSecion?.title && app?.homePage?.headingSecion?.description && <div className="mainHomeContainerTopRight">
    <div className="mainHomeContainerTopRightTitle">{app?.homePage?.headingSecion?.title}</div>
    <div className="mainHomeContainerTopRightDescription">{app?.homePage?.headingSecion?.description}</div>
    </div>}
    </div>
      {/* <SideBySideImageAndText /> */}
      <Template1 {...app?.homePage} />
 
     {!!app?.coreValues?.length &&  <div className="coreValues">
        <h2 className="sectionTitle">Core values</h2>
        {app?.coreValues.map((item, i) => (
          <div
            className="visionAndMissionCard"
            key={i}
            onClick={() => setShowAllText(i)}
          >
            <div className="visionAndMissionCardTitle">{item.name}</div>
            <div
              className={
                showAllText === i
                  ? "visionAndMissionCardDescription"
                  : "visionAndMissionCardDescription hideAllTxt"
              }
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>}
      {/* <Comment /> */}
      <ContactUs noDescription={true} />

      <TheFooter token={token} />
   </div>}
    </Suspense>
  );
};

export default AboutUs;
