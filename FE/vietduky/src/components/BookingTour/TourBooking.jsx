import TermsAndConditions from "./TermsAndConditions";
import Icons from "@/components/Icons/Icon";
import { BookingService } from "@/services/API/booking.service";
import { TourService } from "@/services/API/tour.service";
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TourBooking = ({ formData, setFormData, tourId, travelTour }) => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [tours, setTours] = useState("");
  const [travelTourData, setTravelTourData] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await TourService.getTour(tourId);
        setTours(response?.data?.data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    fetchTours();
  }, [tourId]);

  useEffect(() => {
    const fetchTravelTour = async () => {
      try {
        if (travelTour && travelTour.length > 0) {
          setTravelTourData(travelTour[0]);
        }
      } catch (error) {
        console.error("Error fetching travel tour:", error);
      }
    };

    fetchTravelTour();
  }, [travelTour]);

  const handleBooking = async () => {
    if (!formData) {
      alert("Vui lòng nhập đầy đủ thông tin trước khi đặt tour.");
      return;
    }
  
    if (!Array.isArray(formData.passengers)) {
      alert("Danh sách hành khách không hợp lệ!");
      return;
    }
  
    try {
      const response = await BookingService.createBooking(formData);
  
      alert("Đặt tour thành công!");
  
      // Ghi dữ liệu vào localStorage
      localStorage.setItem("bookingResult", JSON.stringify(response));
  
      // Điều hướng
      navigate("/bookingConfirm");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Đặt tour thất bại. Vui lòng thử lại!");
    }
  };

  const totalPrice =
    (formData?.number_adult +
      formData?.number_children +
      formData?.number_newborn || 0) * travelTourData?.price_tour;

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      total_cost: totalPrice,
    }));
  }, [totalPrice]);

  console.log("Dữ liệu booking:", formData);

  return (
    <div className="flex flex-col items-end gap-4">
      {/* Box chứa thông tin tour */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full border border-gray-200">
        {/* Ảnh và tiêu đề */}
        <div className="flex gap-4">
          <img
            src={tours.image || "/placeholder.jpg"}
            alt="tour"
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-neutral-900 text-base font-bold">
              {tours.name_tour}
            </h2>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Mã tour:</span>{" "}
              <span className="text-gray-800 font-bold">
                {tours.code_tour || "Chưa có mã Tour"}
              </span>
            </p>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-2 gap-4 border-y border-gray-200 mt-4 py-3 text-sm">
          <div>
            <span className="text-gray-700">Khởi hành:</span>
            <span className="text-red-600 font-semibold ml-1">
              {tours.startLocation?.name_location}
            </span>
          </div>
          <div>
            <span className="text-gray-700">Thời gian:</span>
            <span className="text-red-600 font-semibold ml-1">2N1Đ</span>
          </div>
        </div>

        {/* Tổng tiền và chi tiết giá */}
        <div className="mt-4 space-y-2 text-sm text-gray-800">
          <div className="flex justify-between font-semibold text-base">
            <span>Khách hàng + Phụ thu</span>
            <span className="text-red-600 font-bold">
              {totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>

          {/* Giá tour */}
          {formData && (
            <div className="">
              {formData.number_adult > 0 && (
                <div className="flex justify-between">
                  <span>Người lớn</span>
                  <span>
                    {formData.number_adult} x{" "}
                    {travelTourData?.price_tour?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }) || "0 ₫"}
                  </span>
                </div>
              )}

              {formData.number_children > 0 && (
                <div className="flex justify-between">
                  <span>Trẻ em</span>
                  <span>
                    {formData.number_children} x{" "}
                    {travelTourData?.price_tour?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }) || "0 ₫"}
                  </span>
                </div>
              )}

              {formData.number_newborn > 0 && (
                <div className="flex justify-between">
                  <span>Em bé</span>
                  <span>
                    {formData.number_newborn} x{" "}
                    {travelTourData?.price_tour?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }) || "0 ₫"}
                  </span>
                </div>
              )}
            </div>
          )}

          {formData?.singleRoomSurcharge > 0 && (
            <div className="flex justify-between">
              <span>Phụ thu phòng đơn</span>
              <span>
                {formData.singleRoomSurcharge.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Mã giảm giá */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center gap-2 text-sm font-semibold cursor-pointer">
            <span className="text-lg font-bold flex items-center gap-2">
              <img src={Icons.Voucher} alt="Voucher" className="w-6 h-6" />
              <span className="uppercase">Mã giảm giá</span>
            </span>
            <span className="text-red-600 flex justify-between items-center gap-2">
              <img src={Icons.AddCircle} className="w-5 h-5" />
              <span>Thêm mã giảm giá</span>
            </span>
          </div>
        </div>

        {/* Tổng tiền sau cùng */}
        <div className="mt-4 border-t border-gray-300 pt-4 flex justify-between items-center text-lg font-bold ">
          <span>Tổng tiền</span>
          <span className="text-red-600">
            {totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>

        {/* Nút đặt tour */}
        {agreed ? (
          <button
            onClick={handleBooking}
            className="w-full py-3 mt-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
          >
            Đặt Tour
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 mt-4 bg-gray-200 text-gray-500 font-bold rounded-lg cursor-not-allowed"
          >
            Đặt Tour
          </button>
        )}

        {/* Checkbox điều khoản */}
        <div className="text-xs text-gray-600 mt-3 flex items-start gap-2">
          <TermsAndConditions agreed={agreed} setAgreed={setAgreed} />
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
