import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import MainPage from "./pages/MainPage";
import AddPlan from "./pages/AddPlan";
import UpdatePlan from "./pages/UpdatePlan";
import EditPlan from "./pages/EditPlan";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./data/firebase";
import { useEffect, useState } from "react";

function App() {
  const [dbList, setDbList] = useState();

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
        <Routes>
          <Route path="/" element={<MainPage dbList={dbList} />} />
          <Route path="/new" element={<AddPlan />} />
          <Route path="/update" element={<UpdatePlan dbList={dbList} />} />
          <Route path="/edit/:date" element={<EditPlan dbList={dbList} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
