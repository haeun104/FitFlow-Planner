import { useNavigate } from "react-router-dom";
import { deleteDataDb } from "../data/firebase";

const PlanModal = ({ message, modalOpen, setModalOpen, type, id }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
    navigate("/");
  };

  const goBack = () => {
    setModalOpen(false);
  };

  // DB에서 데이터 삭제
  const handleDeleteDb = (id) => {
    deleteDataDb(id);
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
            {type === "save" || type === "finish" ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Ok
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={goBack}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleDeleteDb(id)}
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