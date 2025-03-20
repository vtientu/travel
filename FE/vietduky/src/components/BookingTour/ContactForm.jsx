import { useEffect, useState } from "react";
import PassengerInfoForm from "./PassengerInfoForm";
import { StorageService } from "@/services/storage/StorageService";

const ContactForm = () => {
  const user = StorageService.getUser();

  const [passengers, setPassengers] = useState({
    adult: 0,
    child: 0,
    infant: 0,
  });
  const [formData, setFormData] = useState({
    user_id: user?.id || "",
    travel_tour_id: "",
    number_adult: passengers.adult,
    number_children: passengers.child,
    number_newborn: passengers.infant,
    total_cost: "",
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
    voucher_id: "",
    note: "",
  });

  // Cập nhật số lượng hành khách vào formData
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      number_adult: passengers.adult,
      number_children: passengers.child,
      number_newborn: passengers.infant,
    }));
  }, [passengers]);

  console.log(formData);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePassengerChange = (type, increment) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment),
    }));
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Thông tin liên lạc */}
      <div className="text-xl font-bold">Thông tin liên lạc</div>
      <div className="p-4 bg-[#ffe8ea] rounded-lg flex items-center gap-2">
        <span className="text-[#9e2418] font-semibold">Đăng nhập</span>
        <span className="text-zinc-900/90">
          {" "}
          để nhận ưu đãi, tích điểm và quản lý đơn hàng dễ dàng hơn!
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-bold after:content-['*'] after:text-red-500 after:ml-1">
            Họ tên
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Liên hệ"
            className="w-full py-2 rounded outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-bold after:content-['*'] after:text-red-500 after:ml-1">
            Điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Nhập số điện thoại"
            className="w-full py-2 rounded outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-bold after:content-['*'] after:text-red-500 after:ml-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Nhập email"
            className="w-full py-2 rounded outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Nhập địa chỉ"
            className="w-full py-2 rounded outline-none"
          />
        </div>
      </div>
      {/* Hành khách */}
      <div className="text-xl font-bold mb-4">Hành khách</div>

      <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Người lớn", type: "adult", desc: "Từ 12 trở lên", min: 0 },
                { label: "Trẻ em", type: "child", desc: "Từ 5 - 11 tuổi", min: 0 },
                { label: "Em bé", type: "infant", desc: "Dưới 2 tuổi", min: 0 },
              ].map(({ label, type, desc, min }) => (
                <div key={type} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex flex-col">
                    <span className="font-bold">{label}</span>
                    <span className="text-xs text-gray-500">{desc}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handlePassengerChange(type, -1)}>-</button>
                    <span className="text-lg font-bold">{passengers[type]}</span>
                    <button onClick={() => handlePassengerChange(type, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
      
            <PassengerInfoForm  passengers={passengers} />
    </div>
  );
};

export default ContactForm;
