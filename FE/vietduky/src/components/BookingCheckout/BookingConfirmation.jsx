import React from "react";

const BookingConfirmation = () => {
  return (
    <div className="w-[360px] border border-[#b1b1b1] rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-[#a80f21] text-lg font-bold uppercase mb-3">
        Phiếu xác nhận booking
      </h2>
      <div className="w-full h-[120px] relative rounded-md overflow-hidden mb-3">
    
      </div>
      <p className="text-sm font-semibold mb-2">
        Quảng Ngãi - Lý Sơn - Khám Phá Thiên Đường Biển Đảo (2N1D)
      </p>
      <div className="text-sm mb-2">
        <span className="font-bold">Số booking: </span>
        <span className="text-[#a80f21] font-bold">2502274I989Q</span>
      </div>
      <div className="text-sm mb-4">
        <span className="font-bold">Mã tour: </span>NDQNG101-005-010325XE
      </div>
      <div className="border-t border-gray-300 my-3" />
      <h3 className="text-sm font-bold uppercase mb-2">Thông tin chuyến xe</h3>
      <div className="text-xs font-semibold mb-1">Ngày đi - 01/03/2025</div>
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>06:30</span>
        <span>00:00</span>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>Quảng Ngãi</span>
        <span>Quảng Ngãi</span>
      </div>
      <div className="text-xs font-semibold mb-1">Ngày về - 02/03/2025</div>
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>00:00</span>
        <span>06:30</span>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mb-4">
        <span>Quảng Ngãi</span>
        <span>Quảng Ngãi</span>
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
