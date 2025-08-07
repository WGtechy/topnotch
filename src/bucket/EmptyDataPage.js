import { memo, useEffect, useState } from "react";

const EmptyDataPage = ({ title, message, name, displayBtn, action, actionMessage, link, linkText }) => {
  const [display, setDisplay] = useState(false)


    useEffect(() => {
      // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
      const timeoutId = setTimeout(() => {
        setDisplay(true);
      }, 3000);
  
      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }, []); 
    
  return (
   display ? <div className="emptyPage">
      <div className="emptyPageContent">
        <h3>{title && title} </h3>
        {name && <h3>{name}</h3>}
        <p>{message}</p>
        <div className="emptyPageContentImage">
          <img src="/empty.png" alt="No data" onContextMenu={(e) => e.preventDefault()} />
        </div>
        {displayBtn && <div className="emptyPageContentBtn" onClick={action}>{actionMessage}</div>}
          {link && <a href={link} style={{textDecoration: 'underline'}}>{linkText}</a>}
      </div>
    </div>: ''
  );
};

export default memo(EmptyDataPage);
