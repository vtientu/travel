import React from "react";
import TermsAndConditions from "./TermsAndConditions";
import { useNavigate } from "react-router-dom";
import { BookingService } from "@/services/API/booking.service";

const TourBooking = ({ formData }) => {
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!formData) {
      alert("Vui lòng nhập đầy đủ thông tin trước khi đặt tour.");
      return;
    }

    try {
      const response = await BookingService.createBooking(formData);
      console.log("Booking success:", response);
      navigate("/bookingConfirm");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Đặt tour thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col items-end gap-4">
      {/* Box chứa thông tin tour */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md w-full">
        {/* Tiêu đề */}
        <h2 className="text-neutral-900 text-lg font-bold">
          Quảng Ngãi - Lý Sơn - Khám Phá Thiên Đường Biển Đảo (2N1D)
        </h2>

        {/* Mã tour */}
        <p className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Mã tour:</span>{" "}
          <span className="text-red-600 font-bold">NDQNG101-005-010325XE</span>
        </p>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-2 gap-4 border-t border-gray-300 mt-4 pt-4">
          <div>
            <span className="text-gray-700">Khởi hành:</span>
            <span className="text-red-600 font-semibold ml-1">Quảng Ngãi</span>
          </div>
          <div>
            <span className="text-gray-700">Thời gian:</span>
            <span className="text-red-600 font-semibold ml-1">2N1Đ</span>
          </div>
          <div className="col-span-2 flex justify-between border-b border-gray-300 pb-2">
            <span className="text-gray-700 font-semibold">Khách hàng + Phụ thu</span>
            <span className="text-red-600 font-bold text-lg">2.630.000 ₫</span>
          </div>
        </div>

        {/* Tổng tiền */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-xl font-bold text-gray-900">Tổng tiền</span>
          <span className="text-2xl font-bold text-red-600">2.630.000 ₫</span>
        </div>

        {/* Nút đặt tour */}
        <button onClick={handleBooking} className="w-full py-3 mt-4 bg-gray-300 text-gray-500 font-bold rounded-lg">
          Đặt tour
        </button>

        {/* Điều khoản */}
        <div className="w-full mt-4">
          <TermsAndConditions />
        </div>
      </div>

      {/* Nút gọi tư vấn */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold">
          Gọi miễn phí qua internet
        </button>
        <button className="px-4 py-2 bg-white border border-red-600 text-red-600 rounded-lg hover:bg-red-100 transition font-bold">
          Liên hệ tư vấn
        </button>
      </div>
    </div>
  );
};

export default TourBooking;
