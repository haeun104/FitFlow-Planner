import { useContext, useState } from "react";
import MainCalendar from "../components/MainCalendar";
import MainModal from "../components/MainModal";
import MainSummaryList from "../components/MainSummaryList";
import { DataContext } from "../App";

const MainPage = () => {
  const { dbList } = useContext(DataContext);

  const [modalData, setModalData] = useState([]);
  const [clickedDate, setClickedDate] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const updateClickedDate = (clickedDate) => {
    setClickedDate(clickedDate);
    setModalOpen(true);
    setModalData(dbList.filter((item) => item.date === clickedDate));
  };

  // DB의 데이터를 날짜 별 하나의 객체로 재구성하여 반환
  const incompleteList = dbList.filter((item) => !item.isClosed);
  const summarizedList = incompleteList.reduce((acc, curr) => {
    const existingDate = acc.find((item) => item.date === curr.date);
    if (existingDate) {
      existingDate.category.push(curr.category);
      existingDate.name.push(curr.name);
      existingDate.id.push(curr.id);
    } else {
      acc.push({
        date: curr.date,
        category: [curr.category],
        name: [curr.name],
        id: [curr.id],
      });
    }
    return acc;
  }, []);

  summarizedList.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

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
      <MainSummaryList summarizedList={summarizedList} />
    </div>
  );
};

export default MainPage;
