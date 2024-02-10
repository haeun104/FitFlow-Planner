import { useState } from "react";
import MainCalendar from "../components/MainCalendar";
import MainModal from "../components/MainModal";

const MainPage = ({ dbList }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [clickedDate, setClickedDate] = useState();
  const [click, setClick] = useState(false);

  const filterData = (date) => {
    setFilteredData(dbList.filter((item) => item.date === date));
  };

  const updateClickedDate = (clickedDate) => {
    setClickedDate(clickedDate);
    filterData(clickedDate);
    setClick(true);
  };

  return (
    <>
      <MainCalendar updateClickedDate={updateClickedDate} dbList={dbList} />
      {filteredData.length > 0 && click ? (
        <MainModal
          filteredData={filteredData}
          clickedDate={clickedDate}
          click={click}
          setClick={setClick}
        />
      ) : null}
    </>
  );
};

export default MainPage;
