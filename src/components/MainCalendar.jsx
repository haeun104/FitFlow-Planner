import Calendar from "react-calendar";
import { useState } from "react";
import { getFormattedDate } from "../utils/utils";
import 'react-calendar/dist/Calendar.css';

const MainCalendar = ({ updateClickedDate }) => {
  const [date, setDate] = useState(new Date());

  const randomDate = "2024-02-02";

  const clickDate = (date) => {
    console.log(date);
    setDate(date);
    updateClickedDate(getFormattedDate(date));
  };

  const addClass = ({ date }) => {
    if (getFormattedDate(date) === randomDate) {
      return "sampleStyling";
    }
  };

  return (
    <div className="main-calendar">
      <Calendar value={date} onChange={clickDate} tileClassName={addClass} />
    </div>
  );
};

export default MainCalendar;
