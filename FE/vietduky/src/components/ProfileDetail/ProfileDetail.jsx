import { CustomerService } from "@/services/API/customer.service";
import React, { useEffect, useState } from "react";

const ProfileDetail = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    CustomerService.getProfile()
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  if (!customer) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      {/* Thông tin cá nhân */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-red-800 text-2xl font-bold">
              Thông tin cá nhân
            </h2>
            <p className="text-zinc-500 text-lg mb-4">
              Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn
            </p>
          </div>
          <div className="">
            <img
              src={customer.avatar || "/Image/avatar.png"}
              alt="Avatar"
              className="w-12 h-12 rounded-full mx-auto mb-4"
            />
          </div>
        </div>

        <div className="divide-y">
          {[
            { label: "Họ tên", value: customer.displayName || "Chưa cập nhật" },
            { label: "Địa chỉ Email", value: customer.email },
            {
              label: "Số điện thoại",
              value: customer.Customer?.number_phone || "Chưa cập nhật",
            },
            {
              label: "Ngày sinh",
              value: customer.Customer?.birthdate || "Chưa cập nhật",
            },
            {
              label: "Giới tính",
              value: customer.Customer?.gender || "Chưa cập nhật",
            },
            {
              label: "Địa chỉ",
              value: customer.Customer?.address || "Chưa cập nhật",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center py-3"
            >
              <span className="text-zinc-500 text-lg">{item.label}</span>
              <span className="text-zinc-900 text-lg font-normal md:ml-auto">
                {item.value}
              </span>
              <a href="#" className="text-blue-700 text-lg md:ml-4">
                Chỉnh sửa
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Thông tin thẻ ngân hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-red-800 text-2xl font-bold">
          Thông tin thẻ ngân hàng
        </h2>
        <p className="text-zinc-500 text-lg mb-4">
          Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn
        </p>
        <div className="divide-y">
          {[
            { label: "Tên chủ thẻ", value: "Dương Thế Toàn" },
            { label: "Số thẻ", value: "**** **** **** 1234" },
            { label: "Hết hạn", value: "02/2025" },
            { label: "CVV", value: "***" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center py-3"
            >
              <span className="text-zinc-500 text-lg">{item.label}</span>
              <span className="text-zinc-900 text-lg font-normal md:ml-auto">
                {item.value}
              </span>
              <a href="#" className="text-blue-700 text-lg md:ml-4">
                Chỉnh sửa
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
