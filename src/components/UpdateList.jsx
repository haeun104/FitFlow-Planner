import { useContext, useState } from "react";
import UpdateDetails from "./UpdateDetails";
import { useNavigate } from "react-router-dom";

import PlanModal from "./PlanModal";
import { DataContext } from "../App";

import PropTypes from "prop-types";

const UpdateList = ({ summary }) => {
  const { dbList } = useContext(DataContext);

  const [detailOpen, setDetailOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleDetailOpen = () => {
    setDetailOpen(!detailOpen);
  };

  const { date, category, name, id } = summary;

  // Filter DB lists on the clicked date
  const getDetails = (date) => {
    const filteredList = dbList.filter((item) => item.date === date);
    return filteredList;
  };

  // Go to Edit page
  const goEditPage = (selectedDate) => {
    navigate(`/edit/${selectedDate}`);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  // Check if there is a past date on the list
  const currentDate = new Date();
  const previousDate = currentDate.setDate(currentDate.getDate() - 1);
  const isPastDate = new Date(date) < previousDate;

  return (
    <>
      <li className="list-group-item update-list">
        <div className="update-list-info" onClick={handleDetailOpen}>
          <div>{date}</div>
          <div className="update-list-category">
            {Array.from(new Set(category)).join(" | ")}
          </div>
          <div>{name.length} exercises</div>
        </div>
        <div className="update-list-btns">
          <button
            type="button"
            className="btn btn-update"
            onClick={handleDetailOpen}
          >
            Update
          </button>
          <button
            type="button"
            className={`btn btn-edit ${isPastDate && "btn-edit-disable"}`}
            onClick={() => goEditPage(date)}
            disabled={isPastDate}
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
        data={id}
      />
    </>
  );
};

UpdateList.propTypes = {
  summary: PropTypes.shape({
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.string.isRequired,
    name: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default UpdateList;
