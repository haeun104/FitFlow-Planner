import { useEffect, useState } from "react";
import exerciseList from "../data/exerciseList";
import { useNavigate } from "react-router-dom";
import { db } from "../data/firebase";
import { collection, addDoc } from "firebase/firestore";

const PlanForm = () => {
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState("Chest");
  const [planOpen, setPlanOpen] = useState(false);
  const [singleList, setSingleList] = useState({
    date: "",
    category: "",
    name: "",
    sets: 0,
    minutes: 0,
    weight: 0,
    isCompleted: false,
  });
  const [validCheck, setValidCheck] = useState(false);
  const [error, setError] = useState([]);
  const [finalLists, setFinalLists] = useState([]);

  const navigate = useNavigate();

  // DB 에 존재하는 카테고리 목록 추출 (중복 제거)
  const categoryList = [...new Set(exerciseList.map((item) => item.category))];

  // 카테고리 선택 시 DB 목록에서 필터링
  const filterExercises = (e) => {
    const filteredEx = exerciseList.filter(
      (item) => item.category === e.target.value
    );
    setCategory(e.target.value);
    setExercises(filteredEx);
  };

  // 마운팅 시점에 설정된 카테고리로 필터링 실행
  useEffect(() => {
    setExercises(exerciseList.filter((item) => item.category === category));
  }, []);

  // 필터링된 리스트에서 특정 아이템 클릭 시 하단에 계획 칸을 보여줌
  const addToList = (name, category) => {
    setPlanOpen(true);
    setSingleList((prev) => ({ ...prev, name: name, category: category }));
  };

  // Add Exercises 클릭 시 하단에 계획 칸을 보여줌
  const openPlan = () => {
    setPlanOpen(true);
  };

  // 계획 칸 입력 시 state 업데이트
  const updateSingleList = (e) => {
    const { name, value } = e.target;
    setSingleList((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 계획 칸 입력 후 저장 클릭 시 Validation 체크 및 최종 계획 목록에 추가
  const createLists = () => {
    setError([]);
    let validation = true;
    if (!singleList.date) {
      validation = false;
      setError((prev) => [...prev, "Select date!"]);
    }
    if (singleList.category === "") {
      validation = false;
      setError((prev) => [...prev, "Category must be input."]);
    }
    if (singleList.name === "") {
      validation = false;
      setError((prev) => [...prev, "Exercise name must be input."]);
    }
    if (singleList.sets <= 0 && singleList.minutes <= 0) {
      validation = false;
      setError((prev) => [
        ...prev,
        "One between Sets and Minutes must be more than zero.",
      ]); // 왜 빈칸인데도 0으로 인식하는건지 확인 필요
    }
    if (singleList.sets === "" && singleList.minutes === "") {
      validation = false;
      setError((prev) => [
        ...prev,
        "One between Sets and Minutes must be input.",
      ]);
    }
    if (singleList.sets < 0 || singleList.minutes < 0) {
      validation = false;
      setError((prev) => [...prev, "Value must be more than zero."]);
    }
    if (validation) {
      setValidCheck(true);
      setSingleList((prev) => ({
        ...prev,
      }));
      setFinalLists((prev) => [...prev, singleList]);
    }
  };

  //  삭제 버튼 클릭 시 목록에서 삭제
  const deleteList = (id) => {
    const deletedLists = finalLists.filter((list) => list.id !== id);
    setFinalLists(deletedLists);
  };

  // 취소 버튼 클릭 시 이전 페이지로 돌아감
  const goBack = () => {
    navigate(-1);
  };

  // Firebase에 목록을 추가
  async function addDataToDb(lists) {
    try {
      for (let list of lists) {
        await addDoc(collection(db, "plan"), list);
      }
      console.log("Lists added to DB successfully.");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form action="/" className="card plan-form">
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={singleList.date}
          name="date"
          onChange={(e) => updateSingleList(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="search-bar" className="form-label">
          Exercises
        </label>
        <input
          type="text"
          className="form-control"
          id="search-bar"
          placeholder="Enter exercise name"
        />
      </div>
      <div className="mb-3 btn-box">
        {categoryList.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`btn btn-plan-form ${category === item && "clicked"}`}
            onClick={filterExercises}
            value={item}
          >
            {item}
          </button>
        ))}
      </div>
      <ul>
        {exercises.map((ex, index) => (
          <li
            key={index}
            className="exercises-list"
            onClick={() => addToList(ex.name, ex.category)}
          >
            {ex.name}
          </li>
        ))}
      </ul>
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-add-exercise"
          onClick={openPlan}
        >
          + Add Exercises
        </button>
      </div>
      {planOpen && (
        <div className="exercise-plan">
          <div className="mb-3">
            <label htmlFor="ex-category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="ex-category"
              placeholder="Enter category"
              value={singleList.category}
              name="category"
              onChange={(e) => updateSingleList(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ex-name" className="form-label">
              Exercise Name
            </label>
            <input
              type="text"
              className="form-control"
              id="ex-name"
              placeholder="Enter exercise name"
              value={singleList.name}
              name="name"
              onChange={(e) => updateSingleList(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sets" className="form-label">
              Sets
            </label>
            <input
              type="number"
              min={0}
              className="form-control"
              id="sets"
              placeholder="Enter number of sets"
              value={singleList.sets}
              name="sets"
              onChange={(e) => updateSingleList(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="minutes" className="form-label">
              Minutes
            </label>
            <input
              type="number"
              min={0}
              className="form-control"
              id="minutes"
              placeholder="Enter minutes"
              value={singleList.minutes}
              name="minutes"
              onChange={(e) => updateSingleList(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">
              Weight(kg)
            </label>
            <input
              type="number"
              min={0}
              className="form-control"
              id="weight"
              placeholder="Enter weight"
              value={singleList.weight}
              name="weight"
              onChange={(e) => updateSingleList(e)}
            />
          </div>
          <div className="mb-3 exercise-save">
            <button
              type="button"
              className="btn btn-add-exercise"
              onClick={createLists}
            >
              save
            </button>
          </div>
          <ul className="error-message">
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      {validCheck ? (
        <div className="mb-3 added-exercises">
          <h3 className="added-exercises-title">Added Exercises</h3>
          <div className="row row-cols-5">
            <div className="col">Name</div>
            <div className="col">Sets</div>
            <div className="col">Minutes</div>
            <div className="col">Weight(kg)</div>
            <div className="col"></div>
          </div>
          {finalLists.map((list, index) => (
            <div className="row row-cols-5" key={index}>
              <div className="col">{list.name}</div>
              <div className="col">{list.sets}</div>
              <div className="col">{list.minutes}</div>
              <div className="col">{list.weight}</div>
              <div
                className="col btn-delete"
                onClick={() => deleteList(list.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </div>
            </div>
          ))}
          <div className="mb-3 btn-form-box">
            <button
              type="button"
              className="btn btn-form-save"
              onClick={() => addDataToDb(finalLists)}
              style={{ display: finalLists.length === 0 && "none" }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-form-cancel"
              onClick={goBack}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-3 btn-form-box">
          <button
            type="button"
            className="btn btn-form-cancel"
            onClick={goBack}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default PlanForm;
