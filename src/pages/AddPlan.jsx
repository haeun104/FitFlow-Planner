import { useState } from "react";
import PlanForm from "../components/PlanForm";
import PlanLists from "../components/PlanLists";
import { addDataToDb } from "../data/firebase";

const AddPlan = () => {
  const [validCheck, setValidCheck] = useState(false);
  const [multipleList, setMultipleList] = useState([]);

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
        date=""
        disabled={false}
      />
      <PlanLists
        validCheck={validCheck}
        multipleList={multipleList}
        setMultipleList={setMultipleList}
        resetData={resetData}
        handleDataToDb={addDataToDb}
      />
    </div>
  );
};

export default AddPlan;
