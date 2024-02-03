import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { getFormattedDate } from "../utils/utils";

const MainCalendar = ({ showModal }) => {
  const [date, setDate] = useState(null);

  function updateClickedDate(clickedDate) {
    setDate(getFormattedDate(clickedDate));
    showModal(date);
  }
  
  return (
    <div className="card flex justify-content-center main-calendar">
      <Calendar
        value={date}
        onChange={(e) => updateClickedDate(e.value)}
        inline
      />
    </div>
  );
};

export default MainCalendar;
