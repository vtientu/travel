import "./App.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "./components/Calendar/Calendar";
import GoogleAuthCallback from "./components/GoogleAuthCallback";
import PaymentForm from "./components/Payment/CreditCardForm.jsx";
import ProtectedRoute from "./components/PrivateRouter";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LayoutLandingPage from "./layouts/LayoutLandingPage.jsx";
import PersonalAIPage from "./layouts/PersonalAIPage.jsx";
import BookingComplete from "./page/Booking/BookingComplete.jsx";
import BookingConfirm from "./page/Booking/BookingConfirm.jsx";
import BookingTour from "./page/Booking/BookingInformation.jsx";
import DealsPage from "./page/DealsPage.jsx";
import DetailTourPage from "./page/DetailTourPage.jsx";
import ListTour from "./page/ListTourPage.jsx";
import ProfileCustomer from "./page/Account/ProfileCustomer";
import TourBookingHistoryPage from "@/page/Account/TourBookingHistoryPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path={"/"} element={<LayoutLandingPage />} />
        <Route path="/auth/callback" element={<GoogleAuthCallback />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfileCustomer />} />
          <Route path={"/booking/:id"} element={<BookingTour />} />
          <Route path={"/bookingConfirm"} element={<BookingConfirm />} />
          <Route path={"/bookingComplete"} element={<BookingComplete />} />
          <Route path={"/bookingHistory"} element={<TourBookingHistoryPage />} />
        </Route>
        <Route path={"/personalAI"} element={<PersonalAIPage />} />
        <Route path={"/deals"} element={<DealsPage />} />
        <Route path={"/listTour"} element={<ListTour />} />
        <Route path={"/detailTour"} element={<DetailTourPage />} />
        <Route path="/tour/:id" element={<DetailTourPage />} />

        <Route path={"/credit"} element={<PaymentForm />} />

        <Route path={"/calendar"} element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
