import { useNavigate } from "react-router-dom";

const MainSummaryList = ({ summarizedList }) => {
  const navigate = useNavigate();
  const goToUpdate = () => {
    navigate("/update");
  };

  return (
    <div className="main-summary">
      <div className="main-summary-title">
        <h3>Upcoming Fitness Plan</h3>
        <button className="btn btn-summary" onClick={goToUpdate}>
          Go to details
        </button>
      </div>
      {summarizedList.map((item, index) => (
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
