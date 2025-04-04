import Icons from "../Icons/Icon";
import { BookingService } from "@/services/API/booking.service";
import { TourService } from "@/services/API/tour.service";
import { TravelTourService } from "@/services/API/travel_tour.service";
import { formatDate } from "@/utils/dateUtil";
import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Import Modal từ react-modal

// Thiết lập mặc định cho Modal
Modal.setAppElement("#root");

const BookingConfirmation = ({ bookingData }) => {
  const [booking, setBooking] = useState([]);
  const [travelTour, setTravelTour] = useState([]);
  const [tour, setTour] = useState([]);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false); // State hiển thị QR

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin booking
        const bookingResponse = await BookingService.getBookingById(
          bookingData?.id
        );
        if (bookingResponse?.data) {
          setBooking(bookingResponse.data);
        }

        // Lấy thông tin travel tour
        const travelTourResponse = await TravelTourService.getTravelTour(
          bookingData?.travel_tour_id
        );
        if (travelTourResponse?.data) {
          setTravelTour(travelTourResponse.data);

          // Gọi tour chỉ khi travelTour đã được lấy thành công
          const tourResponse = await TourService.getTour(
            travelTourResponse.data.tour_id
          );
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

  const generateAddInfo = () => {
    const randomLetters = String.fromCharCode(
      65 + Math.floor(Math.random() * 26),
      65 + Math.floor(Math.random() * 26)
    ); // Tạo 2 chữ cái ngẫu nhiên (A-Z)
    const timestamp = Math.floor(Date.now() / 1000); // Timestamp theo giây
    return `${randomLetters}${timestamp}`;
  };

  const qrSrc = `https://img.vietqr.io/image/mbbank-0868884528-compact2.jpg?amount=${bookingData?.total_cost}&addInfo=start${generateAddInfo()}end&accountName=VietDuKy`;

  // console.log("tour", travelTour);
  console.log("QR", qrSrc);
  
  

  return (
    <>
      <div className=" border border-[#b1b1b1] rounded-xl bg-white p-4 shadow-md ">
        <h2 className="text-[#a80f21] text-lg font-bold uppercase mb-3">
          Phiếu xác nhận booking
        </h2>

        <div className="w-full h-[150px] flex gap-6 rounded-md overflow-hidden mb-3">
          <img
            src={tour?.image || "/placeholder.jpg"}
            alt={tour?.name_tour}
            className="w-2/5 h-full rounded-xl object-cover"
          />
          <p className="text-sm font-semibold mb-2">{tour?.name_tour}</p>
        </div>

        <div className="flex text-sm mb-2 mt-6">
          <img src={Icons.Coupon} className="mr-6" />
          <span className="font-bold">Số booking: </span>
          <span className="text-[#a80f21] font-bold">
            {bookingData?.booking_code}
          </span>
        </div>

        <div className="border-t border-gray-300 my-3" />

        <div className="flex text-sm mb-4">
          <img src={Icons.Coupon} className="mr-6" />
          <span className="font-bold mr-6">Mã tour: </span>
          <span>{tour?.code_tour || "Chưa có mã tour"}</span>
        </div>

        <div className="border-t border-gray-300 my-3" />

        <h3 className="text-sm font-bold uppercase mb-2 flex items-center gap-1">
          <img src={Icons.Bus} className="mr-6" />
          Thông tin chuyến xe
        </h3>

        <div className="flex">
          <div className="flex-1 pr-4">
            <div className="text-sm font-semibold mb-3">
              Ngày đi - {travelTour?.start_time}
            </div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>06:30</span>
              <span>00:00</span>
            </div>
            <div className="relative mb-2">
              <div className="absolute -top-0.8 transforms -translate-y-1/3 w-2 h-2 bg-[#B1B1B1]" />
              <div className="border-b-2 border-[#B1B1B1]" />
              <div className="absolute right-0 -top-0 transforms -translate-y-1/3 w-2 h-2 bg-[#B1B1B1]" />
              <img
                src={Icons.Bus}
                className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-6 h-6"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{tour?.startLocation?.name_location}</span>
              <span>{tour?.endLocation?.name_location}</span>
            </div>
          </div>
          <div className="flex-1 border-l-2 border-gray-200 pl-4">
            <div className="text-sm font-semibold mb-3">
              Ngày về - {travelTour?.end_time}
            </div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>00:00</span>
              <span>06:30</span>
            </div>
            <div className="relative mb-2">
              <div className="absolute -top-0.8 transforms -translate-y-1/3 w-2 h-2 bg-[#B1B1B1]" />
              <div className="border-b-2 border-[#B1B1B1]" />
              <div className="absolute right-0 -top-0 transforms -translate-y-1/3 w-2 h-2 bg-[#B1B1B1]" />
              <img
                src={Icons.Bus}
                className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-6 h-6"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{tour?.endLocation?.name_location}</span>
              <span>{tour?.startLocation?.name_location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-white border border-[#a80f21] text-[#a80f21] font-bold py-3 rounded-xl hover:bg-gray-200 hover:text-[#a80f21]">
          Thanh toán sau
        </button>
        <button
          className="flex-1 bg-[#a80f21] text-white font-bold py-2 rounded-xl border border-[#a80f21] hover:bg-gray-100 hover:text-[#a80f21]"
          onClick={() => setIsQRModalOpen(true)} // Toggle hiển thị QR
        >
          Thanh toán ngay
        </button>
      </div>

      {/* Modal QR Code */}
      <Modal
        isOpen={isQRModalOpen}
        onRequestClose={() => setIsQRModalOpen(false)}
        contentLabel="QR Code Thanh Toán"
        overlayClassName={"fixed inset-0 bg-black bg-opacity-50 z-10"}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-0"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center z-40">
          <h3 className="text-lg font-bold mb-4 text-[#a80f21]">Quét mã QR để thanh toán</h3>
          <img src={qrSrc} alt="QR Code" className=" rounded-lg shadow-md mx-auto" />
          <button
            onClick={() => setIsQRModalOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400"
          >
            Đóng
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BookingConfirmation;