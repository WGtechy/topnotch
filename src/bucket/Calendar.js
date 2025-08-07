import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";

const _date = new Date()
export default function Calendar({
  unavailableDates,
  handleSelectedDays,
  viewOnly,
  selection,
  setCalendarSubtitle,
  isUser
}) {
  //   const daysTag = document.querySelector(".days"),
  // currentDate = document.querySelector(".current-date");
  // prevNextIcon = document.querySelectorAll(".icons span");
  // getting new date, current year and month
  let [date, setDate] = useState(new Date());
  const today = useRef(new Date());
  let [currentDate, setCurrentDate] = useState("");
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());
  const [dateData, setDateData] = useState([]);
  // storing full name of all months in array
  useEffect(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setDateData([]);

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
   
      for (let i = firstDayofMonth; i > 0; i--) {
        // creating li of previous month last days
        
        let unavailable = unavailableDates?.find(
          (x) =>
            x?.day === lastDateofLastMonth - i + 1 &&
          x?.month === currMonth &&
          x.year === currYear
        );

        // let previousDays = new Date() > new Date(currYear, currMonth, 1)
       const className=unavailable
       ? unavailable?.isUser
         ? "activeUser"
         : "inactive"
       : "inactive";

        setDateData((prev) => [
        ...prev,
        {
          // className,
          className,
          day: lastDateofLastMonth - i + 1,
          month: currMonth,
          year: currYear,
          fromServer: unavailable?.fromServer || false,
        },
      ]);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      // creating li of all days of current month
      // adding active className to li if the current day, month, and year matched
      // let isToday = i === date.getDate() && currMonth === new Date().getMonth()
      //              && currYear === new Date().getFullYear() ? "active" : "";
      let unavailable = unavailableDates?.find(
        (x) => x?.day === i && x?.month === currMonth && x.year === currYear
      );

      setDateData((prev) =>{
        let obj = {
          className: unavailable
            ? unavailable?.isUser
              ? "activeUser"
              : "active"
            : "",
          day: i,
          month: currMonth,
          year: currYear,
          fromServer: unavailable?.fromServer || false,
        }
        return [...prev, obj ]});
    }
    for (let i = lastDayofMonth; i < 6; i++) {
      // creating li of next month first days
      let unavailable = unavailableDates?.find(
        (x) =>
          x?.day === i - lastDateofMonth + 1 &&
          x?.month === currMonth &&
          x.year === currYear
      );
      const lastDates = i - lastDateofMonth + 1;
      setDateData((prev) => [
        ...prev,
        {
          className: unavailable
            ? unavailable?.isUser
              ? "activeUser"
              : "inactive"
            : "inactive",
          day: lastDates ? "" : lastDates,
          month: currMonth,
          year: currYear,
          fromServer: unavailable?.fromServer || false,
        },
      ]);
    }
    setCurrentDate(`${months[currMonth]} ${currYear}`); // passing current mon and yr as currentDate text
  }, [currMonth, currYear, unavailableDates, date]);

  const handleBtn = useCallback(
    (item) => () => {
      if (item === "next") {
        setCurrMonth((prev) => {
          let newMonth, newYear, newDate;
          if (prev === 11) {
            newMonth = 0;
            newYear = date.getFullYear() + 1;
            newDate = new Date(newYear, 0, 1);
            setDate(newDate); // pass the current date as date value
            setCurrYear(newYear); // updating current year with new date year
          } else {
            // setDate(new Date()); // pass the current date as date value
            newMonth = prev + 1;
            newYear = date.getFullYear(); // updating current year with new date year
            // newDate = new Date()
            //     setDate(new Date()); // pass the current date as date value
            setCurrYear(newYear); // updating current year with new date year
          }
          return newMonth;
        });

        //   if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
        //     // creating a new date of current year & month and pass it as date value
        //     setDate(new Date(date.getFullYear() + 1, date.getMonth() + 1, 1));
        //     setCurrYear(date.getFullYear() + 1); // updating current year with new date year
        //     setCurrMonth(0); // updating current month with new date month
        // } else {
        //     setDate(new Date()); // pass the current date as date value
        // }
      }
      if (item === "prev") {
        setCurrMonth((prev) => {
          let newMonth, newYear, newDate;
          if (prev === 0) {
            newMonth = 11;
            newYear = date.getFullYear() - 1;
            setCurrYear(newYear); // updating current year with new date year
            newDate = new Date(newYear, 11, 1);
            setDate(newDate); // pass the current date as date value
          } else {
            newMonth = prev - 1;
            newYear = date.getFullYear(); // updating current year with new date year
            setCurrYear(newYear); // updating current year with new date year
          }
          return newMonth;
        });
      }
    },
    [date]
  );

  const handleClickedDay = useCallback(
    (item) => () => {
      if (!item?.fromServer) {
        if(item.className === 'inactive'){
          // setCurrMonth((prev) => {
          //   let newMonth, newYear, newDate;
          //   if (prev === 0) {
          //     newMonth = 11;
          //     newYear = date.getFullYear() - 1;
          //     setCurrYear(newYear); // updating current year with new date year
          //     newDate = new Date(newYear, 11, 1);
          //     setDate(newDate); // pass the current date as date value
          //   } else {
          //     newMonth = prev - 1;
          //     newYear = date.getFullYear(); // updating current year with new date year
          //     setCurrYear(newYear); // updating current year with new date year
          //   }
          //   return newMonth;
          // });
          return
        } else{
          let proceed = false;
          let _date = new Date()
          if(new Date(item.year, item.month, item.day) - new Date(_date.getFullYear(), _date.getMonth(), _date.getDate()) >= 0){
            proceed = true
          }
          if(proceed){
            handleSelectedDays({
              day: item?.day,
              month: item?.month,
              year: item?.year,
              isUser,
              id: `${item?.day}-${item?.month}-${item.year}`,
            });
          } else {
            setCalendarSubtitle('Select a current date')
          }
        }
      }
    },
    [handleSelectedDays, setCalendarSubtitle, isUser]
  );

  return (
    <div className="wrapper">
      <header>
        <div className="icons">
          {/* {(currMonth > today.current.getMonth() ||
            currYear > today.current.getFullYear()) && ( */}
            <span
              id="prev"
              className="material-symbols-rounded"
              onClick={handleBtn("prev")}
            >
              <PiArrowLeft />
            </span>
          {/* )} */}
        <p className="current-date">{currentDate}</p>
          <span
            id="next"
            className="material-symbols-rounded"
            onClick={handleBtn("next")}
          >
            <PiArrowRight />
          </span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">
          {dateData?.length &&
            dateData?.map(
              (item, i) =>
                item?.month === currMonth && (
                  <li
                    key={i}
                    className={new Date(item.year, item.month, item.day - 1) < new Date(_date.getFullYear(), _date.getMonth(), _date.getDate() - 1) ? "inactive" : item.className}
                    onClick={selection ? handleClickedDay(item) : null}
                    title={new Date(item.year, item.month, item.day) < new Date() ? viewOnly ? "Unavailable day" : 'You can not select past days' : 'Select'}
                  >
                    {item.day}
                  </li>
                )
            )}
        </ul>
      </div>
    </div>
  );
}
