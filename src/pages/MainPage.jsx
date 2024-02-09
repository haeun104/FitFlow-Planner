import { useState } from "react";
import MainCalendar from "../components/MainCalendar";
import MainModal from "../components/MainModal";

const mockData = [
  {
    date: "2024-02-01",
    exercisePart: "legs",
    exerciseName: "squat",
    sets: 3,
    weight: 20,
  },
  {
    date: "2024-02-02",
    exercisePart: "chest",
    exerciseName: "chest press",
    sets: 5,
    weight: 10,
  },
  {
    date: "2024-02-02",
    exercisePart: "legs",
    exerciseName: "squat",
    sets: 3,
    weight: 20,
  },
  {
    date: "2024-02-03",
    exercisePart: "arms",
    exerciseName: "push-up",
    sets: 5,
    weight: 0,
  },
];

const MainPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [clickedDate, setClickedDate] = useState();

  const filterData = (date) => {
    setFilteredData(mockData.filter((item) => item.date === date));
  };

  const updateClickedDate = (clickedDate) => {
    setClickedDate(clickedDate);
    filterData(clickedDate);
  };

  console.log(filteredData);

  return (
    <>
      <MainCalendar updateClickedDate={updateClickedDate} />
      {filteredData.length > 0 && (
        <MainModal filteredData={filteredData} clickedDate={clickedDate} />
      )}
    </>
  );
};

export default MainPage;
