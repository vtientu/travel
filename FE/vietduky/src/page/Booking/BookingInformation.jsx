import { useState } from "react";
import LayoutBookingTour from "../../layouts/LayoutBookingTour";
import ContactForm from "../../components/BookingTour/ContactForm";
import PaymentMethod from "../../components/BookingTour/PaymentMethod";
import TourBooking from "../../components/BookingTour/TourBooking";

export default function BookingTour() {
  const [formData, setFormData] = useState(null);

  return (
    <LayoutBookingTour title="Đặt tour">
      <div className="w-full mx-auto p-6 flex gap-12">
        {/* Cột trái */}
        <div className="flex flex-col gap-8 w-2/3">
          <div className="p-6 rounded-xl">
            <ContactForm onSubmit={setFormData} />
          </div>
          <div className="p-6 rounded-xl">
            <PaymentMethod />
          </div>
        </div>

        {/* Cột phải */}
        <div className="w-1/3 bg-white rounded-xl">
          <TourBooking formData={formData} />
        </div>
      </div>
    </LayoutBookingTour>
  );
}
