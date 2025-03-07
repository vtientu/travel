import LayoutBookingTour from "../../layouts/LayoutBookingTour";
import { useState } from "react";
import ContactForm from "../../components/BookingTour/ContactForm";
import PassengerInfoForm from "../../components/BookingTour/PassengerInfoForm";
import PaymentMethod from "../../components/BookingTour/PaymentMethod";
import TermsAndConditions from "../../components/BookingTour/TermsAndConditions";
import TourBooking from "../../components/BookingTour/TourBooking";

export default function BookingTour() {
  return (
    <LayoutBookingTour title="Đặt tour">
      <div className="w-full mx-auto p-6 flex gap-12">
        {/* Cột trái: Form điền thông tin */}
        <div className="flex flex-col gap-8 w-2/3">
          {[
            ContactForm,
            PaymentMethod,
            TermsAndConditions,
          ].map((Component, index) => (
            <div key={index} className="p-6 rounded-xl">
              <Component />
            </div>
          ))}
        </div>

        {/* Cột phải: TourBooking */}
        <div className="w-1/3 bg-white rounded-xl">
          <TourBooking />
        </div>
      </div>
    </LayoutBookingTour>
  );
}
