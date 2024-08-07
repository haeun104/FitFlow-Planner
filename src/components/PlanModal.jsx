import { useNavigate } from "react-router-dom";
import { deleteDataDb, updateIsClosedDB } from "../data/firebase";
import { useState } from "react";
import PropTypes from "prop-types";

const PlanModal = ({
  message,
  modalOpen,
  setModalOpen,
  type,
  data,
  resetUpdatedList,
}) => {
  const [modalMessage, setModalMessage] = useState(message);
  const [modalType, setModalType] = useState(type);

  const navigate = useNavigate();

  // Update isClose status in DB
  const handleCloseDb = async (data) => {
    try {
      await updateIsClosedDB(data);
      setModalMessage("Successfully closed.");
      setModalType("closed");
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete lists in DB
  const handleDeleteDb = async (data) => {
    try {
      await deleteDataDb(data);
      setModalMessage("Successfully deleted.");
      setModalType("edit");
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
    setModalOpen(false);
    if (modalType === "new") {
      navigate("/");
    } else if (modalType === "edit") {
      navigate("/update");
    } else if (modalType === "closed") {
      resetUpdatedList();
      navigate("/update");
    } else {
      navigate("/update");
    }
  };

  const modalTypes =
    modalType === "new" || modalType === "edit" || modalType === "closed";

  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{ display: modalOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <p>{modalMessage}</p>
          </div>
          <div className="modal-footer">
            {modalTypes ? (
              <>
                <button type="button" className="btn btn-ok" onClick={goBack}>
                  OK
                </button>
              </>
            ) : null}
            {modalType === "finish" && (
              <>
                <button
                  type="button"
                  className="btn btn-close-modal"
                  onClick={goBack}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-ok"
                  onClick={() => handleCloseDb(data)}
                >
                  OK
                </button>
              </>
            )}
            {modalType === "delete" && (
              <>
                <button
                  type="button"
                  className="btn btn-close-modal"
                  onClick={goBack}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-delete-modal"
                  onClick={() => handleDeleteDb(data)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PlanModal.propTypes = {
  message: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        isClosed: PropTypes.bool.isRequired,
        isDone: PropTypes.bool.isRequired,
        minutes: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        sets: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  resetUpdatedList: PropTypes.func,
  closeDetails: PropTypes.func,
};

export default PlanModal;
