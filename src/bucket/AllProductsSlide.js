import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {  appBarStyle, toolStyle } from "../utilities-config/style";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products.action";
import useArrayData from "../utilities-config/useArrayData";
import { componentLoader } from "./loading-components/componentLoader";
import EmptyDataPage from "./EmptyDataPage";
import { loadingIcon } from "./loading-components/loadingIcon";
import Toolbar from "./dialog/Toolbar";
import AppBar from "./dialog/AppBar";
import Dialog from "./dialog/Dialog";


const doneStyle = {
    cursor: 'pointer'
  }

const AllProductsSlide = ({ open, handleClose,
    setSelectedContent,
    selectedContent,
    isAdmin,
    accountId
  
 }) => {
  const dispatch = useDispatch();
  const { all, loading } = useSelector((state) => state.products);
  const [page, setPage] = useState(0);
  const [keys, setKeys] = useState([]);
  const cardRef = useRef();
  const [currentData, setCurrentData] = useState([]);
  const allData = useArrayData(currentData);
  useEffect(() => {
    if(open){dispatch(
      getProducts({
        condition: {
          live: true,
          accountId,
          isAdmin
        },
        page,
      })
    );
  }
  }, [open, page, dispatch, isAdmin, accountId]);
  const lastDataRefElement = useCallback(
    (node) => {
      if (loading) return;
      if (cardRef.current) cardRef.current.disconnect();
      cardRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!all.length) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) cardRef.current.observe(node);
    },
    [loading, all]
  );
  useEffect(() => {
    if (!!all?.length && open) {
      setCurrentData((init) => [...all, ...init]);
    }
  }, [all, open]);

  const cardDisplay = ({ item, i, ref }) => {

    return  <div  className="cardOne" ref={ref ? lastDataRefElement : null} onClick={handleSelectedArray(item)}>
              
    {keys.includes(item._id) && (
             <div className="checkContainer">
               <IoCheckmark className="checkIcon" />{" "}
             </div>
           )}
           <div className="cardOneImage">
             <img
               src={item?.bannerImage?.media || "/logo.png"}
               alt="property"
               className="cardOneImageItem"
               onContextMenu={(e) => e.preventDefault()}
             />
           </div>
   
           <div className="cardOneContent">
             {item?.title && <div className="cardOneContentTitle">{item?.title}</div>}
           </div>
       
         </div>;
  };

  const handleSelectedArray = useCallback(
    (data) => () => {
     
      if (keys.includes(data._id)) {
        setSelectedContent((init) =>
          init.filter((dat) => dat?._id !== data?._id)
        );
        setKeys((init) => init.filter((x) => x !== data._id));
      } else {
        setSelectedContent((init) => [data, ...init]);
        setKeys((init) => [data?._id, ...init]);
      }
    },
    [keys, setSelectedContent]
  );
  return (
    <Dialog
    parentDialog={false}
    open={open}
    adjustFullscreen={true}
    onClose={handleClose}
  >
      <AppBar sx={appBarStyle}>
        <Toolbar sx={toolStyle}>
           <div onClick={handleClose} className="modalBack">
         {!!selectedContent?.length  ? <div style={{doneStyle}} >Done</div> :    <IoClose className="arrowStyle" />}
             <span className="headerRightSection">All products </span>
           </div>
         </Toolbar>
       </AppBar>
      {!!allData.length ? (
        <div className="cardDisplayGrid">
          {allData.map((item, i) => {
            if (allData.length === i + 1) {
              return cardDisplay({ item, i, ref: true });
            } else {
              return cardDisplay({ item, i });
            }
          })}
        </div>
      ) : (
        !loading &&
        allData.length === 0 && <EmptyDataPage message="No products" />
      )}
      {allData.length > 0 && loading && loadingIcon}
      {allData.length === 0 && loading && componentLoader}

    </Dialog>
  );
};

export default AllProductsSlide;
