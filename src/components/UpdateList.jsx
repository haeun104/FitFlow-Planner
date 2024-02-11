import { useState } from "react";

const UpdateList = ({ summarizedList, dbList }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [checkboxId, setCheckboxId] = useState([]);

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
  };
  //   console.log(summarizedList);

  const { date, category, name } = summarizedList;

  const getDetails = (date) => {
    const filteredList = dbList.filter((item) => item.date === date);
    return filteredList;
  };

  const handleCheckbox = (id) => {
    setCheckboxId((prev) => [...prev, id]);
  };

  const sendCheckboxIdToDB= () => {
    console.log(checkboxId);
  };

  return (
    <>
      <li className="list-group-item summary-list">
        <div className="summary-list-info" onClick={() => handleDetailOpen()}>
          <div>{date}</div>
          <div className="summary-list-category">{category.join(" | ")}</div>
          <div>{name.length} exercises</div>
        </div>
        <div className="summary-list-btns">
          <button
            type="button"
            className="btn btn-update"
            onClick={() => handleDetailOpen()}
          >
            Update
          </button>
          <button type="button" className="btn btn-edit">
            Edit
          </button>
          <button type="button" className="btn btn-delete">
            Delete
          </button>
        </div>
      </li>
      <div
        className="container text-center detail-list"
        style={{ display: detailOpen ? "block" : "none" }}
      >
        <div className="row">
          <div className="col">Category</div>
          <div className="col">Name</div>
          <div className="col">Sets</div>
          <div className="col">Minutes</div>
          <div className="col">Weight(kg)</div>
          <div className="col">Completion</div>
        </div>
        {getDetails(date).map((item) => (
          <div key={item.id} className="row">
            <div className="col">{item.category}</div>
            <div className="col">{item.name}</div>
            <div className="col">{item.sets}</div>
            <div className="col">{item.minutes}</div>
            <div className="col">{item.weight}</div>
            <div className="col">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    handleCheckbox(item.id);
                  }
                }}
              />
            </div>
          </div>
        ))}
        <div className="row detail-list-finish">
          <div className="col result-msg">33% of the plan completed</div>
          <div className="col">
            <button
              type="button"
              className="btn btn-save"
              onClick={sendCheckboxIdToDB}
            >
              Save
            </button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-finish">
              Finish Exercises
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateList;
