import { useContext } from "react";
import UpdateList from "../components/UpdateList";
import { DataContext } from "../App";

const UpdatePlan = () => {
  const { summarizedList } = useContext(DataContext);

  return (
    <>
      <div className="container update-plan">
        <h2 className="update-plan-title">Plan Lists</h2>
        <ul className="list-group">
          {summarizedList.map((item, index) => (
            <UpdateList key={index} summary={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default UpdatePlan;
