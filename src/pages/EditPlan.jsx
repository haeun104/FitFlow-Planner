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
  }, [date, dbList]);

  return (
    <div className="container">
      <h3>
        <i className="fa-solid fa-pen"></i> Edit Plan
      </h3>
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
        type="edit"
      />
    </div>
  );
};

export default EditPlan;
