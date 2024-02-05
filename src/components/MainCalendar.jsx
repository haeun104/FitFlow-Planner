import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { getFormattedDate } from "../utils/utils";

const MainCalendar = ({ updateClickedDate }) => {
  const [date, setDate] = useState(null);

  const clickDate = (e) => {
    setDate(getFormattedDate(e.target.value));
    updateClickedDate(getFormattedDate(e.target.value));
  };

  return (
    <div className="card flex justify-content-center main-calendar">
      {/* <Calendar value={date} onChange={(e) => clickDate(e.value)} inline /> */}
      <Calendar value={date} onChange={clickDate} inline />
    </div>
  );
};

export default MainCalendar;
