import { useContext, useEffect, useState } from "react";
import PlanModal from "./PlanModal";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import PropTypes from "prop-types";

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

  //  Delete the list when the delete icon is clicked
  const deleteList = (index) => {
    const newArray = [...multipleList];
    newArray.splice(index, 1);
    setMultipleList(newArray);
  };

  // Go to a previous page when cancel button is clicked
  const goBack = () => {
    navigate("/");
  };

  // Check if the selected date already exists in DB
  const checkExistingDate = (list) => {
    const date = [...new Set(list.map((item) => item.date))].join();
    const existingDate = dbList.filter((item) => item.date === date);
    return existingDate.length > 0 ? true : false;
  };

  // Add lits in DB when save button is clicked
  const handleSaveClick = (list) => {
    if (type === "new" && checkExistingDate(list)) {
      setError("Plan already exists on this day.");
    } else {
      handleDataToDb(list);
      setModalOpen(true);
    }
  };

  if (validCheck) {
    return (
      <>
        <div className="added-exercises">
          <h3 className="added-exercises-title">
            <i className="fa-solid fa-list-ul"></i> Added Exercises
          </h3>
          <div className="row row-cols-5">
            <div className="col">Name</div>
            <div className="col">Sets</div>
            <div className="col">Minutes</div>
            <div className="col">Weight(kg)</div>
            <div className="col">Delete</div>
          </div>
          {finalList.length === 0 ? (
            <>
              <div className="noAdded-exercises-message">
                There are no exercises added
              </div>
              <button type="button" className="btn btn-cancel" onClick={goBack}>
                Cancel
              </button>
            </>
          ) : (
            <>
              {finalList.map((list, index) => (
                <div className="row row-cols-5" key={index}>
                  <div className="col">{list.name}</div>
                  <div className="col">{list.sets}</div>
                  <div className="col">{list.minutes}</div>
                  <div className="col">{list.weight}</div>
                  <div
                    className="col btn-delete-trash"
                    onClick={() => deleteList(index)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              ))}
              <div className="mb-3 btn-form-box">
                <button
                  type="button"
                  className="btn btn-save"
                  onClick={() => handleSaveClick(finalList)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={goBack}
                >
                  Cancel
                </button>
              </div>
              <div className="error-message">{error}</div>
            </>
          )}
        </div>
        <PlanModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          type={type}
          message="Successfully saved!"
        />
      </>
    );
  }
};

PlanLists.propTypes = {
  validCheck: PropTypes.bool.isRequired,
  multipleList: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      isClosed: PropTypes.bool.isRequired,
      isDone: PropTypes.bool.isRequired,
      minutes: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
      sets: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setMultipleList: PropTypes.func.isRequired,
  handleDataToDb: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default PlanLists;
