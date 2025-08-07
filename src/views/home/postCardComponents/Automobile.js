import {
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
  Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { ScreenTemplate } from ".";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useArrayData from "../../../utilities-config/useArrayData";
import { getPosts } from "../../../redux/actions";
import HomePage from "./HomePage";
import { ScreenTemplate } from "..";
import { componentLoader } from "../../../bucket/loading-components/componentLoader";
import HomeTemplate from "../HomeTemplate";


 


 
const Automobile = (props) => {
  const { taxRate, currency, account, isAdmin, isMobile, isManager, cartCount, accountId, token, history } =
    props;
  const [postPage, setPostPage] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const arrData = useArrayData(currentData); 
   const {automobiles,loading  } = useSelector((state) => state.posts);


  const dispatch = useDispatch();
  const observer = useRef(null);
  const [volume, setVolume] = useState(false);

  const [openProductInfo, setOpenProductInfo] = useState(false);
  const toggleVolume = () => {
    setVolume((prev) => !prev);
  };
  const selectedItemRef = useRef(null);

  useEffect(() => {
    if (!!automobiles?.length) {
      setCurrentData((init) => [...init, ...automobiles]);
    } 
  }, [automobiles]);

  useEffect(() => {
    if (accountId) {
      dispatch(getPosts({ page: postPage, accountId, target: "Automobile" }));
    } else {
      dispatch(getPosts({ page: postPage, target: "Automobile" }));
    }
  }, [dispatch, accountId,  postPage]);

  const focusElement = useCallback(
    (node) => {
      // if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          let entry = null;
          for (entry of entries) {
            if (entry?.isIntersecting) {
              if (arrData.length - entry.target.getAttribute("index") === 2) {
                setPostPage((prev) => ++prev);
              }

            //   setPostId(entry.target.getAttribute("data"));

              if (
                isMobile &&
                entry.target.childNodes[3]?.childNodes[0]?.childNodes[0]
                  ?.childNodes[0]?.childNodes[0]?.classList[0] === "video"
              ) {
                let item =
                  entry.target.childNodes[3]?.childNodes[0]?.childNodes[0]
                    ?.childNodes[0]?.childNodes[0];
                //   item?.play()
              }
            } else {
              if (
                isMobile &&
                entry.target.childNodes[3]?.childNodes[0]?.childNodes[0]
                  ?.childNodes[0]?.childNodes[0]?.classList[0] === "video"
              ) {
                let item =
                  entry.target.childNodes[3]?.childNodes[0]?.childNodes[0]
                    ?.childNodes[0]?.childNodes[0];
                item.pause();
              } else {
                return;
              }
            }
          }
        },
        {
          threshold: 0.5,
          // rootMargin: "100px"
        }
      );
      if (node) observer?.current?.observe(node);
    },
    [isMobile]
  );
const [focusItem, setFocusItem] = useState(null)
 

  const focusWideScreenElement = useCallback(
    (node) => {
      // if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          let entry = null;
          for (entry of entries) {
            if (entry?.isIntersecting) {
              if (arrData.length - entry.target.getAttribute("index") === 2) {
                setPostPage((prev) => ++prev);
              }

            //   setPostId(entry.target.getAttribute("data"));
            } else {
            }
          }
        },
        {
          threshold: 0,
          // rootMargin: "100px"
        }
      );
      if (node) observer?.current?.observe(node);
    },
    [isMobile]
  );
  const handleFocus = useCallback(postId=>()=>{
    setFocusItem(postId)
},[])
const handleUnFocuse = ()=> setFocusItem(null)
   useEffect(() => {
    let handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight && arrData.length > 0 && !loading) {
        setPostPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [arrData, loading]);





  const cardDisplayWide = ({ item, i, ref }) => {
    return <HomePage
        key={i}
        ref={focusWideScreenElement}
        index={i}
        selectedItemRef={selectedItemRef}
        currency={currency}
        isMobile={isMobile}
        
  isAdmin={isAdmin}
  isManager={isManager}
        // isPlaying={isPlaying}
// setIsPlaying={setIsPlaying}
        autoPlay={focusItem === item._id ? true : false}
        focusItem={focusItem}
        accountId={accountId}
        handleFocus={handleFocus(item._id)}
        handleUnFocuse={handleUnFocuse}
        disableAutoPlay={accountId}
        product={item?.productId}
        mediaFiles={item.productId?.media}
        cartCount={cartCount}
        taxRate={taxRate}
        history={history}
        volume={volume}        
        toggleVolume={toggleVolume}
        token={token}
        setOpenProductInfo={setOpenProductInfo}
        openProductInfo={openProductInfo}
        postId={item?._id}
        totalLikes={item?.totalLikes}
        postLikes={item?.postLikes}
        totalComments={item?.totalComments}
        postSaved={item?.postSaved}
      />
  };

  const cardDisplayMobile = ({ item, i, ref }) => {
    return item?.template === "promotion" ? (
      <div
        className="postCardContainer"
        key={i}
        index={i + 1}
        ref={ref ? focusElement : null}
        data={item._id}
      >
        <div className="postCardContainerTitle">Promotionss</div>
        <div
          className="postCardContainerContent"
          ref={ref ? focusElement : null}
        >
          {item.data.map((item, i) => ({
            /* <PromotionCard
              key={i}
              celebrating="WeddingAnniversary"
              // onClick={handleConnection({ i, _id: item._id })}
              title={item?.title}
              firstName={item.firstName}
              surname={item.surname}
              picture={item.picture}
            /> */
          }))}
        </div>
      </div>
    ) : (
      <ScreenTemplate
        key={i}
        ref={focusElement}
        index={i}
        selectedItemRef={selectedItemRef}
        currency={currency}
        isMobile={isMobile}
        account={account}
  isAdmin={isAdmin}
  isManager={isManager}
        accountId={accountId}
        product={item?.productId}
        mediaFiles={item.productId?.media}
        cartCount={cartCount}
        taxRate={taxRate}
        history={history}
        volume={volume}
        toggleVolume={toggleVolume}
        token={token}
        setOpenProductInfo={setOpenProductInfo}
        openProductInfo={openProductInfo}
        postId={item?._id}
        totalLikes={item?.totalLikes}
        postLikes={item?.postLikes}
        totalComments={item?.totalComments}
        postSaved={item?.postSaved}
      />
    );
  };
  // const handlePauseOnBack = useCallback(ref=>()=>{
  //   ref.current.pause()
  // },[]);

 
  
  const [openAddCat, setOpenAddCat] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
    const {data: app} = useSelector(state=>state.app)
  
  const handleNew = ()=>setOpenAddCat(prev=>!prev)
  const categories = [
    {display: app?.allowAutomobiles, title: "Automobile"},
    {display: app?.allowProperties, title: "Property"},
    {display: app?.allowHotels, title: "Hotel"},
    {display: app?.allowInteriors, title: "Interior"},
    {display: app?.allowShortlets , title: "Shortlet"},
    {display: app?.allowProducts, title: "Product"}
   ]


   const handleCloseCat = ()=>{
    setOpenAdd(false)
    setOpenAddCat(false)
   }
 
  const handleOpenAdd = ()=>setOpenAdd(prev=>!prev)
  
  const homeProps = {
    data: arrData,
     isMobile,
     c: 'Automobile',
     handleOpenAdd,
     cardDisplayMobile,
     isAdmin,
     openAddCat,
     loading,
     handleNew,
     cardDisplayWide,
}

  return(  <Suspense fallback={componentLoader}>
      {loading && arrData?.length === 0 && componentLoader}
     <HomeTemplate {...homeProps}     />
      { openAddCat || openAdd ? 
      <div className="productAddCategory" onClick={handleCloseCat}>
      <div className={`productAddCategoryItems ${openAddCat || openAdd ? "openCatItems" : ""}`}>
      
      {categories.map((item, i)=>(item?.display && <Link to={`/product?ptype=${item.title}`} key={i} className="productAddCategoryItemsItem"  onClick={handleCloseCat}>{item.title}</Link>))}</div></div> : null}
    </Suspense>

  )
};

export default memo(Automobile);
