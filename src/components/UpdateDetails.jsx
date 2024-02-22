import { useState } from "react";
import { updateIsDoneDB } from "../data/firebase";
import PlanModal from "./PlanModal";

const UpdateDetails = ({ filteredList, detailOpen }) => {
  const [updatedList, setUpdatedList] = useState(filteredList);
  const [progressSaved, setProgressSaved] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Update status of completion checkbox when clicked
  const handleCheckbox = (id, checked) => {
    setUpdatedList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDone: checked } : item))
    );
  };

  // Update isDone status in DB and calculate progress when clicked Save
  const sendCheckboxIdToDB = (lists) => {
    updateIsDoneDB(lists);
    getProgress();
  };

  const getProgress = () => {
    const checkedItems = updatedList.filter((item) => item.isDone);
    const progress = Math.round(
      (checkedItems.length / updatedList.length) * 100
    );
    if (checkedItems.length === 0) {
      setProgressSaved(false);
    } else {
      setProgressSaved(true);
      setProgressMsg(progress);
    }
  };

  // Update modal status when clicked Finish
  const handleFinishClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div
        className="text-center detail-list"
        style={{ display: detailOpen ? "block" : "none" }}
      >
        <div className="detail-list-plan">
          <div className="row-head">
            <div className="column">Category</div>
            <div className="column">Name</div>
            <div className="column">Sets</div>
            <div className="column">Minutes</div>
            <div className="column">Weight(kg)</div>
            <div className="column">Completion</div>
          </div>
          {updatedList.map((item) => (
            <div key={item.id} className="row-body">
              <div className="column small-screen-col">
                <div className="small-screen-head">Category</div>
                <div>{item.category}</div>
              </div>
              <div className="column small-screen-col">
                <div className="small-screen-head">Name</div>
                <div>{item.name}</div>
              </div>
              <div className="column small-screen-col">
                <div className="small-screen-head">Sets</div>
                <div> {item.sets}</div>
              </div>
              <div className="column small-screen-col">
                <div className="small-screen-head">Minutes</div>
                <div>{item.minutes}</div>
              </div>
              <div className="column small-screen-col">
                <div className="small-screen-head">Weight(kg)</div>
                <div>{item.weight}</div>
              </div>
              <div className="column small-screen-col">
                <div className="small-screen-head">Completion</div>
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={(e) => {
                    handleCheckbox(item.id, e.target.checked);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="detail-list-finish">
          <div className="result-msg">
            {progressSaved && `${progressMsg}% of the plan completed`}
          </div>
          <div className="detail-list-btns">
            <button
              type="button"
              className="btn btn-update"
              onClick={() => sendCheckboxIdToDB(updatedList)}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-finish"
              onClick={handleFinishClick}
            >
              Finish Exercises
            </button>
          </div>
        </div>
      </div>
      <PlanModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        type="finish"
        message="Are you sure to finish? Closed data will not be returned."
        data={updatedList}
      />
    </>
  );
};

export default UpdateDetails;
