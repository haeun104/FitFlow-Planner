import { useState } from "react";
import PlanForm from "../components/PlanForm";
import PlanLists from "../components/PlanLists";
import { addDataToDb } from "../data/firebase";

const AddPlan = () => {
  const [validCheck, setValidCheck] = useState(false);
  const [multipleList, setMultipleList] = useState([]);

  return (
    <div className="container">
      <PlanForm
        setValidCheck={setValidCheck}
        setMultipleList={setMultipleList}
        date=""
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
