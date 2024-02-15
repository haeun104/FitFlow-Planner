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

  if (!dbList) {
    return (
      <>
        <Header />
        <p>Loading...</p>
      </>
    );
  } else {
    return (
      <BrowserRouter>
        <Header />
        <Outlet />
        <DataContext.Provider value={{ dbList }}>
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
