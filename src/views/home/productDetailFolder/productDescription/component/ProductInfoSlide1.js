import { memo, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import AppBar from "../../../../../bucket/dialog/AppBar";
import Dialog from "../../../../../bucket/dialog/Dialog";
import Toolbar from "../../../../../bucket/dialog/Toolbar";
import ProductInfo from "../ProductInfo";
import { formattedAmount } from "../../../../../utilities-config/numberFormatter";
import { useDispatch, useSelector } from "react-redux";
import { componentLoader } from "../../../../../bucket/loading-components/componentLoader";
import Error404 from "../../../../Error404";
import useUrlSearchParams from "../../../../../utilities-config/useUrlSearchParams";
import { getProduct } from "../../../../../redux/actions";
const ProductInfoSlide1 = (props) => {
  const {
    handleClose,
    parentDialog,
    productId,
    isAdmin,
    isManager,
    currency,
    isMobile,
    productPage,
    history,
    accountId,
    taxRate,
    track,
    ctype,
    openModal,
    account,
    clickable,
  } = props;

  const { loadingProduct, product, status } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const {pid} = useUrlSearchParams();
  const once = useRef(true);

  useEffect(()=>{
    if(pid && once.current){
      dispatch(getProduct(pid))
      return ()=>once.current = false
    }
  },[pid, dispatch]);

  const info = {
    product,
    currency,
    isMobile,
    history,
    accountId,
    isAdmin,
    isManager,
    taxRate,
    track,
    account,
    parentDialog: false,
    ctype,
    totalComments: product?.totalComments,
    totalLikes: product?.totalLikes,
  };

  return status === 404 ? (
    <Error404 />
  ) : loadingProduct ? (
    componentLoader
  ) : (
    <Dialog
      parentDialog={parentDialog}
      open={
        clickable
          ? openModal
          : ctype === "details" || productPage
          ? true
          : false
      }
      adjustFullscreen={isMobile ? true : false}
      onClose={handleClose}
      className="adjustable"
    >
      <AppBar>
        <Toolbar>
          <div onClick={handleClose} className="modalBack">
            <IoClose className="arrowStyle" />
            <span className="headerLeftSection">Product info</span>
          </div>
          <div className="dialogHeaderRight">
            {product?.price && (
              <div className="dialogHeaderRightTop">
                {currency.symbol}
                {formattedAmount({
                  amount: product?.price - product?.discount || 0,
                  currencyValue: currency.value,
                })}
              </div>
            )}
            {product?.discount ? (
              <div className="dialogHeaderRightBottom">
                {currency.symbol}{" "}
                {formattedAmount({
                  amount: product?.price,
                  currencyValue: currency.value,
                })}
              </div>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      <ProductInfo {...info} />
    </Dialog>
  );
};

export default memo(ProductInfoSlide1);
