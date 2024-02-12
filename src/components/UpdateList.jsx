import { useState } from "react";
import UpdateDetails from "./UpdateDetails";

const UpdateList = ({ summarizedList, dbList }) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
  };
  // console.log(dbList);

  const { date, category, name } = summarizedList;

  // 클릭한 일자의 상세 데이터를 가져옴
  const getDetails = (date) => {
    const filteredList = dbList.filter((item) => item.date === date);
    return filteredList;
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
      <UpdateDetails
        date={date}
        filteredList={getDetails(date)}
        detailOpen={detailOpen}
      />
    </>
  );
};

export default UpdateList;
