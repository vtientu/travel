import React from 'react';

const ContactInfo = () => {
  return (
    <div className="p-6 bg-[#f8f8f8] rounded-lg border border-gray-300 shadow-md">
      <div className="text-[#d80027] text-lg font-bold">Thông tin liên lạc</div>
      <div className="border-t border-gray-200 my-3"></div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        <div>
          <div className="text-gray-900 font-bold">Họ tên</div>
          <div className="text-gray-700">E-DIGI_Google + mạnh</div>
        </div>
        <div>
          <div className="text-gray-900 font-bold">Email</div>
          <div className="text-gray-700">sapoc@gmail.com</div>
        </div>
        <div>
          <div className="text-gray-900 font-bold">Địa chỉ</div>
          <div className="text-gray-700">HN</div>
        </div>
        <div>
          <div className="text-gray-900 font-bold">Điện thoại</div>
          <div className="text-gray-700">*******005</div>
        </div>
        <div className="col-span-2">
          <div className="text-gray-900 font-bold">Ghi chú</div>
          <div className="text-gray-700">Không có ghi chú</div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
