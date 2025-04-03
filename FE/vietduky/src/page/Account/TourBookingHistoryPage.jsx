import TourCardBooking from "@/components/Account/TourCardBooking.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SideBarAccount from "@/components/Sidebar/SideBarAccount.jsx";
import LayoutAccountService from "@/layouts/LayoutAccountService";

export default function TourBookingHistoryPage() {
  return (
    <LayoutAccountService>
      <div className="p-6">
        <div className="space-y-6">
          <TourCardBooking />
        </div>
      </div>
    </LayoutAccountService>
  );
}
