import React, {
  forwardRef,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import { appBarStyle, arrowStyle, toolStyle } from "../utilities-config/style";
import { IoCart, IoClose, IoLogoWhatsapp, IoTrash } from "react-icons/io5";
import Calendar from "./Calendar";
import moment from "moment";
import { formattedAmount } from "../utilities-config/numberFormatter";
import { TheConfirmationMessage } from "./TheConfirmationMessage";
import ProductStickyFooter from "./ProductStickyFooter";
import { PiBookmark, PiPhoneLight, PiShareNetwork } from "react-icons/pi";
import { frontURL } from "../utilities-config/urlConfig";
import { useDispatch, useSelector } from "react-redux";
import { cartCrud } from "../redux/actions";
import ProductPolicy from "./ProductPolicy";

const CheckoutUpdate = ({
  handleClose,
  open,
  unavailableDates,
  product,
  phone,
  shareContent,
  currency,
  isAdmin,
  pathname,
  checkInDates,
  setCheckInDates,
  history,
  saveToCart,
  totalAmount,
  setTotalAmount,
  accountId,
  setTextDate,
  cartItemId,
  textDate,
}) => {
  const [duplicateUnavail, setDuplicateUnavail] = useState(unavailableDates);
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [noAccountNumber, setNoAccountNumber] = useState(null);
  const [discountByAdmin, setDiscountByAdmin] = useState(0);
  const handleCloseMessageBox = () => {
    if (!!checkInDates.length) {
      for (let item of checkInDates) {
        setTextDate(
          (prev) => `*${item.day}/${item.month}/${item.year}, ${prev}*`
        );
      }
    }
    setOpenMessageBox((prev) => !prev);
  };
  const [messageType, setMessageType] = useState("");
  const { newCart, loadingNewCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const sendOrderToServer = useCallback(
    (type) => () => {
      let serverData = {
        productId: product._id,
        accountId: accountId,
        checkInDates,
        totalAmount,
        discountByAdmin,
        target: true,
        currency,
        cartItemId,
        noAccountNumber,
        count: checkInDates?.length,
        crud: "CREATE",
      };
      dispatch(cartCrud(serverData));
      localStorage.setItem("checkout", JSON.stringify(serverData));
      let _cart = localStorage.getItem("cart");
      if (![null, undefined, "null"].includes(_cart)) {
        if (!!JSON.parse(_cart).length) {
          localStorage.setItem(
            "cart",
            JSON.stringify([serverData, ...JSON.parse(_cart)])
          );
        }
      } else {
        localStorage.setItem("cart", JSON.stringify([serverData]));
      }
      setMessageType(type);
      setOpenMessageBox(true);
    },
    [
      checkInDates,
      currency,
      accountId,
      discountByAdmin,
      cartItemId,
      dispatch,
      noAccountNumber,
      product,
      totalAmount,
    ]
  );

  const checkOnce = useRef(true);
  useState(() => {
    if (checkOnce.current && !accountId) {
      let _check = localStorage.getItem("userNumber");
      if (![null, undefined, "null"].includes(_check)) {
        setNoAccountNumber(_check);
      } else {
        let randomId = Math.random().toString();
        localStorage.setItem("userNumber", randomId);
        setNoAccountNumber(randomId);
      }
    }
  }, []);

  const handleSelectedDays = useCallback(
    (item) => {
      if (!!unavailableDates?.length) {
        let check = unavailableDates.find((x) => x.id === item.id);
        if (check) {
          return;
        } else {
          setCheckInDates((prev) => {
            // if(!!prev.length){
            let selected = prev.find(
              (x) =>
                x.day === item.day &&
                x.month === item.month &&
                x.year === item.year
            );
            if (selected) {
              prev = prev.filter((x) => x?.id !== selected.id);
              setDuplicateUnavail((prev) =>
                prev.filter((x) => x?.id !== selected.id)
              );
              setTotalAmount((amt) => amt - product?.price);
            } else {
              setDuplicateUnavail((prev) => [item, ...prev]);
              prev = [item, ...prev];
              setTotalAmount((amt) => amt + product?.price);
            }
            return prev;
          });
        }
      } else {
        setCheckInDates((prev) => {
          // if(!!prev.length){
          let selected = prev.find(
            (x) =>
              x.day === item.day &&
              x.month === item.month &&
              x.year === item.year
          );
          if (selected) {
            prev = prev.filter((x) => x?.id !== selected.id);
            setDuplicateUnavail((prev) =>
              prev.filter((x) => x?.id !== selected.id)
            );
            setTotalAmount((amt) => amt - product?.price);
          } else {
            setDuplicateUnavail((prev) => [item, ...prev]);
            prev = [item, ...prev];
            setTotalAmount((amt) => amt + product?.price);
          }
          return prev;
        });
      }
    },
    [product, setTotalAmount, unavailableDates, setCheckInDates]
  );
  // const  handleWhatsapp = ()=>{
  //   history.push(`https://wa.me/07068768385?text`)
  // }

  const dateSelectedTemplate = () => {
    return (
      <div className="dateWrapper">
        <div className="dateWrapperContent">
          <div className="dateWrapperContentRight">
            <Calendar
              unavailableDates={[...duplicateUnavail, ...checkInDates]}
              handleSelectedDays={handleSelectedDays}
              isTime={true}
              selection={true}
              isUser={true}
            />
          </div>

          {!!checkInDates?.length ? (
            <div className="dateWrapperContentLeft">
              <div className="dateWrapperContentLeftHeader">
                <div className="dateWrapperContentLeftHeaderLeft">
                  <div className="dateWrapperContentLeftHeaderLeftTime">
                    {" "}
                    Expected Check-In Time: {product.checkInTime}{" "}
                  </div>
                  <div className="dateWrapperContentLeftHeaderLeftTime">
                    {" "}
                    Expected Check-Out Time: {product.checkOutTime}{" "}
                  </div>
                </div>
                <div className="dateWrapperContentLeftHeaderRightAmount">
                  {product?.priceDependent && (
                    <div className="dateWrapperContentLeftHeaderRightAmountTitle">
                      Total for {checkInDates.length} {product?.priceDependent}
                      {checkInDates.length > 1 && "s"}
                    </div>
                  )}
                  <div className="dateWrapperContentLeftHeaderRightAmountContainer">
                    <span className="dateWrapperContentLeftHeaderRightAmountContainerCurrency">
                      {currency?.symbol}
                    </span>
                    <span className="dateWrapperContentLeftHeaderRightAmountContainerPrice">
                      {formattedAmount({
                        amount: totalAmount,
                        currencyValue: currency.value,
                      })}{" "}
                    </span>{" "}
                  </div>
                  {/* <div className="dateWrapperContentLeftFooterRightAmountMobile">
                    <div className="dateWrapperContentLeftFooterRightAmountMobileBtns">
                      <div
                        onClick={sendOrderToServer("link")}
                        className="dateWrapperContentLeftFooterRightAmountMobileBtnsWhatsApp"
                      >
                        <IoLogoWhatsapp /> WhatsApp Chat
                      </div>
                      <div
                        onClick={sendOrderToServer("click")}
                        className="dateWrapperContentLeftFooterRightAmountMobileBtnsPayment"
                      >
                        <IoCart /> Checkout
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <ul className="dateWrapperContentLeftList">
                {checkInDates.map((item, i) => (
                  <li key={i} className="dateWrapperContentLeftListItem">
                    {moment(
                      new Date(new Date(item.year, item.month, item.day)),
                      "YYYYMMDD"
                    )?.format("MMM Do YY")}
                    <span
                      className="dateWrapperContentLeftListItemBin"
                      onClick={() => handleSelectedDays(item)}
                    >
                      <IoTrash />
                    </span>{" "}
                  </li>
                ))}
              </ul>
              {!!checkInDates.length && (
                <div className="dateWrapperFooter">
                  <div className="dateWrapperFooterContent">
                    <p className="dateWrapperFooterContentInstruction">
                      {isAdmin
                        ? "Make sure the dates are avaialble before you proceed."
                        : "Make sure you confirm your selected dates before you pay."}
                    </p>
                    <div className="dateWrapperFooterContentBtns">
                      <div
                        className="dateWrapperFooterContentBtnsWhatsApp"
                        onClick={sendOrderToServer("link")}
                      >
                        <IoLogoWhatsapp /> WhatsApp Chat
                      </div>
                      <div
                        className="dateWrapperFooterContentBtnsPayment"
                        onClick={sendOrderToServer("click")}
                      >
                        <IoCart /> Checkout
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="dateWrapperContentEmpty">
              Select dates in the calendar
            </div>
          )}
        </div>
      </div>
    );
  };

  const payment = () => {
    //  dispatch payment
    setOpenMessageBox(false);
  };
  const formatDates = () => {
    if (!!checkInDates.length) {
      let string = "";
      for (let item of checkInDates) {
        string = `${string}-(${item.day}-${item.month}-${item.year})`;
      }
      return string;
    } else {
      return;
    }
  };
  const handleCheckoutAndPayment = () => {
    let item = {
      checkInDates,
      productId: product._id,
      totalAmount,
      currency,
    };
    setOpenMessageBox(false);
    setOpenPolicy(false);
    localStorage.setItem("checkout", JSON.parse(null));
    localStorage.setItem("checkout", JSON.stringify(item));
    history.push(`/checkout?p=${product._id}`);
  };

  const handlePolicy = () => {
    setOpenMessageBox((prev) => !prev);
    setOpenPolicy((prev) => !prev);
  };
  const theConfirmationMessageProps = {
    open: openMessageBox,
    handleClose: handleCloseMessageBox,
    link: loadingNewCart
      ? null
      : messageType === "link"
      ? `https://wa.me/${product?.admin?.phone}?text=Request link: ${frontURL}${
          history?.location?.pathname
        }?id=${product._id} ${textDate || ""}`
      : null,
    click: messageType === "click" ? handleCheckoutAndPayment : "",
    policy: product?.policies ? handlePolicy : false,
    policyBtn: ` Policy`,
    message:
      messageType === "link"
        ? "We will redirect you to chat with our available customer care personnel on whatsapp. Please be aware that we will only available to respond to your messages from 9am to 9pm Nigeria time. Thank you. "
        : "Ensure the dates you selected are correct before proceeding to make payment. Read our terms and conditions.",
    title: "Confirmation required",
  };
  const icons = [
    { name: "Save", iconName: PiBookmark, click: saveToCart, display: true },
    {
      name: "Checkout",
      iconName: IoCart,
      click: sendOrderToServer("click"),
      display: true,
    },
    {
      name: "Chat",
      iconName: IoLogoWhatsapp,
      click: sendOrderToServer("link"),
      display: true,
    },
    {
      name: "Call",
      iconName: PiPhoneLight,
      link: `tel:${phone}`,
      display: true,
    },
  ];

  const productPolicyProps = {
    handleClose: handlePolicy,
    open: openPolicy,
    policy: product.policies,
    agree: handleCheckoutAndPayment,
  };

  const handleCloseModal = () => {
    handleCloseMessageBox();
    handleClose();
  };
  return (
    <>
      <>
        {/* <AppBar sx={appBarStyle}>
          <Toolbar sx={toolStyle}>
            <div onClick={handleCloseModal} className="modalBack">
              <IoClose style={arrowStyle} />
              <span className="headerRightSection"> Check-in period </span>
            </div>
            <div className="modalRightProduct">
              {product?.priceDependent && (
                <div className="modalRightProductDependent">
                  Per {product?.priceDependent}
                </div>
              )}
              <div className="modalRightProductPrice">
                {currency?.symbol}
                {formattedAmount({
                  amount: product?.price,
                  currencyValue: currency?.value,
                })}
              </div>
            </div>
          </Toolbar>
        </AppBar> */}
        <div className="modalContent">
          {/* <p>
          Please select the number of days you want to check-in for and proceed
          to chat with us.
        </p> */}
          <form>{dateSelectedTemplate()}</form>
          <TheConfirmationMessage {...theConfirmationMessageProps} />
        </div>

        {!!checkInDates.length && <ProductStickyFooter icons={icons} />}
      </>
      <ProductPolicy {...productPolicyProps} />
    </>
  );
};

export default CheckoutUpdate;
