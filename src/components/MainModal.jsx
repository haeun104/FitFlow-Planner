const MainModal = ({ modalData, clickedDate, modalOpen, setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  const completionStatus = [
    ...new Set(modalData.map((item) => item.isClosed)),
  ].join();

  const isDoneItems = modalData.filter((item) => item.isDone);
  const completionRatio = Math.round(
    (isDoneItems.length / modalData.length) * 100
  );

  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{ display: modalOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {" "}
              {`${clickedDate} | ${
                completionStatus === "true"
                  ? `Completed ${completionRatio}%`
                  : "Planned"
              }`}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col">Category</div>
              <div className="col">Name</div>
              <div className="col">Sets</div>
              <div className="col">Minutes</div>
              <div className="col">Weight(kg)</div>
            </div>
            {modalData.map((item) => (
              <div key={item.id} className="row">
                <div className="col">{item.category}</div>
                <div className="col">{item.name}</div>
                <div className="col">{item.sets} sets</div>
                <div className="col">{item.minutes} mins</div>
                <div className="col">{item.weight} kg</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainModal;
