import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import PersonalAIPage from "./page/PersonalAIPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import DealsPage from "./page/DealsPage.jsx";
import ListTour from "./page/ListTourPage.jsx";
import DetailTourPage from "./page/DetailTourPage.jsx";
import AddNewTourPage from "./page/AddNewTourPage.jsx";
import ManagementTour from "./page/Management/ManagementTour.jsx";
import ManagementLocation from "./page/Management/ManagementLocation.jsx";
import ModalAddLocation from "./components/ModalManage/ModalAddLocation.jsx";
import ManagementTravelTour from "./page/Management/ManagementTravelTour.jsx";
import LayoutLandingPage from "./layouts/LayoutLandingPage.jsx";
import ManagementHotel from "./page/Management/ManagementHotel.jsx";
import ManagementRestaurant from "./page/Management/ManagementRestaurant.jsx";
import ManagementVehicle from "./page/Management/ManagementVehicle.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LayoutLandingPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          {/*<Route path={'/forgot-password'}/>*/}
          <Route path={"/personalAI"} element={<PersonalAIPage />} />
          <Route path={"/deals"} element={<DealsPage />} />
          <Route path={"/listTour"} element={<ListTour />} />
          <Route path={"/detailTour"} element={<DetailTourPage />} />
          
          {/* <Route path={"/managementTravelTour"} element={<ManagementTravelTourPage/>}/> */}
          <Route path={"/addNewTour"} element={<AddNewTourPage/>}/>
          <Route path={"/addNewLocation"} element={<AddNewTourPage/>}/>
          
          <Route path={"/managementLocation"} element={<ManagementLocation/>}/>
          <Route path={"/managementTour"} element={<ManagementTour/>}/>
          <Route path={"/managementTravelTour"} element={<ManagementTravelTour/>}/>
          <Route path={"/managementHotel"} element={<ManagementHotel/>}/>
          <Route path={"/managementRestaurant"} element={<ManagementRestaurant/>}/>
          <Route path={"/managementVehicle"} element={<ManagementVehicle/>}/>

          <Route path={"/modalL"} element={<ModalAddLocation/>}/>
        </Routes>
    </BrowserRouter>
  );
}
export default App;
