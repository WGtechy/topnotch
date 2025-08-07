import React from "react";

const FAQ = ({ answer, question, service, openIndex, index, handleFaq }) => {
  return (
    <div className="faqContent">
      <div className="faqContentQuestion">
          <div className="faqContentQuestionLeft">
            {question && (
              <div className="faqContentQuestionLeftDescription">{question}</div>
            )}
            <div className="faqContentQuestionLeftService">{service}</div>
          </div>
          <div className="faqContentQuestionRight" onClick={handleFaq}>
            {openIndex === index ? "Open" : "Close"}{" "}
          </div>
      </div>
      {openIndex === index && (
            <div className="faqContentAnswer">{answer}</div>
      )}
    </div>
  );
};

export default FAQ;
