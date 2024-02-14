import UpdateList from "../components/UpdateList";

const UpdatePlan = ({ dbList }) => {
  // DB의 데이터를 날짜 별 하나의 객체로 재구성하여 반환
  const incompleteList = dbList.filter((item) => !item.isClosed);
  const summarizedList = incompleteList.reduce((acc, curr) => {
    const existingDate = acc.find((item) => item.date === curr.date);
    if (existingDate) {
      existingDate.category.push(curr.category);
      existingDate.name.push(curr.name);
      existingDate.id.push(curr.id);
    } else {
      acc.push({
        date: curr.date,
        category: [curr.category],
        name: [curr.name],
        id: [curr.id],
      });
    }
    return acc;
  }, []);

  summarizedList.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <>
      <div className="container update-plan">
        <h2 className="update-plan-title">Plan Lists</h2>
        <ul className="list-group">
          {summarizedList.map((item, index) => (
            <UpdateList key={index} summarizedList={item} dbList={dbList} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default UpdatePlan;
