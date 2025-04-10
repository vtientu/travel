import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import PrivateRoute from "./components/PrivateRouter.jsx";
import Profile from "./components/Profile.jsx";
import GoogleAuthCallback from "./components/GoogleAuthCallBack.jsx";
import Dashboard from "./page/Management/Dashboard.jsx";
import TravelGuideTour from "./page/Management/TravelGuideTour.jsx";
import DepartureSchedulePage from "./page/Management/DepartureSchedulePage.jsx";
import TravelTourPendingPage from "./page/Management/TravelTourPendingPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path="/auth/callback" element={<GoogleAuthCallback />} />
        <Route path={"/account"} element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/travel-guide-tour"} element={<TravelGuideTour />} />
        <Route
          path={"/departure-schedule"}
          element={<DepartureSchedulePage />}
        />
        <Route
          path={"/travel-tour-pending"}
          element={<TravelTourPendingPage />}
        />

        {/*<Route path={'/forgot-password'}/>*/}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
