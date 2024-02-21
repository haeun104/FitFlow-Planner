import Calendar from "react-calendar";
import React, { useContext, useEffect, useState } from "react";
import { getFormattedDate, getFormattedMonth } from "../utils/utils";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";

const MainCalendar = ({ updateClickedDate }) => {
  const { dbList } = useContext(DataContext);
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrenMonth] = useState(
    getFormattedMonth(new Date())
  );
  const [completionRatio, setCompletionRatio] = useState(0);

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

  // 특정 날짜 선택 시 해당 날짜를 메인 페이지로 전달, DB에 없을 시 생성 페이지로 이동
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

  // currentMonth가 바뀔때 마다 해당 월의 ratio 업데이트
  useEffect(() => {
    const currentMonthData = dbList.filter(
      (item) => item.isClosed && item.date.substring(0, 7) === currentMonth
    );
    const completePlans = currentMonthData.filter((item) => item.isDone);
    setCompletionRatio(
      Math.round((completePlans.length / currentMonthData.length) * 100)
    );
  }, [currentMonth]);

  //월 이동 시 currentMonth 업데이트
  const updateCurrentMonth = ({ activeStartDate }) => {
    setCurrenMonth(getFormattedMonth(activeStartDate));
  };

  // 계획 달성 여부에 따라 클래스 생성
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
        This month's average completion ratio:{" "}
        <span>{completionRatio || 0} %</span>
      </div>
    </div>
  );
};

export default React.memo(MainCalendar);
