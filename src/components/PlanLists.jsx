import { useContext, useEffect, useState } from "react";
import PlanModal from "./PlanModal";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";

const PlanLists = ({
  validCheck,
  multipleList,
  setMultipleList,
  handleDataToDb,
  type,
}) => {
  const [finalList, setFinalList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { dbList } = useContext(DataContext);

  useEffect(() => {
    setFinalList(multipleList);
    setError("");
  }, [multipleList]);

  //  삭제 버튼 클릭 시 목록에서 삭제
  const deleteList = (index) => {
    const newArray = [...multipleList];
    newArray.splice(index, 1);
    setMultipleList(newArray);
  };

  // 취소 버튼 클릭 시 이전 페이지로 돌아감
  const goBack = () => {
    navigate(-1);
  };

  const checkExistingDate = (list) => {
    const date = [...new Set(list.map((item) => item.date))].join();
    const existingDate = dbList.filter((item) => item.date === date).length;
    return existingDate > 0 ? true : false;
  };

  const handleSaveClick = (list) => {
    if (type === "new") {
      if (checkExistingDate(list)) {
        setError("Plan already exists on this day.");
      } else {
        handleDataToDb(list);
        setFinalList([]);
        setModalOpen(true);
      }
    } else {
      handleDataToDb(list);
      setFinalList([]);
      setModalOpen(true);
    }
  };

  return (
    <>
      {validCheck ? (
        <div className="added-exercises">
          <h3 className="added-exercises-title">Added Exercises</h3>
          <div className="row row-cols-5">
            <div className="col">Name</div>
            <div className="col">Sets</div>
            <div className="col">Minutes</div>
            <div className="col">Weight(kg)</div>
            <div className="col">Delete</div>
          </div>
          {finalList.map((list, index) => (
            <div className="row row-cols-5" key={index}>
              <div className="col">{list.name}</div>
              <div className="col">{list.sets}</div>
              <div className="col">{list.minutes}</div>
              <div className="col">{list.weight}</div>
              <div className="col btn-delete" onClick={() => deleteList(index)}>
                <i className="fa-solid fa-trash-can"></i>
              </div>
            </div>
          ))}
          <div className="mb-3 btn-form-box">
            <button
              type="button"
              className="btn btn-form-save"
              onClick={() => handleSaveClick(finalList)}
              style={{ display: finalList.length === 0 && "none" }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-form-cancel"
              onClick={goBack}
            >
              Cancel
            </button>
          </div>
          <div className="error-message">{error}</div>
        </div>
      ) : (
        <div className="mb-3 btn-form-box">
          <button
            type="button"
            className="btn btn-form-cancel"
            onClick={goBack}
          >
            Cancel
          </button>
        </div>
      )}
      <PlanModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        type="save"
        message="Successfully saved!"
      />
    </>
  );
};

export default PlanLists;
