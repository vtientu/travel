import { BookingService } from "@/services/API/booking.service";
import { TourService } from "@/services/API/tour.service";
import { TravelTourService } from "@/services/API/travel_tour.service";
import { formatDate } from "@/utils/dateUtil";
import React, { useEffect, useState } from "react";

const BookingConfirmation = ({ bookingData }) => {
  const [booking, setBooking] = useState([]);
  const [travelTour, setTravelTour] = useState([]);
  const [tour, setTour] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin booking
        const bookingResponse = await BookingService.getBookingById(bookingData?.id);
        if (bookingResponse?.data) {
          setBooking(bookingResponse.data);
        }

        // Lấy thông tin travel tour
        const travelTourResponse = await TravelTourService.getTravelTour(bookingData?.travel_tour_id);
        if (travelTourResponse?.data) {
          setTravelTour(travelTourResponse.data);
          
          // Gọi tour chỉ khi travelTour đã được lấy thành công
          const tourResponse = await TourService.getTour(travelTourResponse.data.tour_id);
          if (tourResponse?.data) {
            setTour(tourResponse.data?.data);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin:", error);
      }
    };

    fetchData();
  }, [bookingData]);

  console.log("tour", travelTour);
  

  return (
    <div className="w-[360px] border border-[#b1b1b1] rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-[#a80f21] text-lg font-bold uppercase mb-3">
        Phiếu xác nhận booking
      </h2>
      
      <div className="w-full h-[120px] relative rounded-md overflow-hidden mb-3">
        <img 
          src={tour?.image || "/placeholder.jpg"} 
          alt={tour?.name_tour} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <p className="text-sm font-semibold mb-2">
        {tour?.name_tour}
      </p>
      
      <div className="text-sm mb-2">
        <span className="font-bold">Số booking: </span>
        <span className="text-[#a80f21] font-bold">
          {bookingData?.booking_code}
        </span>
      </div>
      
      <div className="text-sm mb-4">
        <span className="font-bold">Mã tour: </span>{tour?.code_tour || "Chưa có mã tour"}
      </div>
      
      <div className="border-t border-gray-300 my-3" />
      
      <h3 className="text-sm font-bold uppercase mb-2">Thông tin chuyến xe</h3>
      
      <div className="text-xs font-semibold mb-1">
        Ngày đi - {travelTour?.start_time}
      </div>
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>06:30</span>
        <span>00:00</span>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>{tour?.startLocation?.name_location}</span>
        <span>{tour?.endLocation?.name_location}</span>
      </div>
      
      <div className="text-xs font-semibold mb-1">Ngày về - 02/03/2025</div>
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>00:00</span>
        <span>06:30</span>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mb-4">
        <span>{tour?.endLocation?.name_location}</span>
        <span>{tour?.startLocation?.name_location}</span>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-white border border-[#a80f21] text-[#a80f21] font-bold py-2 rounded-lg">
          Thanh toán sau
        </button>
        <button className="flex-1 bg-[#a80f21] text-white font-bold py-2 rounded-lg">
          Thanh toán ngay
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
