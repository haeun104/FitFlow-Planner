import { useEffect, useState } from "react";
import PlanModal from "./PlanModal";
import { useNavigate } from "react-router-dom";

const PlanLists = ({
  validCheck,
  multipleList,
  setMultipleList,
  handleDataToDb,
}) => {
  const [finalList, setFinalList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFinalList(multipleList);
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

  const handleSaveClick = (list) => {
    handleDataToDb(list);
    setFinalList([]);
    setModalOpen(true);
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
