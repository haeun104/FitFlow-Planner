import { useNavigate } from "react-router-dom";
import { deleteDataDb, updateIsClosedDB } from "../data/firebase";
import { useState } from "react";

const PlanModal = ({ message, modalOpen, setModalOpen, type, data }) => {
  const [modalMessage, setModalMessage] = useState(message);
  const [modalType, setModalType] = useState(type);

  const navigate = useNavigate();

  // DB에서 데이터 클로징
  const handleCloseDb = (data) => {
    updateIsClosedDB(data);
    setModalMessage("Successfully closed.");
    setModalType("edit");
  };

  // DB에서 데이터 삭제
  const handleDeleteDb = (data) => {
    deleteDataDb(data);
    setModalMessage("Successfully deleted.");
    setModalType("edit");
  };

  const goBack = () => {
    setModalOpen(false);
    if (modalType === "new") {
      navigate("/");
    } else if (modalType === "edit") {
      navigate("/update");
    } else {
      navigate("/update");
    }
  };

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
            {modalType === "new" || modalType === "edit" ? (
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

export default PlanModal;
