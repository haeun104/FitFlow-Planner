const MainModal = ({ filteredData, clickedDate, click, setClick }) => {
  const closeModal = () => {
    setClick(false);
  };

  return (
    <div
      className="modal"
      tabIndex="-1"
      style={{ display: click ? "block" : "none" }}
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
              {filteredData.map((item) => (
                <div key={item.id} className="list">
                  <div>{item.category}</div>
                  <div>{item.name}</div>
                  <div>{item.sets} sets</div>
                  <div>{item.minutes} mins</div>
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
