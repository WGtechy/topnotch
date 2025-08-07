import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { componentLoader } from "../../bucket/loading-components/componentLoader";
import {
  cartCrud,
  getCartItems,
  initiateNewPayment,
  signIn,
} from "../../redux/actions";
import CartCard from "../../bucket/cards/CartCard";
import { formattedAmount } from "../../utilities-config/numberFormatter";
import Dialog from "../../bucket/dialog/Dialog";
import AppBar from "../../bucket/dialog/AppBar";
import Toolbar from "../../bucket/dialog/Toolbar";
import { IoClose } from "react-icons/io5";
import InputComponent from "../../bucket/formComponent/InputComponent";
import { toastObject } from "../../redux/toastObject";
import { toast } from "react-toastify";
import useArrayData from "../../utilities-config/useArrayData";
import moment from "moment";
import Authorization from "../Authorization";

const ProductCheckoutSlide = (props) => {
  const {
    accountId,
    // taxRate, Redo
    currency,
    open,
    account,
    handleClose,
    product,
    totalAmount,
    checkInDates,
    cartProducts,
    totalCount,
    checkInCalendar,
    checkOutCalendar,
    checkInTime,
    history,
  } = props;
  let taxRate = 3;
  const { carts, loading } = useSelector((state) => state.cart);
  const [totalCheckoutDiscount, setTotalCheckoutDiscount] = useState(0);
  const [totalCheckoutCost, setTotalCheckoutCost] = useState(0);
  const [realEstateTotal, setRealEstateTotal] = useState(0);
  const { data: newTransaction } = useSelector((state) => state.newTransaction);

  const [password, setPassword] = useState("");
  const emailBilling = useRef("");
  const firstNameBilling = useRef("");
  const surnameBilling = useRef("");
  const addressBilling = useRef("");
  const phoneBilling = useRef("");
  const firstName = useRef("");
  const surname = useRef("");
  const address = useRef("");
  const phone = useRef("");
  const email = useRef("");
  const dispatch = useDispatch();

  const [totalAmountForProducts, setTotalAmountForProducts] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const { newOrder, loadingNewOrder } = useSelector((state) => state.order);

  const [data, setData] = useState([]);
  const allData = useArrayData(!!data?.length ? data : []);

  const handleWishlist = useCallback(
    ({ productId }) =>
      () => {
        setData((prev) => prev.filter((x) => x?.productId?._id !== productId));
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
        setData((prev) => prev.filter((x) => x?.productId?._id !== productId));

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

  const once = useRef(true);
  useEffect(() => {
    if (open && account && once.current) {
      firstName.current = account?.billingDetails?.firstName;
      surname.current = account?.billingDetails?.surname;
      email.current = account?.billingDetails?.email;
      phone.current = account?.billingDetails?.phone;
      address.current = account?.billingDetails?.address;
    }
  }, [open, account]);

  useEffect(() => {
    if (accountId && open && product?.marketingType !== "Rent") {
      dispatch(
        getCartItems({
          accountId: accountId,
          target: "all",
        })
      );
    }
  }, [accountId, cartProducts, product, open, dispatch]);

  useEffect(() => {
    
      let _cart = localStorage.getItem("cart");
      if (![null, undefined, "null"].includes(_cart)) {
        setData(JSON.parse(_cart));
      } else {
        if (!!cartProducts?.length) {
          setData(cartProducts);
        }
      }
  }, [accountId, cartProducts, product, open, dispatch]);

  let getCartOnce = useRef(true);
  useEffect(() => {
    if (getCartOnce.current && open && accountId && !!carts?.length) {
      // setData(carts);
    }
  }, [carts, open, accountId]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password) {
      const user = {
        password,
        email: email.current,
        target: "signIn",
        history,
      };
      dispatch(signIn(user));
    }
  };

  // const createHandler = (e) => {};

  useEffect(() => {
    if (newTransaction?.data?.access_code && open) {
      localStorage.setItem(
        "authorization_url",
        newTransaction.data.authorization_url
      );
    }
  }, [newTransaction, open]);

  const processPayment = (e) => {
    e.preventDefault();
    if (email && !loading) {
      let purchase = {
        crud: "CREATE",
        accountId: accountId,
        date: new Date(),
        orderCode: parseInt(Math.random() * 1000000),
        totalAmount: totalCheckoutCost + (totalCheckoutCost * taxRate) / 100,
        totalTaxCost: taxRate ? (totalCheckoutCost * taxRate) / 100 : 0,
        checkInDates,
        totalCount,
        currency, //String
        checkInCalendar,
        checkOutCalendar,
        billingDetails: {
          firstName: firstNameBilling.current,
          surname: surnameBilling.current,
          address: addressBilling.current,
          phone: phoneBilling.current,
          email: emailBilling.current,
        },
        condition: "Pending",
      };
      if (email.current && address.current) {
        setProceedToPayment(true);
        props.history.replace(
          `${props.location.pathname}${props.location.search}&payment=true`
        );
        dispatch(
          initiateNewPayment({
            email: email.current,
            amount: `${totalAmount * 100}`,
            currency:
              currency.name === "Naira"
                ? "NGN"
                : currency.name === "Dollars" && "USD",
            ...purchase,
          })
        );
      } else {
        toast.error(
          `Can not complete your request, Please provide your ${
            !email?.current ? "email" : ""
          } ${!email?.current && !address?.current ? "and" : ""} ${
            !address?.current ? "address" : ""
          }`,
          toastObject
        );
      }
    }
  };

  useEffect(() => {
    if (open) {
      setTotalAmountForProducts(
        totalCheckoutCost + (totalCheckoutCost * taxRate) / 100
      );
    }
  }, [totalCheckoutCost, open, taxRate]);

  const handleCloseReceipt = () => setOpenReceipt((prev) => !prev);
  // const imageUploadBannerProps = {
  //   accountId,
  //   openSlideComponent: openReceipt,
  //   handleClose: handleCloseReceipt,
  //   isArray: false,
  //   selectedMedia: receipt,
  //   setSelectedMedia: setReceipt,
  //   imagesOnly: true,
  // };

  const cardDisplay = ({ item, i, ref }) => {
    const obj = {
      key: i,
      ref: null,
      target: "checkout",
      item: item?.productId,
      taxRate,
      setTotalCheckoutDiscount,
      setTotalCheckoutCost,
      currency,
      handleWishlist,
      handleDeleteCartItem,
    };
    return <CartCard {...obj} />;
  };

  const payment = [
    {
      name: "Check-in date",
      display: product?.marketingType === "Rent",
      changeStyle: true,
      value: moment(checkInCalendar).calendar(),
    },
    {
      name: "Check-out date",
      display: product?.marketingType === "Rent",
      changeStyle: true,
      value: moment(checkOutCalendar).calendar(),
    },
    {
      name: "Check-in time",
      changeStyle: true,
      display: product?.marketingType === "Rent",
      value: checkInTime,
    },

    {
      name: "Total bookings",
      changeStyle: true,
      display: product?.marketingType === "Rent",
      value: totalCount,
    },
    {
      name: `${product?.productType} ${product?.marketingType}`,
      changeStyle: true,
      display: product?.marketingType === "Rent",
      value: checkInDates?.length,
    },
    {
      name: "Total rent",
      display: product?.marketingType === "Rent",
      value: `${currency?.symbol}${formattedAmount({
        amount: totalAmount,
        currencyValue: currency.value,
      })}`,
    },
    {
      name: "Total products cost",
      display: !product?.marketingType ? true : false,
      value: `${currency?.symbol}${formattedAmount({
        amount: totalCheckoutCost || 0,
        currencyValue: currency.value,
      })}`,
    },
    {
      name: "Added product cost",
      display: product?.marketingType === "Rent" ? true : false,
      value: totalCheckoutCost
        ? `${currency?.symbol}${formattedAmount({
            amount: totalCheckoutCost || 0,
            currencyValue: currency.value,
          })}`
        : `${currency?.symbol}0`,
    },
    {
      name: "Total tax",
      changeStyle: true,
      display: taxRate ? true : false,
      value: `${currency?.symbol}${formattedAmount({
        amount: ((totalCheckoutCost + (totalAmount || 0)) * taxRate) / 100,
        currencyValue: currency.value,
      })} calculated at ${Number(taxRate)}% `,
    },
    // {
    //   name: "Coupon value",
    //   display: true,
    //   value: `${currency?.symbol}${formattedAmount({
    //     amount: totalCheckoutDiscount,
    //     currencyValue: currency?.value,
    //   })}`,
    // },
    // {
    //   name: `Cost per ${product?.priceDependent?.toLowerCase()}`,
    //   display: true,
    //   value: `${currency?.symbol}${formattedAmount(product?.price || 0)}`,
    // },
    // {
    //   name: `Total ${product?.priceDependent}`,
    //   display: true,
    //   value: checkInDates?.length,
    // },

    {
      name: "Total payable",
      className: "costTotal",
      display: true,
      value: `${currency?.symbol}${formattedAmount({
        amount:
          totalCheckoutCost +
          (totalAmount || 0) +
          ((totalCheckoutCost + (totalAmount || 0)) * taxRate) / 100,
        currencyValue: currency.value,
      })}`,
    },
  ];
  return (
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
            <span>Checkout summary</span>
          </div>
          <div className="headerRight">
            {currency?.symbol}
            {formattedAmount({
              amount:
                totalCheckoutCost +
                (totalAmount || 0) +
                ((totalCheckoutCost + (totalAmount || 0)) * taxRate) / 100,
              currencyValue: currency?.value,
            })}
          </div>
        </Toolbar>
      </AppBar>
      {allData?.length || totalCount ? (
        <div className="checkoutSummary ">
          <div className="checkoutSummaryTop">
            <div className="cart">
              {!!allData.length &&
                allData.map((item, i) => {
                  if (allData.length === i + 1) {
                    return cardDisplay({ item, i, ref: true });
                  } else {
                    return cardDisplay({ item, i });
                  }
                })}
              {accountId && allData.length === 0 && loading && componentLoader}
            </div>

            <div className="checkoutList">
              {proceedToPayment && account?.billingDetails?.firstName && (
                <ul className="checkoutListBilling">
                  <div className="checkoutListBillingTitle">
                    Billing details
                  </div>
                  <li className="checkoutListBillingItem">
                    <span className="checkoutListBillingItemTitle">
                      First name
                    </span>{" "}
                    <span className="checkoutListBillingItemValue">
                      {firstName.current}
                    </span>
                  </li>
                  <li className="checkoutListBillingItem">
                    <span className="checkoutListBillingItemTitle">
                      Surname
                    </span>{" "}
                    <span className="checkoutListBillingItemValue">
                      {surname.current}
                    </span>
                  </li>
                  <li className="checkoutListBillingItem">
                    <span className="checkoutListBillingItemTitle">Email</span>{" "}
                    <span className="checkoutListBillingItemValue">
                      {email.current}
                    </span>
                  </li>
                  <li className="checkoutListBillingItem">
                    <span className="checkoutListBillingItemTitle">
                      Phone number
                    </span>{" "}
                    <span className="checkoutListBillingItemValue">
                      {phone.current}
                    </span>
                  </li>
                  <li className="checkoutListBillingItem">
                    <span className="checkoutListBillingItemTitle">
                      Address
                    </span>{" "}
                    <span className="checkoutListBillingItemValue">
                      {address.current}
                    </span>
                  </li>
                </ul>
              )}
              <ul className="checkoutListSummary">
                {payment.map(
                  (item, i) =>
                    item.display && (
                      <li
                        key={i}
                        className={
                          item?.className
                            ? `${item.className}  checkoutListSummaryItem`
                            : "checkoutListSummaryItem"
                        }
                      >
                        <div className="checkoutListSummaryItemName">
                          {item.name}
                        </div>
                        <div
                          className={
                            item?.changeStyle
                              ? "checkoutListSummaryItemNoStyle"
                              : "checkoutListSummaryItemValue"
                          }
                        >
                          {item.value}
                        </div>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
          {!proceedToPayment && (
            <div className="checkoutSummaryBottom">
              {accountId ? (
                <h2 className="title">Please provide your billing details </h2>
              ) : (
                <h2 className="title">Sign-In to checkout</h2>
              )}
              {!accountId && (
                <h3 className="subTitle">It's quick and simple</h3>
              )}
              {!accountId ? (
                <Authorization history={history} isCheckout={true} />
              ) : (
                <form
                  className="checkoutSummaryBottomForm"
                  onSubmit={processPayment}
                >
                  <InputComponent
                    type="text"
                    display={true}
                    onChange={(e) => (firstName.current = e.target.value)}
                    defaultValue={firstName.current}
                    title="firstName"
                    required={true}
                    placeholder="First name"
                  />
                  <InputComponent
                    type="text"
                    display={true}
                    onChange={(e) => (surname.current = e.target.value)}
                    defaultValue={surname.current}
                    title="surname"
                    required={true}
                    placeholder="Surname"
                  />
                  <InputComponent
                    type="address"
                    display={true}
                    onChange={(e) => (address.current = e.target.value)}
                    defaultValue={address.current}
                    title="address"
                    required={true}
                    placeholder="Billing address"
                  />
                  <InputComponent
                    type="tel"
                    display={true}
                    onChange={(e) => (phone.current = e.target.value)}
                    defaultValue={phone.current}
                    title="Phone"
                    required={true}
                    placeholder="Your phone number"
                  />
                  <InputComponent
                    type="email"
                    display={true}
                    onChange={(e) => (email.current = e.target.value)}
                    defaultValue={email.current}
                    title="Email"
                    required={true}
                    placeholder="Your email"
                  />

                  <button className="checkoutSummaryBottomFormBtn">
                    {loadingNewOrder ? "Please wait..." : "Proceed"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ) : null}
      {/* <TheMediaModal {...imageUploadBannerProps} /> */}
    </Dialog>
  );
};

export default ProductCheckoutSlide;

// {/* <form className="checkoutSummaryBottomForm" onSubmit={submitHandler}>
// {
//   <InputComponent
//     type="email"
//     display={true}
//     onChange={(e) => (email.current = e.target.value)}
//     title="Email"
//     required={true}
//     placeholder="Email"
//   />
// }
// <InputComponent
//   type="password"
//   display={true}
//   onChange={(e) => setPassword(e.target.value)}
//   title="Password"
//   required={true}
//   placeholder="Password"
// />
// <div  className="checkoutSummaryBottomFormBtns">
// <button
//   className="checkoutSummaryBottomFormBtnsBtn activeBtn"
// >
//   Login
// </button>
// <Link
//   to={`/redirect=true&target=new`}
//   className="checkoutSummaryBottomFormBtnsBtn"
//   // onClick={createHandler}
// >
//   Create account
// </Link>
// </div>
// <Link
//   to="/auth/forgot-password"
//   className="checkoutSummaryRightFormForgot"
// >
//   Forgot password
// </Link>
// </form> */}
