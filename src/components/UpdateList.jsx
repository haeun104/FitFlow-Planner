import { useContext, useState } from "react";
import UpdateDetails from "./UpdateDetails";
import { useNavigate } from "react-router-dom";

import PlanModal from "./PlanModal";
import { DataContext } from "../App";

const UpdateList = ({ summarizedList }) => {
  const { dbList } = useContext(DataContext);

  const [detailOpen, setDetailOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
  };

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

  const openModal = () => {
    setModalOpen(true);
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
          <button type="button" className="btn btn-delete" onClick={openModal}>
            Delete
          </button>
        </div>
      </li>
      <UpdateDetails filteredList={getDetails(date)} detailOpen={detailOpen} />
      <PlanModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        type="delete"
        message="Are you sure to delete? Deleted data will not be restored."
        id={id}
      />
    </>
  );
};

export default UpdateList;
