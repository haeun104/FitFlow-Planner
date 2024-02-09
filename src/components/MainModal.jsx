import { useState } from "react";

const MainModal = ({ filteredData, clickedDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{ display: isModalOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{clickedDate}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="modal-lists-wrapper">
              {filteredData.map((item, index) => (
                <div key={index} className="list">
                  <div>{item.exercisePart}</div>
                  <div>{item.exerciseName}</div>
                  <div>{item.sets} sets</div>
                  <div>{item.weight} kg</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainModal;
