import React, { useEffect, useRef, useState } from "react";
import {
  PiAddressBook,
  PiHash,
  PiPhoneLight,
  PiUserThin,
} from "react-icons/pi";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { initiateNewPayment, signIn } from "../../redux/actions";
import { toastObject } from "../../redux/toastObject";
import {
  formattedAmount,
  formattedNumber,
} from "../../utilities-config/numberFormatter";
import InputComponent from "../../bucket/formComponent/InputComponent";
import TheMediaModal from "../../bucket/TheMediaModal";
import Dialog from "../../bucket/dialog/Dialog";
import Toolbar from "../../bucket/dialog/Toolbar";
import AppBar from "../../bucket/dialog/AppBar";
import { IoClose } from "react-icons/io5";
import useUrlSearchParams from "../../utilities-config/useUrlSearchParams";

const ProceedToPayment = (props) => {
  const newTransaction = null;
  // const { data: newTransaction } = useSelector((state) => state.newTransaction);
  const {
    accountId,
    isAdmin,
    account,
    order,
    handleClose,
    open,
    checkInDates,
    discountByAdmin,
    totalCount,
    checkInCalendar,
    checkOutCalendar,
    currency,
  } = props;

  const dispatch = useDispatch(); // the useDispatch stored in a constant variable will dispatch the input of the user into a dispatch function like the sign in function
  const [password, setPassword] = useState("");
  // const [data, setData] = useState(null);
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
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const { p, orderid } = useUrlSearchParams();

  const [receipt, setReceipt] = useState(null);
  const pay = process.env.REACT_APP_PAYMENT_LIVE;
  const [billingDetails, setBillingDetails] = useState(false);
  const [authorizationUrl, setAuthorizationUrl] = useState(null);

  const { loading, user } = useSelector((state) => state.signIn);
  // const { cartItem, loadingCart, status } = useSelector((state) => state.cart);
  const { newOrder, loadingNewOrder } = useSelector((state) => state.order);

  // Once the order has been placed this code will be executed immediated
  // useEffect(() => {
  //   if (p === newOrder?.productId?._id && orderid && open) {
  //     props.history.push(`/successful-transaction?r=${newOrder._id}`);
  //   }
  // }, [newOrder, p, orderid, props]);

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

  const [totalTaxCost, setTotalTaxCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  // Get the product details from local storage
  // useEffect(() => {
  //   if (product?._id) {
  //     let _item = localStorage.getItem("checkout");
  //     if (![null, undefined, "null"].includes(_item)) {
  //       let data = JSON.parse(_item);
  //       if (data.productId === productFromUrl?.p) {
  //         let _totalPrice =
  //           product?.price * data?.checkInDates.length * data?.currency?.value -
  //           product.discount * data?.checkInDates.length;
  //         setTotalAmount(_totalPrice);
  //         setCurrency(data?.currency);
  //         setTotalDiscount(product.discount * data?.checkInDates.length);
  //         if (Number(product?.taxRate) > 0) {
  //           setTotalTaxCost(
  //             Number(product?.taxRate) *
  //               data?.checkInDates.length *
  //               data?.currency?.value
  //           );
  //           setTotalCost(
  //             (_totalPrice * Number(product?.taxRate)) / 100 -
  //               product.discount * data?.checkInDates.length
  //           );
  //         } else {
  //           setTotalCost(
  //             _totalPrice - product.discount * data?.checkInDates.length
  //           );
  //         }
  //       }
  //     }
  //   }
  // }, [account, product, productFromUrl.p, isAdmin]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password) {
      const user = {
        password,
        email: email.current,
        target: "signIn",
        history: `/${props?.location?.pathname}${props?.location?.search}`,
      };
      dispatch(signIn(user));
    }
  };

  const createHandler = (e) => {};

  useEffect(() => {
    if (newTransaction?.data?.access_code) {
      localStorage.setItem(
        "authorization_url",
        newTransaction.data.authorization_url
      );
    }
  }, [newTransaction]);

  const submitBilling = (e) => {
    e.preventDefault();
    if (email && !loading) {
      let purchase = {
        crud: "CREATE",
        accountId: accountId,
        date: new Date(),
        orderCode: parseInt(Math.random() * 1000000),
        totalAmount: totalCost,
        totalTaxCost,
        totalDiscount,
        checkInDates,
        adminId: isAdmin ? accountId : undefined,
        discountByAdmin,
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
      if (totalAmount && email.current && address.current) {
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
          `Can not complete your request, Please fill your ${
            !email?.current ? "email" : ""
          } ${!email?.current && !address?.current ? "and" : ""} ${
            !address?.current ? "address" : ""
          }`,
          toastObject
        );
      }
    }
  };

  const handleCloseReceipt = () => setOpenReceipt((prev) => !prev);
  const imageUploadBannerProps = {
    accountId,
    openSlideComponent: openReceipt,
    handleClose: handleCloseReceipt,
    isArray: false,
    selectedMedia: receipt,
    setSelectedMedia: setReceipt,
    imagesOnly: true,
  };
  const payment = [
    // {
    //   name: "Tax rate",
    //   display: true,
    //   value: taxRate ? `${Number(taxRate)}%`,
    // },
    // {
    //   name: "Total tax",
    //   display: true,
    //   value: `${currency?.symbol}${formattedNumber(totalTaxCost)}`,
    // },
    {
      name: "Total discount",
      display: true,
      value: `${currency?.symbol}${formattedNumber({
        amount: totalDiscount,
        currencyValue: currency?.value,
      })}`,
    },
    // {
    //   name: `Cost per ${product?.priceDependent?.toLowerCase()}`,
    //   display: true,
    //   value: `${currency?.symbol}${formattedNumber(product?.price || 0)}`,
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
      value: `${currency?.symbol}${formattedNumber(totalCost)}`,
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
        </Toolbar>
      </AppBar>
      <div className="checkoutSummary ">
        <div className="checkoutSummaryTop">
          <div className="checkoutList">
            {proceedToPayment && account?.billingDetails?.firstName && (
              <ul className="checkoutListBilling">
                <div className="checkoutListBillingTitle">Billing details</div>
                <li className="checkoutListBillingItem">
                  <span className="checkoutListBillingItemTitle">
                    First name
                  </span>{" "}
                  <span className="checkoutListBillingItemValue">
                    {firstName.current}
                  </span>
                </li>
                <li className="checkoutListBillingItem">
                  <span className="checkoutListBillingItemTitle">Surname</span>{" "}
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
                  <span className="checkoutListBillingItemTitle">Address</span>{" "}
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
                      <div className="checkoutListSummaryItemValue">
                        {item.value}
                      </div>
                    </li>
                  )
              )}
              <div className="checkoutListTitle">Total payment:</div>
              <div className="checkoutListAmount">
                {currency?.symbol}
                {formattedAmount({
                  amount: totalAmount,
                  currencyValue: currency?.value,
                })}
              </div>
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
            {!accountId && <h3 className="subTitle">It's quick and simple</h3>}
            {!accountId ? (
              <form className="checkoutSummaryBottomForm">
                {
                  <InputComponent
                    type="email"
                    display={true}
                    onChange={(e) => (email.current = e.target.value)}
                    title="Email"
                    required={true}
                    placeholder="Email"
                  />
                }
                <InputComponent
                  type="password"
                  display={true}
                  onChange={(e) => setPassword(e.target.value)}
                  title="Password"
                  required={true}
                  placeholder="Password"
                  icon={PiHash}
                />
                <div
                  className="checkoutSummaryRightFormBtn"
                  onClick={submitHandler}
                >
                  Login
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="checkoutSummaryRightFormForgot"
                >
                  Forgot password
                </Link>
                <p
                  className="checkoutSummaryBottomFormBtn"
                  onClick={createHandler}
                >
                  Create and account
                </p>
              </form>
            ) : (
              <form className="checkoutSummaryBottomForm">
                <InputComponent
                  type="text"
                  display={true}
                  onChange={(e) => (firstName.current = e.target.value)}
                  defaultValue={firstName.current}
                  title="firstName"
                  required={true}
                  placeholder="First name"
                  icon={PiUserThin}
                />
                <InputComponent
                  type="text"
                  display={true}
                  onChange={(e) => (surname.current = e.target.value)}
                  defaultValue={surname.current}
                  title="surname"
                  required={true}
                  placeholder="Surname"
                  icon={PiUserThin}
                />
                <InputComponent
                  type="address"
                  display={true}
                  onChange={(e) => (address.current = e.target.value)}
                  defaultValue={address.current}
                  title="address"
                  required={true}
                  placeholder="Billing address"
                  icon={PiAddressBook}
                />
                <InputComponent
                  type="tel"
                  display={true}
                  onChange={(e) => (phone.current = e.target.value)}
                  defaultValue={phone.current}
                  title="Phone"
                  required={true}
                  placeholder="Your phone number"
                  icon={PiPhoneLight}
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

                <div
                  className="checkoutSummaryBottomFormBtn"
                  onClick={submitBilling}
                >
                  {loadingNewOrder ? "Please wait..." : "Proceed"}
                </div>
              </form>
            )}
          </div>
        )}
      </div>
      <TheMediaModal {...imageUploadBannerProps} />
    </Dialog>
  );
};

export default ProceedToPayment;
