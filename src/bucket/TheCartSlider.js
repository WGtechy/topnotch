import { IoClose } from "react-icons/io5";
import AppBar from "./dialog/AppBar";
import Dialog from "./dialog/Dialog";
import Toolbar from "./dialog/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import EmptyDataPage from "./EmptyDataPage";
import { loadingIcon } from "./loading-components/loadingIcon";
import { componentLoader } from "./loading-components/componentLoader";
import CartCard from "./cards/CartCard";
import { useCallback, useEffect, useRef, useState } from "react";
import useArrayData from "../utilities-config/useArrayData";
import { cartCrud, getCartItems } from "../redux/actions";
import ProductCheckoutSSlide from "../views/checkout/ProductCheckoutSlide";

// const demoData = [
//   {
//     totalCount: 5,
//     _id: 4,
//     productId: {
//       _id: 4,
//       title: "Dinning table",
//       bannerImage: { media: "shortlet2.jpg" },
//       price: 2000903,
//       discount: 30000,
//       minimumPurchase: 4,
//     },
//   },

//   {
//     totalCount: 2,
//     _id: 6,
//     productId: {
//       _id: 9,
//       title: "Chairs",
//       bannerImage: { media: "shortlet1.jpg" },
//       price: 3420003,
//       discount: 40000,
//       minimumPurchase: 6,
//     },
//   },
// ];
const TheCartSlider = (props) => {
  const {
    open,
    handleClose,
    accountId,
    taxRate,
    currency,

    account,
    history,
  } = props;
  const dispatch = useDispatch();
  const [openCheckout, setOpenCheckout] = useState(false);
  const { carts, loading } = useSelector((state) => state.cart);
  const [page, setPage] = useState(0);
  const cardRef = useRef();
  const [currentData, setCurrentData] = useState([]);

  const allData = useArrayData(currentData);

  const handleWishlist = useCallback(
    ({ productId }) =>
      () => {
        setCurrentData((prev) =>
          prev.filter((x) => x?.productId?._id !== productId)
        );
        dispatch(
          cartCrud({
            crud: "ADD-WISHLIST",
            productId,
            accountId: accountId,
          })
        );
      },
    [accountId, dispatch]
  );

  const handleDeleteCartItem = useCallback(
    ({ productId }) =>
      () => {
        setCurrentData((prev) =>
          prev.filter((x) => x?.productId?._id !== productId)
        );

        dispatch(
          cartCrud({
            crud: "DELETEALL",
            productId,
            accountId: accountId,
          })
        );
      },
    [accountId, dispatch]
  );

  useEffect(() => {
    if (open) {
      dispatch(
        getCartItems({
          accountId: accountId,
          page,
        })
      );
    }
  }, [open, accountId, page, dispatch]);

  const lastDataRefElement = useCallback(
    (node) => {
      if (loading) return;
      if (cardRef.current) cardRef.current.disconnect();
      cardRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!carts.length) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) cardRef.current.observe(node);
    },
    [loading, carts]
  );

  useEffect(() => {
    if (!!carts?.length) {
      setCurrentData((init) => [...carts, ...init]);
    }
  }, [carts]);

  const cardDisplay = ({ item, i, ref }) => {
    const obj = {
      key: i,
      ref: ref ? lastDataRefElement : null,
      item: item?.productId,
      taxRate,
      currency,
      handleWishlist,
      handleDeleteCartItem,
    };
    return <CartCard {...obj} />;
  };

  const handleCheckout = () => {
    setOpenCheckout((prev) => !prev);
    if (open) {
      handleClose();
    }
  };
  const checkoutProps = {
    open: openCheckout,
    handleClose: handleCheckout,
    accountId,
    taxRate,
    currency,
    account,
    history,
    cartProducts: allData,
  };

  return (
    <>
      <Dialog
        parentDialog={true}
        open={open}
        adjustFullscreen={true}
        onClose={handleClose}
      >
        <AppBar>
          <Toolbar>
            <div onClick={handleClose} className="modalBack">
              <IoClose className="arrowStyle" />
              <div>Cart</div>
            </div>
          </Toolbar>
        </AppBar>
        <div className="cart">
          {!!allData.length
            ? allData.map((item, i) => {
                if (allData.length === i + 1) {
                  return cardDisplay({ item, i, ref: true });
                } else {
                  return cardDisplay({ item, i });
                }
              })
            : !loading &&
              allData.length === 0 && (
                <EmptyDataPage message="No items in cart" />
              )}
          {allData.length > 0 && loading && loadingIcon}
          {allData.length === 0 && loading && componentLoader}
        </div>
        <div className="cartDialogFooter" onClick={handleCheckout}>
          Checkout {allData?.length > 1 ? "All" : ""}
        </div>
      </Dialog>
      <ProductCheckoutSSlide {...checkoutProps} />
    </>
  );
};

export default TheCartSlider;
