import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import MainPage from "./pages/MainPage";
import AddPlan from "./pages/AddPlan";
import UpdatePlan from "./pages/UpdatePlan";
import TodayNews from "./pages/TodayNews";
import EditPlan from "./pages/EditPlan";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Outlet />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new" element={<AddPlan />} />
        <Route path="/update" element={<UpdatePlan />} />
        <Route path="/edit/:id" element={<EditPlan />} />
        <Route path="/articles" element={<TodayNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
