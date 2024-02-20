import { useNavigate } from "react-router-dom";
import { deleteDataDb, updateIsClosedDB } from "../data/firebase";

const PlanModal = ({ message, modalOpen, setModalOpen, type, data }) => {
  const navigate = useNavigate();

  // DB에서 데이터 클로징
  const handleCloseDb = (data) => {
    updateIsClosedDB(data);
    setModalOpen(false);
    navigate("/update");
  };

  // DB에서 데이터 삭제
  const handleDeleteDb = (data) => {
    deleteDataDb(data);
    setModalOpen(false);
    navigate("/update");
  };

  const goBack = () => {
    setModalOpen(false);
    if (type === "save") {
      navigate("/");
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
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            {type === "save" && (
              <>
                <button
                  type="button"
                  className="btn btn-ok"
                  data-bs-dismiss="modal"
                  onClick={goBack}
                >
                  OK
                </button>
              </>
            )}
            {type === "finish" && (
              <>
                <button
                  type="button"
                  className="btn btn-close-modal"
                  data-bs-dismiss="modal"
                  onClick={goBack}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-ok"
                  data-bs-dismiss="modal"
                  onClick={() => handleCloseDb(data)}
                >
                  OK
                </button>
              </>
            )}
            {type === "delete" && (
              <>
                <button
                  type="button"
                  className="btn btn-close-modal"
                  data-bs-dismiss="modal"
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
