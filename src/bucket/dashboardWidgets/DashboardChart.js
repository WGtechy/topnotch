import React, { useCallback, useState } from "react";
import { months, years } from "../../utilities-config/generalUtilities";
import { IoChevronDown } from "react-icons/io5";
import DropDownSelect from "../DropDownSelect";
import moment from "moment";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const DashboardChart = ({ data }) => {
  const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const [openMonths, setOpenMonths] = useState(false);
  const [openYears, setOpenYears] = useState(false);
  const handleMonth = useCallback((item) => ()=>{
    setMonth(item.value);
    setOpenMonths(false);
  }, []);
  const handleYear = useCallback((item) => ()=>{
    setYear(item.value);
    setOpenYears(false);
  }, []);

  function handleSelectMonth() {
    setOpenMonths((prev) => !prev);
    setOpenYears(false);
  }
  function handleSelectYear() {
    setOpenYears((prev) => !prev);
    setOpenMonths(false);
  }
  function handleCloseOverlay() {
    setOpenMonths(false);
    setOpenYears(false);
  }
  return (
    <>
      <div
        className={openMonths || openYears ? "overlay" : ""}
        onClick={handleCloseOverlay}
      ></div>
      <div className="dashboardChart">
        <div className="dashboardChartHeading">
          <div className="dashboardChartHeadingTitle"> Earnings </div>
          <div className="dashboardChartHeadingDate">
            <div className="dashboardChartHeadingDateMonth">
              <div
                className="dashboardChartHeadingDateMonthTop"
                onClick={handleSelectMonth}
              >
                <span className="dashboardChartHeadingDateMonthTopContent">
                  {moment(month).format("MMMM")}
                </span>{" "}
                <span className="dashboardChartHeadingDateMonthTopIcon">
                  <IoChevronDown />
                </span>{" "}
              </div>
    <ul
      className={openMonths ? "openDrop dropdownSelect" : "closeDrop dropdownSelect"}
                style={{ position: "relative !important" }}
    >
      {months.map((item, i) => (
        <li onClick={handleMonth(item)} className="dropdownSelectItem" key={i}>
          {item?.symbol && <span>{item.symbol}</span>} {item.name}{" "}
        </li>
      ))}
    </ul>
            </div>
            <div className="dashboardChartHeadingDateYear">
              <div
                className="dashboardChartHeadingDateYearTop"
                onClick={handleSelectYear}
              >
                <span className="dashboardChartHeadingDateYearTopContent">
                  {moment(year).format("YYYY")}
                </span>{" "}
                <span className="dashboardChartHeadingDateYearIcon">
                  <IoChevronDown />
                </span>{" "}
              </div>
              <ul
      className={openYears ? "openDrop dropdownSelect" : "closeDrop dropdownSelect"}
                style={{ position: "relative !important" }}
    >
      {years.map((item, i) => (
        <li onClick={handleYear(item)} className="dropdownSelectItem" key={i}>
          {item?.symbol && <span>{item.symbol}</span>} {item.name}{" "}
        </li>
      ))}
    </ul>
            </div>
          </div>
        </div>
        <div className="dashboardChartContent">
          {!!data.length ? (
            <AreaChart
              width={1200}
              height={300}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="data"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          ) : (
            <div className="dashboardChartContentEmpty">No Earnings</div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardChart;
