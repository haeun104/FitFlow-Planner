import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import MainPage from "./pages/MainPage";
import AddPlan from "./pages/AddPlan";
import UpdatePlan from "./pages/UpdatePlan";
import EditPlan from "./pages/EditPlan";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./data/firebase";
import React, { useEffect, useState } from "react";

export const DataContext = React.createContext();

function App() {
  const [dbList, setDbList] = useState();
  const [summarizedList, setSummarizedList] = useState([]);

  // firestore 실시간 데이터 동기화
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "plan"), (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push({ ...doc.data(), id: doc.id });
      });
      setDbList(newData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (dbList) {
      const incompleteList = dbList.filter((item) => !item.isClosed);
      const summaryList = incompleteList.reduce((acc, curr) => {
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
      summaryList.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setSummarizedList(summaryList);
    }
  }, [dbList]);

  if (!dbList) {
    return (
      <>
        <Header />
        <div className="text-center loader">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <p>Loading...</p>
        </div>
      </>
    );
  } else {
    return (
      <BrowserRouter>
        <Header />
        <Outlet />
        <DataContext.Provider value={{ dbList, summarizedList }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/new" element={<AddPlan />} />
            <Route path="/update" element={<UpdatePlan />} />
            <Route path="/edit/:date" element={<EditPlan />} />
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
