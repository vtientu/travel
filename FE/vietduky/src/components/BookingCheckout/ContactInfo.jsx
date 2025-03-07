import React from "react";

const ContactInfo = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200">
      {/* Tiêu đề */}
      <h2 className="text-red-600 text-lg font-bold">Thông tin liên lạc</h2>
      <div className="border-t border-gray-300 my-3"></div>

      {/* Nội dung */}
      <div className="grid grid-cols-2 gap-4 text-gray-900">
        <div>
          <p className="font-semibold">Họ tên</p>
          <p className="text-gray-700">E-DIGI_Google + mạnh</p>
        </div>
        <div>
          <p className="font-semibold">Email</p>
          <p className="text-gray-700">sapoc@gmail.com</p>
        </div>
        <div>
          <p className="font-semibold">Địa chỉ</p>
          <p className="text-gray-700">HN</p>
        </div>
        <div>
          <p className="font-semibold">Điện thoại</p>
          <p className="text-gray-700">*******005</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold">Ghi chú</p>
          <p className="text-gray-700">Không có ghi chú</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
