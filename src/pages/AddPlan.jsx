import { useState } from "react";
import PlanForm from "../components/PlanForm";
import PlanLists from "../components/PlanLists";

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

export default AddPlan;
