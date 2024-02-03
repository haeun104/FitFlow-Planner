import MainCalendar from "../components/MainCalendar";
import MainModal from "../components/MainModal";
import Header from "../components/header";

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
    date: "2024-02-03",
    exercisePart: "arms",
    exerciseName: "push-up",
    sets: 5,
    weight: 0,
  },
];

const MainPage = () => {
  function showModal(clickedDate) {
    const filteredData = mockData.filter((item) => item.date === clickedDate);
    return filteredData;
  }
  return (
    <>
      <Header />
      <MainCalendar showModal={showModal} />
      <MainModal />
    </>
  );
};

export default MainPage;
