import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import PaymentForm from "./components/CreditCard/CreditCardForm.jsx";
import GoogleAuthCallback from "./components/GoogleAuthCallback";
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
        <Route path="/account" element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfileCustomer />} />
        </Route>
        <Route path={"/personalAI"} element={<PersonalAIPage />} />
        <Route path={"/deals"} element={<DealsPage />} />
        <Route path={"/listTour"} element={<ListTour />} />
        <Route path={"/detailTour"} element={<DetailTourPage />} />
        <Route path="/tour/:id" element={<DetailTourPage />} />

        <Route path={"/booking"} element={<BookingTour />} />
        <Route path={"/bookingConfirm"} element={<BookingConfirm />} />
        <Route path={"/bookingComplete"} element={<BookingComplete />} />

        <Route path={"/credit"} element={<PaymentForm />} />

        <Route path={"/calendar"} element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
