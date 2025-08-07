import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUrlSearchParams from "../../utilities-config/useUrlSearchParams";
import { orderCRUD } from "../../redux/actions";
import { componentLoader } from "../../bucket/loading-components/componentLoader";
import Error404 from "../Error404";
import Image from "../../bucket/Image";
import moment from "moment";
import { formattedNumber } from "../../utilities-config/numberFormatter";

const Receipt = (props) => {
  const { item } = props;
  const shareHandler = (url) => {
    if (navigator.share) {
      navigator
        .share({
          url: `https://topnotch.com${props.location.pathname}/${props.location.search}`,
        })
        .then(() => console.log("Thank you for sharing"))
        .catch((error) =>
          console.log("Sorry could not share, please try again later", error)
        );
    } else {
      console.log("Not supported");
    }
  };
  const {
    order: serverOrder,
    loading,
    status,
    info,
  } = useSelector((state) => state.order);
  const { ctype, oid } = useUrlSearchParams();
  const dispatch = useDispatch();

  const [totalTaxCost, setTotalTaxCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [data, setData] = useState(null);

  const oneTime = useRef(true);
  useEffect(() => {
    if (oneTime.current) {
      if (item) {
        setData(item);
      } else if (serverOrder) {
        setData(serverOrder);
      }
      return () => (oneTime.current = false);
    }
  }, [item, serverOrder]);

  const once = useRef(true);
  useEffect(() => {
    if (!item?._id && oid && once.current) {
      dispatch(orderCRUD({ reference: oid, crud: "CONFIRM-PAYMENT" }));
      return () => (once.current = false);
    }
  }, [dispatch, item, oid]);

  useEffect(() => {
    if (data?._id) {
      let _totalPrice = data?.totalAmount;

      if (Number(data?.productId?.taxRate) > 0) {
        setTotalTaxCost(
          Number(data?.productId?.taxRate) *
            data?.checkInDates.length *
            data?.currency?.value
        );
        setTotalCost(
          (_totalPrice * Number(data?.productId?.taxRate)) / 100 -
            data?.productId.discount * data?.checkInDates.length
        );
      } else {
        setTotalCost(
          _totalPrice - data?.productId.discount * data?.checkInDates.length
        );
      }

      setTotalDiscount(data?.productId.discount * data?.checkInDates.length);
    }
  }, [data]);

  const currencySymbols = {
    NGN: "₦",
    USD: "$",
  };
  const payment = [
    {
      name: "Tax rate",
      display: true,
      value: `${Number(data?.productId?.taxRate)}%`,
    },
    {
      name: "Total tax",
      display: true,
      value: `${currencySymbols[data?.currency]}${formattedNumber(
        data?.totalTaxCost || 0
      )}`,
    },
    {
      name: "Total discount",
      display: true,
      value: `${currencySymbols[data?.currency]}${formattedNumber(
        data?.totalDiscount || 0
      )}`,
    },
    {
      name: `Cost per ${data?.productId?.priceDependent?.toLowerCase()}`,
      display: true,
      value: `${currencySymbols[data?.currency]}${formattedNumber(
        data?.productId?.price || 0
      )}`,
    },
    {
      name: `Total ${data?.productId?.priceDependent}`,
      display: true,
      value: data?.checkInDates?.length,
    },
    {
      name:
        info === "success"
          ? "Total paid"
          : ["pending", "processing", "ongoing", "queued"].includes(info)
          ? "Expected total"
          : "Total expected",
      className: "costTotal",
      display: true,
      value: `${currencySymbols[data?.currency]}${formattedNumber(
        data?.totalAmount
      )}`,
    },
  ];

  const transactionDetails = [
    {
      name: "Transaction id",
      display: true,
      value: `${data?.orderCode}&${data?._id}`,
    },
    {
      name: "Order code",
      display: true,
      value: `${data?.orderCode}`,
    },
    {
      name: "Reference id",
      display: true,
      value: `${data?.reference}`,
    },
    {
      name: `Transaction date`,
      display: true,
      value: moment(data?.updatedAt).calendar(),
    },
  ];

  // const theWhatsappProps = {
  //   open: openWhatsappBox,
  //   handleClose: proceedToWhatsapp,
  //   link: `https://wa.me/${product?.admin?.phone}?text=Request link: ${frontURL}${history?.location?.pathname}?id=${params?.id} ${textDate || ''}`,

  //   // link: `https://wa.me/${phone}?text=This is the link to my request ${frontURL}/request?id=${product?._id}  `,
  //   message: "We will redirect you to chat with our available customer care personnel on whatsapp. Please be aware that we will only available to respond to your messages from 9am to 9pm Nigeria time. Thank you. ",
  //   title: "Confirmation required",
  // };

  return status === 404 ? (
    <Error404 />
  ) : loading ? (
    componentLoader
  ) : data ? (
    <div className="receipt">
      <div className="checkoutList" id="download">
        {/* {data?.checkInCalendar && data?.checkOutCalendar && <div className="checkoutListDates">
              <div className="checkoutListDatesTitle">Reservation dates</div>
                  <li className="checkoutListDatesItem">
                    <span className="checkoutListDatesItemSN">Check-in date</span>
                    <span>
                      {moment(
                        new Date(data.checkInCalendar)
                      ).format("MMM Do YY")}
                    </span>
                  </li>
                  <li className="checkoutListDatesItem">
                    <span className="checkoutListDatesItemSN">Check-out date</span>
                    <span>
                      {moment(
                        new Date(data.checkOutCalendar)
                      ).format("MMM Do YY")}
                    </span>
                  </li>
            </div>} */}
        <ul className="checkoutListBilling">
          <div className="checkoutListBillingTitle">Billing details</div>
          <li className="checkoutListBillingItem">
            <span className="checkoutListBillingItemTitle">First name</span>{" "}
            <span className="checkoutListBillingItemValue">
              {data?.billingDetails?.firstName}
            </span>
          </li>
          <li className="checkoutListBillingItem">
            <span className="checkoutListBillingItemTitle">Surname</span>{" "}
            <span className="checkoutListBillingItemValue">
              {data?.billingDetails?.surname}
            </span>
          </li>
          <li className="checkoutListBillingItem">
            <span className="checkoutListBillingItemTitle">Email</span>{" "}
            <span className="checkoutListBillingItemValue">
              {data?.billingDetails?.email}
            </span>
          </li>
          <li className="checkoutListBillingItem">
            <span className="checkoutListBillingItemTitle">Phone number</span>{" "}
            <span className="checkoutListBillingItemValue">
              {data?.billingDetails?.phone}
            </span>
          </li>
          <li className="checkoutListBillingItem">
            <span className="checkoutListBillingItemTitle">Address</span>{" "}
            <span className="checkoutListBillingItemValue">
              {data?.billingDetails?.address}
            </span>
          </li>
        </ul>
        <ul className="checkoutListSummary">
          <div className="checkoutListSummaryTitle">Transaction IDs</div>
          {transactionDetails.map(
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
                  <div className="checkoutListSummaryItemName">{item.name}</div>
                  <div className="checkoutListSummaryItemValue">
                    {item.value}
                  </div>
                </li>
              )
          )}
        </ul>
        <ul className="checkoutListSummary">
          <div className="checkoutListSummaryTitle">Cost details</div>
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
                  <div className="checkoutListSummaryItemName">{item.name}</div>
                  <div className="checkoutListSummaryItemValue">
                    {item.value}
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
      {["canceled", "falied", "abandoned", "reversed"].includes(info) ? (
        <a
          href={`https://checkout.paystack.com/${data?.reference}`}
          className="checkoutBtn"
        >
          Retry payment
        </a>
      ) : ["pending", "processing", "ongoing", "queued"].includes(info) ? (
        <div className="checkoutBtn">Please wait...</div>
      ) : (
        info === "success" && (
          <div onClick={shareHandler} className="checkoutBtn">
            Share receipt
          </div>
        )
      )}
    </div>
  ) : (
    ""
  );
};

export default Receipt;
