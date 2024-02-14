import { useState } from "react";
import MainCalendar from "../components/MainCalendar";
import MainModal from "../components/MainModal";

const MainPage = ({ dbList }) => {
  const [modalData, setModalData] = useState([]);
  const [clickedDate, setClickedDate] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const updateClickedDate = (clickedDate) => {
    setClickedDate(clickedDate);
    setModalOpen(true);
    setModalData(dbList.filter((item) => item.date === clickedDate));
  };

  return (
    <div className="container">
      <MainCalendar updateClickedDate={updateClickedDate} dbList={dbList} />
      {modalData.length > 0 && modalOpen ? (
        <MainModal
          modalData={modalData}
          clickedDate={clickedDate}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      ) : null}
    </div>
  );
};

export default MainPage;
