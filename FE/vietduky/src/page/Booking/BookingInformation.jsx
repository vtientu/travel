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
      <div className="justify-start items-start gap-2.5 inline-flex">
        <div className="py-0.5 flex-col justify-start items-start gap-6 inline-flex">
          <ContactForm />
          <PassengerInfoForm />
          <PaymentMethod />
          <TermsAndConditions />
        </div>
        <div className="flex-col justify-start items-end gap-2.5 inline-flex">
          <TourBooking />
        </div>
      </div>
    </LayoutBookingTour>
  );
}
