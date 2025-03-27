import React from 'react';

const BookingInfo = ({ bookingData }) => {
  return (
    <div className="p-6 bg-[#f8f8f8] rounded-lg border border-gray-300 shadow-md">
      <div className="text-[#d80027] text-lg font-bold">Chi tiết booking</div>
      <div className="border-t border-gray-200 my-3"></div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="text-gray-900 font-bold">Mã đặt chỗ:</div>
          <div className="text-[#e01600] font-bold">{bookingData?.bookingCode || "N/A"}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-900 font-bold">Ngày tạo:</div>
          <div className="text-gray-900 font-bold">{bookingData?.createdAt || "N/A"}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-900 font-bold">Trị giá booking:</div>
          <div className="text-gray-900 font-bold">{bookingData?.total_cost.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }) || "0 ₫"}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-900 font-bold">Hình thức thanh toán:</div>
          <div className="text-[#a80f21] font-bold cursor-pointer">Thay đổi hình thức thanh toán</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-900 font-bold">Số tiền đã thanh toán:</div>
          <div className="text-gray-900 font-bold">0 ₫</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-900 font-bold">Tình trạng:</div>
          <div className="text-[#a80f21] font-bold">Booking của quý khách đã được chúng tôi xác nhận thành công</div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="text-gray-900 font-bold">Thời hạn thanh toán:</div>
            <div>
              <span className="text-[#e01600] font-bold">27/02/2025 23:50</span>
              <span className="text-gray-900 font-bold"> -</span>
            </div>
          </div>
          <div className="text-gray-600 text-sm mt-1">(Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn thanh toán trên)</div>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
