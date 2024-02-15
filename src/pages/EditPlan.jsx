import { useParams } from "react-router-dom";
import PlanForm from "../components/PlanForm";
import PlanLists from "../components/PlanLists";
import { useContext, useEffect, useState } from "react";
import { updateDataToDb } from "../data/firebase";
import { DataContext } from "../App";

const EditPlan = () => {
  const { dbList } = useContext(DataContext);
  const [validCheck, setValidCheck] = useState(true);
  const [multipleList, setMultipleList] = useState([]);

  const { date } = useParams();

  useEffect(() => {
    setMultipleList(dbList.filter((item) => item.date === date));
  }, []);

  return (
    <div className="container">
      <PlanForm
        setValidCheck={setValidCheck}
        setMultipleList={setMultipleList}
        date={date}
        disabled={true}
      />
      <PlanLists
        validCheck={validCheck}
        multipleList={multipleList}
        setMultipleList={setMultipleList}
        handleDataToDb={updateDataToDb}
      />
    </div>
  );
};

export default EditPlan;
