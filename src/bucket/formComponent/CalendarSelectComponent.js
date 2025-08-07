import React, { useCallback, useState } from "react";
import Calendar from "../Calendar";

const CalendarSelectComponent = ({
  unavailableDates,
  title,
  setCheckInDates,
  isUser,
  selection,
}) => {
  const [duplicateUnavail, setDuplicateUnavail] = useState(unavailableDates);
  const handleSelectedDays = useCallback(
    (item) => {
      setCheckInDates((prev) => {
        let selected = prev.find(
          (x) =>
            x.day === item.day && x.month === item.month && x.year === item.year
        );
        if (selected) {
          prev = prev.filter((x) => x?.id !== selected.id);
          setDuplicateUnavail((prev) =>
            prev.filter((x) => x?.id !== selected.id)
          );
        } else {
          setDuplicateUnavail((prev) => [item, ...prev]);
          prev = [item, ...prev];
        }
        return prev;
      });
    },
    [setCheckInDates]
  );

  return (
    <div className="modalContent">
      <div className="dateWrapper">
        <div className="dateWrapperContent">
          <div className="dateWrapperContentRight">
            <Calendar
              unavailableDates={duplicateUnavail}
              handleSelectedDays={handleSelectedDays}
              selection={selection}
              title={title}
              isUser={isUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSelectComponent;
