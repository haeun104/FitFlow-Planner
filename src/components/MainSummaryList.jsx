import { useContext } from "react";
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
  const nextWeekTimestamp = new Date(nextWeek).getTime();

  const nextWeekList = summarizedList.filter(
    (item) => new Date(item.date) < nextWeekTimestamp
  );

  return (
    <div className="main-summary">
      <div className="main-summary-title">
        <h3>Upcoming Fitness Plans</h3>
        <button className="btn btn-summary" onClick={goToUpdate}>
          Go to details
        </button>
      </div>
      {nextWeekList.map((item, index) => (
        <ul key={index} className="summary-list">
          <li className="summary-list-date">{item.date}</li>
          <li className="summary-list-category">{item.category.join(" | ")}</li>
          <li className="summary-list-ex">{item.name.length} exercises</li>
        </ul>
      ))}
    </div>
  );
};

export default MainSummaryList;
