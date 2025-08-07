import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Calendar from "../../../../../bucket/Calendar";

const date = new Date();

const CalendarComponent = ({
  product,
  setCheckInCalendar,
  setCheckOutCalendar,
  checkInCalendar,
  checkOutCalendar,
  setTotalAmount,
  viewOnly,
  setTotalCount,
  checkInDates,
  setCheckInDates,
  setCheckoutErrorMessage,
}) => {
  const [switchSession, setSwitchSession] = useState(true);

  const [calendarSubtitle, setCalendarSubtitle] = useState("");
  const [calendarTitle, setCalendarTitle] = useState("No date selections yet.");

  useEffect(() => {
    if (product) {
      if (product?.minimumPurchase) {
        setCalendarSubtitle(`Minimum stay is ${product?.minimumPurchase}`);
      }
    }
  }, [product]);

  const populateDays = useCallback(
    (period) => {
      let _date = new Date(checkInCalendar);
      for (let i = 0; i <= period; i++) {
        let obj = {
          day: new Date(
            _date.getFullYear(),
            _date.getMonth(),
            _date.getDate() + i
          ).getDate(),
          month: new Date(
            _date.getFullYear(),
            _date.getMonth(),
            _date.getDate() + i
          ).getMonth(),
          year: new Date(
            _date.getFullYear(),
            _date.getMonth(),
            _date.getDate() + i
          ).getFullYear(),
        };
        setCheckInDates((prev) => {
          prev = [...prev, obj];
          return prev;
        });
      }
    },
    [checkInCalendar, setCheckInDates]
  );

  const handleSelectedDays = async (item) => {
    let check;
    if (!!product?.unavailableDates?.length) {
      check = product?.unavailableDates.find((x) => x.id === item.id);
    }
    if (check) {
      return;
    } else {
      // compute the start date and end date before you segment the individual dates.
      if (switchSession) {
        setCheckInCalendar(new Date(item?.year, item?.month, item?.day));
        setCalendarTitle("Select your checkout date");
        if (product?.minimumPurchase) {
          setCalendarSubtitle(`Minimum stay is ${product?.minimumPurchase}`);
        } else {
          setCalendarSubtitle("");
        }
        setCheckOutCalendar(null);
        setTotalCount(0);
        setCheckInDates([]);
        setTotalAmount(0);
        setCheckoutErrorMessage("");
        setSwitchSession((prev) => !prev);
      } else {
        // check if the selected item is greater than the check in
        let _date = new Date(item?.year, item?.month, item?.day);
        let _in = new Date(checkInCalendar);
        let initIn = _in;
        let initOut = _date;
        let compareDate = 0;
        function calc({ initIn }) {
          compareDate++;
          initIn = new Date(
            initIn.getFullYear(),
            initIn.getMonth(),
            initIn.getDate() + 1
          );
          if (initOut - initIn > 0) {
            calc({ initIn });
          } else {
            // Run code
            if (product?.minimumPurchase) {
              if (compareDate >= product?.minimumPurchase) {
                setCheckOutCalendar(_date);
                // setCalendarSubtitle(`Minimum stay is ${product?.minimumPurchase}, select your checkout date.`)
                setCalendarSubtitle(
                  `${moment(checkInCalendar).format("ll")} - ${moment(
                    _date
                  ).format("ll")}`
                );
                setCheckOutCalendar(_date);
                setCalendarTitle(`${compareDate} nights selected`);
                setTotalCount(compareDate);
                populateDays(compareDate);
              } else {
                if (compareDate > 0) {
                  setCheckOutCalendar(_date);
                  setCalendarTitle(
                    `${compareDate} nights selected, but not enough.`
                  );
                  setCalendarSubtitle(
                    `Minimum stay is ${product?.minimumPurchase}`
                  );
                  setTotalCount(compareDate);
                  setCheckoutErrorMessage(
                    `Minimum stay is ${product?.minimumPurchase}. Add more days in the calendar`
                  );
                  populateDays(compareDate);
                } else {
                  setCalendarTitle("Select a valid checkout date.");
                  setTotalCount(0);
                  setCheckInDates([]);
                }
              }
            } else {
              if (compareDate > 0) {
                setCheckOutCalendar(_date);
                setCalendarSubtitle(
                  `${moment(checkInCalendar).format("ll")} - ${moment(
                    checkOutCalendar
                  ).format("ll")}`
                );
                setCalendarSubtitle(
                  `${moment(checkInCalendar).format("ll")} - ${moment(
                    checkOutCalendar
                  ).format("ll")}`
                );
                setCalendarTitle(`${compareDate} nights selected`);
                setTotalCount(compareDate);
                populateDays(compareDate);
              } else {
                setCalendarTitle("Select a valid checkout date");
                setTotalCount(0);
                setCheckInDates([]);
              }
            }
            setTotalAmount(compareDate * product?.price);

            return compareDate;
          }
        }
        calc({ initIn });
        setSwitchSession((prev) => !prev);
      }
    }
  };

  const executeOnce = useRef(true);
  useEffect(() => {
    if (checkInCalendar && checkOutCalendar && executeOnce.current) {
      let period =
        new Date(checkOutCalendar).getDate() -
        new Date(checkInCalendar).getDate();
      if (period >= product?.minimumPurchase) {
        populateDays(period);
      } else if (!product?.minimumPurchase && period > 0) {
        populateDays(period);
      } else {
        return;
      }
      return () => (executeOnce.current = false);
    }
  }, [checkInCalendar, checkOutCalendar, populateDays, product]);

  const calendarProps = {
    unavailableDates: !!product?.unavailableDates?.length
      ? [...product?.unavailableDates, ...checkInDates]
      : checkInDates,
    handleSelectedDays,
    selection: viewOnly ? false : true,
    checkInDates,
    viewOnly,
    isUser: true,
    setCalendarSubtitle,
  };

  return (
    <div className="productInfoCalendar" id="Calendar">
      {!viewOnly && (
        <div className="productInfoCalendarHeader">
          <div className="productInfoCalendarHeaderTitle">
            {/* {checkOutCalendar ? `${new Date(checkOutCalendar)?.getDate()} nights selected` : "Select your stay period"}{" "} */}
            {calendarTitle}
          </div>
          {product?.minimumPurchase && (
            <div className="productInfoCalendarHeaderInfo">
              {calendarSubtitle}
              {/* {new Date(checkOutCalendar).getDate() - new Date(checkInCalendar).getDate() <
                    product?.minimumPurchase
                      ? `Minimum stay is ${product?.minimumPurchase}`
                      : `${moment(checkInCalendar).format("ll")} - ${moment(
                          checkOutCalendar
                        ).format("ll")}`} */}
            </div>
          )}
        </div>
      )}
      <Calendar {...calendarProps} />
    </div>
  );
};

export default CalendarComponent;
