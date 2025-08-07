import {
  IoArrowDown,
  IoArrowForward,
  IoArrowUp,
  IoPeople,
} from "react-icons/io5";
import { formattedAmount } from "./numberFormatter";

export function percentageCalculation({ target, result }) {
  const soulCalculation = ({ target, result }) => {
    return formattedAmount({ amount: result - target });
  };

  const percentage = ({ target, result }) => {
    let res = formattedAmount({ amount: (result * 100) / target });
    return res <= 20 ? (
      <div className="percentageTemplate">
        <IoArrowDown className=" rightTargetIcon arrowDownColor" />{" "}
        <span className="rightTargetIconTitle">
          {soulCalculation({ target, result })}
        </span>{" "}
        <IoPeople className=" rightTargetIcon arrowDownColor" />
      </div>
    ) : res <= 50 ? (
      <div className="percentageTemplate">
        <IoArrowForward className=" rightTargetIcon arrowUpColorMedium" />{" "}
        <span className="rightTargetIconTitle">
          {soulCalculation({ target, result })}
        </span>{" "}
        <IoPeople className=" rightTargetIcon arrowDownColor" />
      </div>
    ) : res <= 70 ? (
      <div className="percentageTemplate">
        <IoArrowUp className=" rightTargetIcon arrowUpColorAverage" />{" "}
        <span className="rightTargetIconTitle">
          {soulCalculation({ target, result })}
        </span>{" "}
        <IoPeople className=" rightTargetIcon arrowDownColor" />
      </div>
    ) : res <= 100 ? (
      <div className="percentageTemplate">
        <IoArrowUp className=" rightTargetIcon arrowUpColorGood" />{" "}
        <span className="rightTargetIconTitle">
          {soulCalculation({ target, result })}
        </span>{" "}
        <IoPeople className=" rightTargetIcon arrowDownColor" />
      </div>
    ) : (
      res > 100 && (
        <div className="percentageTemplate">
          <IoArrowUp className=" rightTargetIcon arrowUpColorExcellent" />{" "}
          <span className="rightTargetIconTitle">
            {soulCalculation({ target, result })}
          </span>{" "}
          <IoPeople className=" rightTargetIcon arrowDownColor" />
        </div>
      )
    );
  };

  return percentage;
}
