import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EventsPage from "../pages/EventsPage";
import LoginPage from "../pages/LoginPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/eventos" element={<EventsPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRouter;