import { useContext } from "react";
import UpdateList from "../components/UpdateList";
import { DataContext } from "../App";

const UpdatePlan = () => {
  const { summarizedList } = useContext(DataContext);

  return (
    <>
      <div className="container">
        <h3>
          <i className="fa-solid fa-pen-to-square"></i> Update Plan
        </h3>
        <ul className="list-group">
          {summarizedList.length === 0 ? (
            <li>No plan has been created yet.</li>
          ) : (
            summarizedList.map((item, index) => (
              <UpdateList key={index} summary={item} />
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default UpdatePlan;
