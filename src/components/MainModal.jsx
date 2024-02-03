const MainModal = ({ date, isClicked }) => {
  if (isClicked) {
    return (
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{date}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
              <p>Modal body text goes here.</p>
              <p>Modal body text goes here.</p>
              <p>Modal body text goes here.</p>
              <p>Modal body text goes here.</p>
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MainModal;
