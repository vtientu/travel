import React from "react";

const TourBooking = () => {
  return (
    <div className="flex flex-col items-end gap-2.5 h-[594.36px]">
      <div className="bg-gray-100 p-5 rounded-[10px] flex flex-col gap-3 h-[546.36px] overflow-hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-[240.71px] flex flex-col gap-10">
            <h2 className="text-neutral-900 text-base font-bold">
              Quảng Ngãi - Lý Sơn - Khám Phá Thiên Đường Biển Đảo (2N1D)
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-neutral-900 text-xs font-normal">Mã tour:</span>
              <span className="text-neutral-900 text-xs font-bold">NDQNG101-005-010325XE</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start gap-[150px] overflow-hidden">
          <div className="flex items-center gap-[49px]">
            <div className="flex items-center gap-2">
              <span className="text-neutral-900 text-base">Khởi hành:</span>
              <span className="text-red-700 text-base font-bold">Quảng Ngãi</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-neutral-900 text-base">Thời gian:</span>
              <span className="text-red-700 text-base font-bold">2N1Đ</span>
            </div>
          </div>

          <div className="flex items-center gap-[79px]">
            <span className="text-neutral-900 text-base font-bold">Khách hàng + Phụ thu</span>
            <span className="text-red-700 text-base font-bold">2.630.000 ₫</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 h-[106px]">
          <div className="w-[425.17px] flex justify-between items-center">
            <span className="text-neutral-900 text-xl font-bold">Tổng tiền</span>
            <span className="text-red-700 text-3xl font-bold">2.630.000 ₫</span>
          </div>
          <button className="px-[97px] py-[11px] bg-white rounded-[5px] border border-neutral-200 text-lg font-bold text-gray-400">
            Nhập thông tin để đặt tour
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-[11px] bg-red-700 rounded-[5px] text-white text-xs font-bold">
          Gọi miễn phí qua internet
        </button>
        <button className="px-3 py-[11px] bg-white rounded-[5px] border border-red-700 text-red-700 text-xs font-bold">
          Liên hệ tư vấn
        </button>
      </div>
    </div>
  );
};

export default TourBooking;
