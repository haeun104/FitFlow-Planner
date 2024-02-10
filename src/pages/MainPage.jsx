import { useState } from "react";
import MainCalendar from "../components/MainCalendar";
import MainModal from "../components/MainModal";

const MainPage = ({ dbList }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [clickedDate, setClickedDate] = useState();

  const filterData = (date) => {
    setFilteredData(dbList.filter((item) => item.date === date));
  };

  const updateClickedDate = (clickedDate) => {
    setClickedDate(clickedDate);
    filterData(clickedDate);
  };

  return (
    <>
      <MainCalendar updateClickedDate={updateClickedDate} dbList={dbList}/>
      {filteredData.length > 0 && (
        <MainModal filteredData={filteredData} clickedDate={clickedDate} />
      )}
    </>
  );
};

export default MainPage;
