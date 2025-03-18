import "./App.css";
import PaymentForm from "./components/CreditCard/CreditCardForm.jsx";
import GoogleAuthCallback from "./components/GoogleSucces";
import ProtectedRoute from "./components/PrivateRouter";
import LayoutLandingPage from "./layouts/LayoutLandingPage.jsx";
import PersonalAIPage from "./layouts/PersonalAIPage.jsx";
import BookingComplete from "./page/Booking/BookingComplete.jsx";
import BookingConfirm from "./page/Booking/BookingConfirm.jsx";
import BookingTour from "./page/Booking/BookingInformation.jsx";
import DealsPage from "./page/DealsPage.jsx";
import DetailTourPage from "./page/DetailTourPage.jsx";
import ListTour from "./page/ListTourPage.jsx";
import Profile from "./page/Profile";
import ProfileCustomer from "./page/ProfileCustomer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LayoutLandingPage />} />
        <Route path="/auth/callback" element={<GoogleAuthCallback />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path={"/profileCus"} element={<ProfileCustomer />} />
        {/*<Route path={'/forgot-password'}/>*/}
        <Route path={"/personalAI"} element={<PersonalAIPage />} />
        <Route path={"/deals"} element={<DealsPage />} />
        <Route path={"/listTour"} element={<ListTour />} />
        <Route path={"/detailTour"} element={<DetailTourPage />} />
        <Route path="/tour/:id" element={<DetailTourPage />} />

        <Route path={"/booking"} element={<BookingTour />} />
        <Route path={"/bookingConfirm"} element={<BookingConfirm />} />
        <Route path={"/bookingComplete"} element={<BookingComplete />} />

        <Route path={"/credit"} element={<PaymentForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
