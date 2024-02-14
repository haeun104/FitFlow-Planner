import Calendar from "react-calendar";
import { useState } from "react";
import { getFormattedDate } from "../utils/utils";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const MainCalendar = ({ updateClickedDate, dbList }) => {
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  // DB 데이터에서 close 여부 구분
  const completeDays = dbList.filter((item) => item.isClosed);
  const incompleteDays = dbList.filter((item) => !item.isClosed);

  const listOfcompleteDays = [
    ...new Set(completeDays.map((item) => item.date)),
  ];
  const listOfIncompleteDays = [
    ...new Set(incompleteDays.map((item) => item.date)),
  ];

  const clickDate = (date) => {
    const formattedDate = getFormattedDate(date);
    setDate(date);
    updateClickedDate(formattedDate);
    if (
      !listOfIncompleteDays.includes(formattedDate) &&
      !listOfcompleteDays.includes(formattedDate)
    ) {
      navigate("/new");
    }
  };

  const addClass = ({ date }) => {
    if (listOfcompleteDays.includes(getFormattedDate(date))) {
      return <div className="completeDay"></div>;
    }
    if (listOfIncompleteDays.includes(getFormattedDate(date))) {
      return <div className="incompleteDay"></div>;
    }
  };

  return (
    <div className="main-calendar">
      <Calendar value={date} onChange={clickDate} tileContent={addClass} />
      <div className="main-calendar-info">
        <div className="complete-day">
          <span className="circle"></span>
          <p>Complete day</p>
        </div>
        <div className="planned-day">
          <span className="circle"></span>
          <p>Planned day</p>
        </div>
      </div>
      <div className="completion-ratio">
        This month's average completion ratio: <span></span>
      </div>
    </div>
  );
};

export default MainCalendar;
