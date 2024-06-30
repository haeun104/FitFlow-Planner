import { useCallback, useContext, useState } from "react";
import MainCalendar from "../components/MainCalendar";
import MainModal from "../components/MainModal";
import MainSummaryList from "../components/MainSummaryList";
import { DataContext } from "../App";

const MainPage = () => {
  const { dbList } = useContext(DataContext);

  const [modalData, setModalData] = useState([]);
  const [clickedDate, setClickedDate] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const updateClickedDate = useCallback(
    (clickedDate) => {
      setClickedDate(() => clickedDate);
      setModalOpen(() => true);
      setModalData(() => dbList.filter((item) => item.date === clickedDate));
    },
    [dbList]
  );

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
      <MainSummaryList />
    </div>
  );
};

export default MainPage;
