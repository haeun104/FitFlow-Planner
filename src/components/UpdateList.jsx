import { useState } from "react";
import UpdateDetails from "./UpdateDetails";
import { useNavigate } from "react-router-dom";
import { deleteDataDb } from "../data/firebase";

const UpdateList = ({ summarizedList, dbList }) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const navigate = useNavigate();

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
  };
  // console.log(dbList);

  const { date, category, name, id } = summarizedList;

  // 클릭한 일자의 상세 데이터를 가져옴
  const getDetails = (date) => {
    const filteredList = dbList.filter((item) => item.date === date);
    return filteredList;
  };

  // Edit 페이지로 이동
  const goEditPage = (selectedDate) => {
    navigate(`/edit/${selectedDate}`);
  };

  // DB에서 데이터 삭제

  const handleDeleteDb = (id) => {
    deleteDataDb(id);
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
          <button
            type="button"
            className="btn btn-edit"
            onClick={() => goEditPage(date)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => handleDeleteDb(id)}
          >
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
