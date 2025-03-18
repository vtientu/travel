import { useState, useEffect } from "react";

const ProfileCustomer = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Giả lập API fetch dữ liệu
    setTimeout(() => {
      setUserData({
        name: "Phạm Đức Mạnh",
        email: "sapocxdcwqeqwqewq@gmail.com",
        phone: "Thêm số điện thoại của bạn",
        birthday: "21/06/2002",
        gender: "Nam",
        address: "Nam Từ Liêm, Cầu Giấy, Hà Nội",
        card: {
          owner: "Phạm Đức Mạnh",
          number: "4234 5242 5672 123",
          expiry: "02/2025",
          cvv: "***",
        },
      });
    }, 1000);
  }, []);

  if (!userData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-xl font-bold text-red-600">Hồ sơ của tôi</h2>
      <div className="bg-white shadow-md rounded-lg p-5 mt-5">
        <h3 className="text-lg font-bold text-red-600">Thông tin cá nhân</h3>
        <p className="text-gray-500 text-sm mb-4">Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</p>
        <div className="space-y-3">
          {[
            { label: "Họ tên", value: userData.name },
            { label: "Địa chỉ Email", value: userData.email },
            { label: "Số điện thoại", value: userData.phone },
            { label: "Ngày sinh", value: userData.birthday },
            { label: "Giới tính", value: userData.gender },
            { label: "Địa chỉ", value: userData.address },
          ].map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
              <a href="#" className="text-blue-500">Chỉnh sửa</a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-5 mt-5">
        <h3 className="text-lg font-bold text-red-600">Thông tin thẻ ngân hàng</h3>
        <p className="text-gray-500 text-sm mb-4">Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</p>
        <div className="space-y-3">
          {[
            { label: "Tên chủ thẻ", value: userData.card?.owner },
            { label: "Số thẻ", value: userData.card.number },
            { label: "Hết hạn", value: userData.card.expiry },
            { label: "CVV", value: userData.card.cvv },
          ].map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
              <a href="#" className="text-blue-500">Chỉnh sửa</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomer;
