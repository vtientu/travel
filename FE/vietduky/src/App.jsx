import "./App.css";
import Icons from "./components/Icons/Icon.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import PersonalAIPage from "./page/PersonalAIPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import DealsPage from "./page/DealsPage.jsx";
import ListTour from "./page/ListTourPage.jsx";
import DetailTourPage from "./page/DetailTourPage.jsx";
import LayoutLandingPage from "./layouts/LayoutLandingPage.jsx";
import LayoutBookingTour from "./layouts/LayoutBookingTour.jsx";
import BookingTour from "./page/Booking/BookingInformation.jsx";
import BookingConfirm from "./page/Booking/BookingConfirm.jsx";
import BookingComplete from "./page/Booking/BookingComplete.jsx";
import PaymentForm from "./components/CreditCard/CreditCardForm.jsx";

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

          <Route path={"/booking"} element={<BookingTour/>}/>
          <Route path={"/bookingConfirm"} element={<BookingConfirm/>}/>
          <Route path={"/bookingComplete"} element={<BookingComplete/>}/>

          <Route path={"/credit"} element={<PaymentForm/>} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
