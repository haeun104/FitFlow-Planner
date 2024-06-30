import Calendar from "react-calendar";
import React, { useContext, useEffect, useState } from "react";
import { getFormattedDate, getFormattedMonth } from "../utils/utils";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import PropTypes from "prop-types";

const MainCalendar = ({ updateClickedDate }) => {
  const { dbList } = useContext(DataContext);
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrenMonth] = useState(
    getFormattedMonth(new Date())
  );
  const [completionRatio, setCompletionRatio] = useState(0);

  const navigate = useNavigate();

  // Variables of incomplete and complete plans
  const completeDays = dbList.filter((item) => item.isClosed);
  const incompleteDays = dbList.filter((item) => !item.isClosed);

  const listOfcompleteDays = [
    ...new Set(completeDays.map((item) => item.date)),
  ];
  const listOfIncompleteDays = [
    ...new Set(incompleteDays.map((item) => item.date)),
  ];

  // Deliver the clicked date or move to the add page
  const clickDate = (date) => {
    const formattedDate = getFormattedDate(date);
    setDate(date);
    updateClickedDate(formattedDate);
    const existingDateInDb = dbList.filter(
      (item) => item.date === formattedDate
    );
    if (existingDateInDb.length === 0) {
      navigate(`/new/${formattedDate}`);
    }
  };

  // Update completion ration when currentMonth is changed
  useEffect(() => {
    const currentMonthData = dbList.filter(
      (item) => item.isClosed && item.date.substring(0, 7) === currentMonth
    );
    const completePlans = currentMonthData.filter((item) => item.isDone);
    setCompletionRatio(
      Math.round((completePlans.length / currentMonthData.length) * 100)
    );
  }, [currentMonth, dbList]);

  // Update currentMonth when viewing month is changed
  const updateCurrentMonth = ({ activeStartDate }) => {
    setCurrenMonth(getFormattedMonth(activeStartDate));
  };

  // Create class based on close status
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
      <Calendar
        value={date}
        onChange={clickDate}
        tileContent={addClass}
        onActiveStartDateChange={updateCurrentMonth}
      />
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
        This month&apos;s average completion ratio:{" "}
        <span>{completionRatio || 0} %</span>
      </div>
    </div>
  );
};

MainCalendar.propTypes = {
  updateClickedDate: PropTypes.string.isRequired,
};

export default React.memo(MainCalendar);
