import { useParams } from "react-router-dom";
import PlanForm from "../components/PlanForm";

const EditPlan = ({ dbList }) => {
  const { date } = useParams();

  return <PlanForm />;
};

export default EditPlan;
