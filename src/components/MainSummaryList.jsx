import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";

const MainSummaryList = () => {
  const { summarizedList } = useContext(DataContext);
  const navigate = useNavigate();
  const goToUpdate = () => {
    navigate("/update");
  };

  const today = new Date();
  const nextWeek = today.setDate(today.getDate() + 7);

  const nextWeekList = summarizedList.filter(
    (item) => new Date(item.date) < nextWeek
  );

  return (
    <div className="main-summary">
      <div className="main-summary-title">
        <h3>Upcoming Fitness Plans</h3>
        <button className="btn btn-summary" onClick={goToUpdate}>
          Go to details
        </button>
      </div>
      <ul className="list-group">
        {nextWeekList.length === 0 ? (
          <li>No plan has been created yet</li>
        ) : (
          nextWeekList.map((item, index) => (
            <li key={index} className="list-group-item summary-list">
              <div>{item.date}</div>
              <div>{Array.from(new Set(item.category)).join(" | ")}</div>
              <div>{item.name.length} exercises</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default React.memo(MainSummaryList);
