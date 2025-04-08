import BookingStep from "../components/BookingTour/BookingStep";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function LayoutBookingTour({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>
      <div className="flex-grow max-w-4xl mx-auto bg-white p-6 rounded-lg">
        <BookingStep />
      </div>
      <div className="flex-grow max-w-16xl mx-auto bg-white p-6 rounded-lg">
        {children}
      </div>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
}