import { useEffect, useState } from "react";
import exerciseList from "../data/exerciseList";
import { getFormattedDate } from "../utils/utils";

const PlanForm = ({ setValidCheck, setMultipleList, date, disabled }) => {
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState("Chest");
  const [planOpen, setPlanOpen] = useState(false);
  const [singleList, setSingleList] = useState({
    date: date,
    category: "",
    name: "",
    sets: 0,
    minutes: 0,
    weight: 0,
    isDone: false,
    isClosed: false,
  });
  const [error, setError] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [searchBar, setSearchBar] = useState("");
  const [searchBarEx, setSearchBarEx] = useState([]);

  // Update the exercises list when mounting
  useEffect(() => {
    setExercises(exerciseList.filter((item) => item.category === category));
  }, []);

  // Update the exercises list when value is input in the search bar
  const updateSearchBar = (e) => {
    setSearchBar(e.target.value);
  };

  const handleKeyDown = () => {
    setCategoryOpen(false);
  };

  const handleKeyUp = () => {
    if (!searchBar) {
      setCategoryOpen(true);
    }
    setSearchBarEx(
      exerciseList.filter((item) =>
        item.name.toLowerCase().includes(searchBar.toLowerCase())
      )
    );
  };

  // List of categories removing duplicated values
  const categoryList = [...new Set(exerciseList.map((item) => item.category))];

  // Filter exercise lists when a certain category is clicked
  const filterExercises = (e) => {
    const filteredEx = exerciseList.filter(
      (item) => item.category === e.target.value
    );
    setCategory(e.target.value);
    setExercises(filteredEx);
  };

  // Fill the selected exercise name and its category in a plan when a certain exercise is clicked
  const addToList = (name, category) => {
    setPlanOpen(true);
    setSingleList((prev) => ({
      ...prev,
      name: name,
      category: category,
      sets: 0,
      minutes: 0,
      weight: 0,
    }));
  };

  // Show plan inputs when Add Exercises is clicked
  const openPlan = () => {
    setPlanOpen(true);
  };

  // Update state when input value is changed
  const updateSingleList = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      setMultipleList([]);
    }
    setSingleList((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check validation and update multipleList when save button is clicked
  const createLists = () => {
    const today = new Date(getFormattedDate(new Date()));
    const planDate = new Date(singleList.date);

    setError([]);

    const addError = (message) => setError((prev) => [...prev, message]);

    let validation = true;
    if (!singleList.date) {
      validation = false;
      addError("Select date!");
    }
    if (planDate < today) {
      validation = false;
      addError("You can't select past date.");
    }
    if (singleList.category === "") {
      validation = false;
      addError("Category must be input.");
    }
    if (singleList.name === "") {
      validation = false;
      addError("Exercise name must be input.");
    }
    if (singleList.sets <= 0 && singleList.minutes <= 0) {
      validation = false;
      addError("Sets or Minutes must be more than zero.");
    }
    if (singleList.sets === "" && singleList.minutes === "") {
      validation = false;
      addError("Sets or Minutes must be input.");
    }
    if (
      singleList.sets < 0 ||
      singleList.minutes < 0 ||
      singleList.weight < 0
    ) {
      validation = false;
      addError("Value must be more than zero.");
    }
    if (validation) {
      setValidCheck(validation);
      setMultipleList((prev) => [
        ...prev,
        {
          ...singleList,
          sets: singleList.sets === "" ? 0 : singleList.sets,
          minutes: singleList.minutes === "" ? 0 : singleList.minutes,
          weight: singleList.weight === "" ? 0 : singleList.weight,
        },
      ]);
    }
  };

  // Clear input values when reset button is clicked
  const clearValues = () => {
    setSingleList((prev) => ({
      ...prev,
      name: "",
      category: "",
      sets: 0,
      minutes: 0,
      weight: 0,
    }));
  };

  return (
    <form action="/" className="plan-form">
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
          onChange={updateSingleList}
          disabled={disabled}
          min={getFormattedDate(new Date())}
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
          value={searchBar}
          onChange={updateSearchBar}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </div>
      {categoryOpen ? (
        <>
          <div className="mb-3 btn-box">
            {categoryList.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`btn btn-plan-form ${
                  category === item && "clicked"
                }`}
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
        </>
      ) : (
        <ul>
          {searchBarEx.map((ex, index) => (
            <li
              key={index}
              className="exercises-list"
              onClick={() => addToList(ex.name, ex.category)}
            >
              {ex.name}
            </li>
          ))}
        </ul>
      )}

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
              onChange={updateSingleList}
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
              onChange={updateSingleList}
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
              onChange={updateSingleList}
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
              onChange={updateSingleList}
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
              onChange={updateSingleList}
            />
          </div>
          <div className="mb-3 exercise-save">
            <button
              type="button"
              className="btn btn-save"
              onClick={createLists}
            >
              save
            </button>
            <button
              type="button"
              className="btn btn-reset"
              onClick={clearValues}
            >
              reset
            </button>
          </div>
          <ul className="error-message">
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default PlanForm;
