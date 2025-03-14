import "./App.css";
import Icons from "./components/Icons/Icon.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import ManagementTour from "./page/Management/ManagementTour.jsx";
import ManagementLocation from "./page/Management/ManagementLocation.jsx";
import ModalAddLocation from "./components/ModalManage/ModalAddLocation.jsx";
import ManagementTravelTour from "./page/Management/ManagementTravelTour.jsx";
import ManagementHotel from "./page/Management/ManagementHotel.jsx";
import ManagementRestaurant from "./page/Management/ManagementRestaurant.jsx";
import ManagementVehicle from "./page/Management/ManagementVehicle.jsx";
import ModalAddTour from "./components/ModalManage/ModalTour/ModalManageTravelTour.jsx";
import ModalManageTravelTour from "./components/ModalManage/ModalTour/ModalManageTravelTour.jsx";
import PrivateRoute from "./components/PrivateRouter.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        {/*<Route path={'/forgot-password'}/>*/}

        <Route path={"/managementLocation"} element={<ManagementLocation />} />
        <Route path={"/managementTour"} element={<ManagementTour />} />
        <Route
          path={"/managementTravelTour"}
          element={<ManagementTravelTour />}
        />
        <Route path={"/managementHotel"} element={<ManagementHotel />} />
        <Route
          path={"/managementRestaurant"}
          element={<ManagementRestaurant />}
        />
        <Route path={"/managementVehicle"} element={<ManagementVehicle />} />

        <Route path={"/modalL"} element={<ModalManageTravelTour />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
