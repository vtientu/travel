import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import LandingPage from "./page/LandingPage.jsx";
import PersonalAIPage from "./page/PersonalAIPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import DealsPage from "./page/DealsPage.jsx";
import ListTour from "./page/ListTourPage.jsx";
import DetailTourPage from "./page/DetailTourPage.jsx";
import ManagementTravelTourPage from "./page/ManagementTravelTourPage.jsx";
import AddNewTourPage from "./page/AddNewTourPage.jsx";
import ManagementLocationPage from "./page/ManagementLocationPage.jsx";
import ManagementTour from "./page/Management/ManagementTour.jsx";
import ManagementLocation from "./page/Management/ManagementLocation.jsx";
import ModalAddLocation from "./components/ModalManage/ModalAddLocation.jsx";
import ManageTravelTour from "./page/Management/ManageTravelTour.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LandingPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          {/*<Route path={'/forgot-password'}/>*/}
          <Route path={"/personalAI"} element={<PersonalAIPage />} />
          <Route path={"/deals"} element={<DealsPage />} />
          <Route path={"/listTour"} element={<ListTour />} />
          <Route path={"/detailTour"} element={<DetailTourPage />} />
          <Route path={"/managementTravelTour"} element={<ManagementTravelTourPage/>}/>
          <Route path={"/addNewTour"} element={<AddNewTourPage/>}/>
          <Route path={"/managementLocation"} element={<ManagementLocation/>}/>
          <Route path={"/addNewLocation"} element={<AddNewTourPage/>}/>
          <Route path={"/managementTour"} element={<ManagementTour/>}/>
          <Route path={"/manageTravelTour"} element={<ManageTravelTour/>}/>
          <Route path={"/modalL"} element={<ModalAddLocation/>}/>
        </Routes>
    </BrowserRouter>
  );
}
export default App;
