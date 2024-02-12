import { useParams } from "react-router-dom";
import PlanForm from "../components/PlanForm";
import PlanLists from "../components/PlanLists";
import { useEffect, useState } from "react";

const EditPlan = ({ dbList }) => {
  const [validCheck, setValidCheck] = useState(true);
  const [multipleList, setMultipleList] = useState([]);

  const { date } = useParams();

  useEffect(() => {
    setMultipleList(dbList.filter((item) => item.date === date));
  }, []);

  const resetData = () => {
    // setPlanOpen(false);
    // setSingleList((prev) => ({
    //   ...prev,
    //   date: "",
    // }));
  };

  return (
    <div className="container">
      <PlanForm
        setValidCheck={setValidCheck}
        setMultipleList={setMultipleList}
        date={date}
      />
      <PlanLists
        validCheck={validCheck}
        multipleList={multipleList}
        setMultipleList={setMultipleList}
        resetData={resetData}
      />
    </div>
  );
};

export default EditPlan;
