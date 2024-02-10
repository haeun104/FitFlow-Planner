import Calendar from "react-calendar";
import { useState } from "react";
import { getFormattedDate } from "../utils/utils";
import "react-calendar/dist/Calendar.css";

const MainCalendar = ({ updateClickedDate, dbList }) => {
  const [date, setDate] = useState(new Date());

  const randomDate = "2024-02-02";

  const completeDays = dbList.filter((item) => item.isCompleted);
  const incompleteDays = dbList.filter((item) => !item.isCompleted);

  const listOfcompleteDays = [
    ...new Set(completeDays.map((item) => item.date)),
  ];
  const listOfIncompleteDays = [
    ...new Set(incompleteDays.map((item) => item.date)),
  ];

  const clickDate = (date) => {
    console.log(date);
    setDate(date);
    updateClickedDate(getFormattedDate(date));
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
    </div>
  );
};

export default MainCalendar;
