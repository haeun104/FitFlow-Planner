import { useState } from "react";
import PlanForm from "../components/PlanForm";
import PlanLists from "../components/PlanLists";
import { addDataToDb } from "../data/firebase";
import { useParams } from "react-router-dom";

const AddPlan = () => {
  const [validCheck, setValidCheck] = useState(false);
  const [multipleList, setMultipleList] = useState([]);

  const { date } = useParams();

  return (
    <div className="container">
      <h3>
        <i className="fa-regular fa-calendar-plus"></i> Add Plan
      </h3>
      <PlanForm
        setValidCheck={setValidCheck}
        setMultipleList={setMultipleList}
        date={date ? date : ""}
        disabled={false}
      />
      <PlanLists
        validCheck={validCheck}
        multipleList={multipleList}
        setMultipleList={setMultipleList}
        handleDataToDb={addDataToDb}
        type="new"
      />
    </div>
  );
};

export default AddPlan;
