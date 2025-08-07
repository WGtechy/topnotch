import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import DashboardChart from "../../bucket/dashboardWidgets/DashboardChart";
import { useDispatch, useSelector } from "react-redux";
import { componentLoader } from "../../bucket/loading-components/componentLoader";
import Error404 from "../Error404";
import { formattedAmount } from "../../utilities-config/numberFormatter";
import moment from "moment";
import TheAvatar from "../../bucket/TheAvatar";
import AllOrders from "./AllOrders";
import AllAdmins from "./AllAdmins";
import AllCarts from "./AllCarts";
import AllCompletedOrders from "./AllCompletedOrders";
import AllCustomers from "./AllCustomers";
import AllLikedPost from "./AllLikedPost";
import AllProducts from "./AllProducts";
import AllSavedPosts from "./AllSavedPosts";
import AllSharedPosts from "./AllSharedPosts";
import AllPendings from "./AllPendings";
import ItemSlide from "./ItemSlide";
import AppProfile from "./AppProfile";
import ProfileSetting from "./ProfileSetting";
import Cashout from "./Cashout";
import ReceiptSlide from "../checkout/components/ReceiptSlide";
import { signOut, userProfile } from "../../redux/actions";
import AllWishLists from "./AllWishLists";
import { IoClose, IoMenu } from "react-icons/io5";

let currency = {
  symbol: "₦",
  value: 1,
  name: "Naira",
};

// const appData = {}
const Dashboard = (props) => {
  const { data: app, loading, status } = useSelector((state) => state.app);

  const {
    isMobile,
    isAdmin,
    isStaff,
    accountId,
    isUser,
    account,
    taxRate,
    manager,
    locations,
    autoCategories,
    buildingCategories,
  } = props;
  const [moreOrders, setMoreOrders] = useState(false);
  const [morePendings, setMorePendings] = useState(false);
  const [openProfileSettings, setOpenProfileSettings] = useState(false);
  const [openAppSettings, setOpenAppSettings] = useState(false);
  const [openCashout, setOpenCashout] = useState(false);

  const [moreWishList, setMoreWishList] = useState(false);
  const [moreAdmins, setMoreAdmins] = useState(false);
  const [moreCustomers, setMoreCustomers] = useState(false);
  const [moreProducts, setMoreProducts] = useState(false);
  const [moreCompletedOrders, setMoreCompletedOrders] = useState(false);
  const [moreLikedProducts, setMoreLikedProducts] = useState(false);
  const [moreSharedProducts, setMoreSharedProducts] = useState(false);
  const [moreSavedProducts, setMoreSavedProducts] = useState(false);
  const [moreCarts, setMoreCarts] = useState(false);
  const [title, setTitle] = useState("");
  const [openSelectedItem, setOpenSelectedItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // const [fetched, setFetched] = useState([])

  const [openOrderItem, setOpenOrderItem] = useState(false);
  const [orderItem, setOrderItem] = useState(null);

  const {
    earnings,
  } = useSelector((state) => state.userProfile);

  const dispatch = useDispatch();

  const handleSelectItem = useCallback(
    (data) => () => {
      if (data) {
        setSelectedItem(data.item);
        setTitle(data.title);
      }
      setOpenSelectedItem((prev) => !prev);
    },
    []
  );
  const handleOrderItem = useCallback(
    (data) => () => {
      if (data) {
        setOrderItem(data.item);
        setTitle(data.title);
      }
      setOpenOrderItem((prev) => !prev);
    },
    []
  );


  const handleOrders = useCallback(() => setMoreOrders((prev) => !prev), []);
  const handlePendings = useCallback(
    () => setMorePendings((prev) => !prev),
    []
  );
  const handleAdmins = useCallback(() => setMoreAdmins((prev) => !prev), []);
  const handleProducts = useCallback(
    () => setMoreProducts((prev) => !prev),
    []
  );

  const handleCustomers = useCallback(
    () => setMoreCustomers((prev) => !prev),
    []
  );
  const handleCompletedOrders = useCallback(
    () => setMoreCompletedOrders((prev) => !prev),
    []
  );
  const handleLikedProducts = useCallback(
    () => setMoreLikedProducts((prev) => !prev),
    []
  );
  const handleSharedProducts = useCallback(
    () => setMoreSharedProducts((prev) => !prev),
    []
  );
  const handleSavedProducts = useCallback(
    () => setMoreSavedProducts((prev) => !prev),
    []
  );
  const handleCarts = useCallback(() => setMoreCarts((prev) => !prev), []);
  const handleWishlists = useCallback(() => setMoreWishList((prev) => !prev), []);

  let handleProfileSetting = useCallback(
    () => setOpenProfileSettings((prev) => !prev),
    []
  );
  let handleAppSetting = useCallback(
    () => setOpenAppSettings((prev) => !prev),
    []
  );
  
  const handleCashout = useCallback(() => setOpenCashout((prev) => !prev), []);

  useEffect(() => {
    if (isAdmin && accountId) {
        dispatch(userProfile({ accountId, target: "earnings", page: 0 }));
    }
  }, [dispatch, isAdmin, accountId]);

 
  const handleSignOut = () => {
    props.history.push("/");
    dispatch(signOut({ accountId, token: props?.token }));
  };

  const menu =[

              {title: "Profile settings", click: handleProfileSetting, display: accountId ? true : false},
              {title: "App settings", click: handleAppSetting, display: isAdmin},
              {title: "About-Us Page", click: handleAppSetting, display: isAdmin},
              
              {
        title: "New orders",
        click: handleOrders,
        display: manager ? false : true,
      },
      {
        title: "Pending orders",
        click: handlePendings,
        display: manager ? false : true,
      },
      {
        title: "Staffs",
        click: handleAdmins,
        display: isAdmin ? true : false,
      },
      {
        title: "Customers",
        click: handleCustomers,
        display: isAdmin || isStaff ? true : false,

      },
      {
        title: "Products",
        click: handleProducts,
        display: isAdmin || manager || isStaff ? true : false,
      },
      {
        title: "Completed orders",
        click: handleCompletedOrders,
        display: isAdmin || manager || isStaff ? true : false,
      },
      {
        title: "Liked products",
        click: handleLikedProducts,
        display: isUser ? true : false,
      },
      // {
        //   title: "Shared products",
        //   click: handleSharedProducts,
      //   display: manager || isStaff ? false : true,
      // },
      {
        title: "Saved products",
        click: handleSavedProducts,
        display: isUser ? true : false,
      },
      {
        title: "In Cart",
        click: handleCarts,
        display: isUser ? true : false,
      },
      {
        title: "Wish list",
        click: handleWishlists,
        display: isUser ? true : false,
      },
        {title: "Sign-Out", click: handleSignOut, display: true},
    ]
  



  const moreOrdersProps = useMemo(
    () => ({
      open: moreOrders,
      handleClose: handleOrders,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreOrders, handleOrders, isAdmin, manager, accountId]
  );
  const morePendingsProps = useMemo(
    () => ({
      open: morePendings,
      handleClose: handlePendings,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [morePendings, handlePendings, isAdmin, manager, accountId]
  );
  const moreAdminsProps = useMemo(
    () => ({
      open: moreAdmins,
      handleClose: handleAdmins,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreAdmins, handleAdmins, isAdmin, manager, accountId]
  );
  const moreCustomersProps = useMemo(
    () => ({
      open: moreCustomers,
      handleClose: handleCustomers,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreCustomers, handleCustomers, isAdmin, manager, accountId]
  );
  const moreProductsProps = useMemo(
    () => ({
      open: moreProducts,
      handleClose: handleProducts,
      isMobile,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
      locations,
      autoCategories,
      buildingCategories,
    }),
    [
      moreProducts,
      isMobile,
      handleProducts,
      isAdmin,
      manager,
      locations,
      autoCategories,
      buildingCategories,
      accountId,
    ]
  );
  const moreCompletedOrdersProps = useMemo(
    () => ({
      open: moreCompletedOrders,
      handleClose: handleCompletedOrders,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreCompletedOrders, handleCompletedOrders, isAdmin, manager, accountId]
  );
  const moreLikedProductsProps = useMemo(
    () => ({
      open: moreLikedProducts,
      handleClose: handleLikedProducts,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreLikedProducts, handleLikedProducts, isAdmin, manager, accountId]
  );
  const moreSharedProductsProps = useMemo(
    () => ({
      open: moreSharedProducts,
      handleClose: handleSharedProducts,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreSharedProducts, handleSharedProducts, isAdmin, manager, accountId]
  );
  const moreSavedProductsProps = useMemo(
    () => ({
      open: moreSavedProducts,
      handleClose: handleSavedProducts,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreSavedProducts, handleSavedProducts, isAdmin, manager, accountId]
  );
  const moreCartsProps = useMemo(
    () => ({
      open: moreCarts,
      handleClose: handleCarts,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreCarts, handleCarts, isAdmin, manager, accountId]
  );

  const moreWishlistProps = useMemo(
    () => ({
      open: moreWishList,
      handleClose: handleWishlists,
      parentDialog: false,
      isAdmin,
      manager,
      accountId,
    }),
    [moreWishList, handleWishlists, isAdmin, manager, accountId]
  );
 

  // const handleRemove = useCallback((data) => {
  //   if (data) {

  //   }
  //   setOpenUpdate((prev) => !prev);
  // }, []);

  const itemSlideProps = useMemo(
    () => ({
      open: openSelectedItem,
      handleClose: handleSelectItem(),
      data: selectedItem,
      currency,
      title,
      taxRate,
      app,
      isAdmin,
      manager,
      // handleCheckout,
    }),
    [
      title,
      app,
      isAdmin,
      manager,
      taxRate,
      openSelectedItem,
      selectedItem,
      handleSelectItem,
    ]
  );

  const receiptSlideProps = useMemo(
    () => ({
      open: openOrderItem,
      handleClose: handleOrderItem(),
      data: orderItem,
      currency,
      title,
      app,
      isAdmin,
      manager,
      // handleUpdateOrder,
    }),
    [
      title,
      app,
      isAdmin,
      manager,
      // handleUpdate,
      openOrderItem,
      orderItem,
      handleOrderItem,
    ]
  );

  const profileSettingProps = useMemo(
    () => ({
      handleClose: handleProfileSetting,
      open: openProfileSettings,
      accountId,
      data: account,
    }),
    [handleProfileSetting, accountId, account, openProfileSettings]
  );

  const cashoutProps = useMemo(
    () => ({
      open: openCashout,
      handleClose: handleCashout,
    }),
    [openCashout, handleCashout]
  );
  const appSettingProps = useMemo(
    () => ({
      handleClose: handleAppSetting,
      open: openAppSettings,
      accountId,
    }),
    [handleAppSetting, accountId, openAppSettings]
  );

  
  const [openAdd, setOpenAdd] = useState(false);
 const handleOpenMenu = ()=> setOpenAdd(prev=>!prev);

  const handleSelectMenu = useCallback(item=>()=>{
    setOpenAdd(false)
    item.click()
  },[])

  return status === 404 ? (
    <Error404 />
  ) : loading ? (
    componentLoader
  ) : (
    <>
      <div className="dashboard">
        
          <div className="dashboardProfile">
        <div className="dashboardProfileTitle">Profile</div>
        <div className="dashboardProfileAvatar">
          <TheAvatar
            firstName={account?.firstName}
            surname={account?.surname}
            imageURL={account?.picture?.media}
            style={{ width: "6rem", height: "6rem" }}
          />
        </div>
        <div className="dashboardProfileTable">
          {account?.firstName && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">
                First Name:{" "}
              </span>
              <span className="dashboardProfileTableItemValue">
                {account?.firstName}
              </span>
            </div>
          )}
          {account?.surname && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">
                Surname:{" "}
              </span>
              <span className="dashboardProfileTableItemValue">
                {account?.surname}
              </span>
            </div>
          )}
          {account?.address && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">
                Address:{" "}
              </span>
              <span className="dashboardProfileTableItemValue">
                {account?.address}
              </span>
            </div>
          )}
          {account?.phone && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">
                Phone:{" "}
              </span>
              <span className="dashboardProfileTableItemValue">
                {account?.phone}
              </span>
            </div>
          )}
          {account?.email && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">
                Email:{" "}
              </span>
              <span className="dashboardProfileTableItemValue">
                {account?.email}
              </span>
            </div>
          )}
          {account?.bankName && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">Bank: </span>
              <span className="dashboardProfileTableItemValue">
                {account?.bankName}
              </span>
            </div>
          )}
          {account?.bankAccountNumber && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">
                Account number:{" "}
              </span>
              <span className="dashboardProfileTableItemValue">
                {account?.bankAccountNumber}
              </span>
            </div>
          )}
          {account?.country && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">
                Country:{" "}
              </span>
              <span className="dashboardProfileTableItemValue">
                {account?.country}
              </span>
            </div>
          )}
          {account?.city && (
            <div className="dashboardProfileTableItem">
              <span className="dashboardProfileTableItemName">City: </span>
              <span className="dashboardProfileTableItemValue">
                {account?.city}
              </span>
            </div>
          )}
        </div> 
      </div>
        <div className="dashboardEarning">
          <div className="dashboardEarningHeader">
            <div className="dashboardEarningHeaderTitle">Earnings </div>
            {!!earnings?.length && <div
              className="dashboardEarningHeaderBtn"
              onClick={handleCashout}
            >
              Cashout
            </div>}
          </div>

          {!!earnings?.length ? <ul className="dashboardEarningTable">
            {earnings.map((item, i) => (
              <li className="dashboardEarningTableItem" key={i}>
                <div className="dashboardEarningTableItemSN">{i + 1}</div>
                <div className="dashboardEarningTableItemAmount">
                  {item?.currency?.value}
                  {formattedAmount({
                    amount: item?.amount,
                    currencyValue: item?.currency?.value,
                  })}
                </div>
                <div className="dashboardEarningTableItemDate reduceText1">
                  {moment(item?.date).calendar()}
                </div>
                <div className="dashboardEarningTableItemName reduceText1">
                  {item?.productId?.name}
                </div>
              </li>
            ))}{" "}
          </ul> : <div className="dashboardEarningEmpty"> No Earnings</div>}
        </div>
      </div>
      {!openAdd && <div className="addFloatBtn" onClick={handleOpenMenu}><IoMenu /></div>}
            { openAdd && 
            <div className="productAddCategory" onClick={handleOpenMenu}>
            <div className="productAddCategoryItems">
            <span className="productAddCategoryItemsClose"><IoClose /></span>
            
           
            {menu.map((item, i)=>(item.display && <div key={i} className="productAddCategoryItemsItem"  onClick={handleSelectMenu(item)}>{item.title}</div>))}</div></div>}
      <AllOrders {...moreOrdersProps} />
      <AllPendings {...morePendingsProps} />
      <AllAdmins {...moreAdminsProps} />
      <AllCustomers {...moreCustomersProps} />
      <AllProducts {...moreProductsProps} />
      <AllCompletedOrders {...moreCompletedOrdersProps} />
      <AllLikedPost {...moreLikedProductsProps} />
      <AllSharedPosts {...moreSharedProductsProps} />
      <AllSavedPosts {...moreSavedProductsProps} />
      <AllCarts {...moreCartsProps} />
      <AllWishLists {...moreWishlistProps} />
      <ItemSlide {...itemSlideProps} />
      <ReceiptSlide {...receiptSlideProps} />
      <AppProfile {...appSettingProps} />
      <ProfileSetting {...profileSettingProps} />
      <Cashout {...cashoutProps} />
    </>
  );
};

export default Dashboard;
