import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SideBarBooking from "@/components/TourBookingHistory/SideBarBooking.jsx";
import TourCardBooking from "@/components/TourBookingHistory/TourCardBooking.jsx";

export default function TourBookingHistoryPage() {
  return (
    <div
      className="bg-white"
      style={{
        backgroundImage: "url('/Image/Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Header />
      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <SideBarBooking />
          {/* Danh sách Tour */}
          <div className="w-full md:w-3/4">
            <div className="mt-4 space-y-4">
              <TourCardBooking />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
