import LayoutBookingTour from "../../layouts/LayoutBookingTour";
import { useState } from "react";
import BookingDetail from "../../components/BookingTour/BookingDetail";

export default function BookingDetails() {
  return (
    <LayoutBookingTour title="Xác nhận tour">
      <BookingDetail />
    </LayoutBookingTour>
  );
}
