import React, { Suspense, useCallback, useState } from "react";
import { pageLoader } from "../bucket/pageLoader";
import FAQ from "../bucket/allTemplates/faq";
import { useSelector } from "react-redux";
import ContactUs from "./ContactUs";
import TheFooter from "../bucket/TheFooter";

const Faqs = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { data: app, loading, } = useSelector((state) => state.app);

  const handleFaq = useCallback(
    (i) => () => {
      setOpenFaqIndex(prev=> prev === i ? null :i);
    },
    []
  );

  return (
    <Suspense fallback={pageLoader} className="mainHomeContainer">
    
      
      <div className="faq">
      <h2 className="sectionTitle">Frequently asked questions</h2>

        {!!app?.faq?.length && app.faq.map((item, i) => (
          <FAQ
            key={i}
            index={i}
            answer={item.answer}
            question={item.question}
            service={item.service}
            handleFaq={handleFaq(i)}
            openIndex={openFaqIndex}
          />
        ))}
      </div>
      <ContactUs noDescription={true}/>
     
      <TheFooter token={true} />
    </Suspense>
  );
};

export default Faqs;
