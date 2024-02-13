import { useState } from "react";
import { updateIsDoneDB, updateIsClosedDB } from "../data/firebase";

const UpdateDetails = ({ filteredList, detailOpen }) => {
  const [updatedList, setUpdatedList] = useState(filteredList);
  const [progressSaved, setProgressSaved] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");

  // 완료 체크박스를 클릭할 경우 체크된 아이템의 state를 변경
  const handleCheckbox = (id, checked) => {
    setUpdatedList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDone: checked } : item))
    );
  };

  // Save를 클릭할 경우 진척 %를 업데이트, DB에 데이터를 업데이트
  const sendCheckboxIdToDB = (lists) => {
    updateIsDoneDB(lists);
    getProgress();
  };

  const getProgress = () => {
    const checkedItems = updatedList.filter((item) => item.isDone);
    const progress = Math.round(
      (checkedItems.length / updatedList.length) * 100
    );
    setProgressSaved(true);
    setProgressMsg(progress);
  };

  // Finish 클릭할 경우 DB에 클로징 처리
  const handleFinishClick = (lists) => {
    updateIsClosedDB(lists);
  };

  return (
    <div
      className="container text-center detail-list"
      style={{ display: detailOpen ? "block" : "none" }}
    >
      <div className="row">
        <div className="col">Category</div>
        <div className="col">Name</div>
        <div className="col">Sets</div>
        <div className="col">Minutes</div>
        <div className="col">Weight(kg)</div>
        <div className="col">Completion</div>
      </div>
      {filteredList.map((item) => (
        <div key={item.id} className="row">
          <div className="col">{item.category}</div>
          <div className="col">{item.name}</div>
          <div className="col">{item.sets}</div>
          <div className="col">{item.minutes}</div>
          <div className="col">{item.weight}</div>
          <div className="col">
            <input
              type="checkbox"
              onChange={(e) => {
                handleCheckbox(item.id, e.target.checked);
              }}
            />
          </div>
        </div>
      ))}
      <div className="row detail-list-finish">
        <div className="col result-msg">
          {progressSaved && `${progressMsg}% of the plan completed`}
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-save"
            onClick={() => sendCheckboxIdToDB(updatedList)}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-finish"
            onClick={() => handleFinishClick(filteredList)}
          >
            Finish Exercises
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
