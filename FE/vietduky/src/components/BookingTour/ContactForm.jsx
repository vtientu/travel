import { useState } from "react";

const ContactForm = () => {
  const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    toddler: 0,
    infant: 0,
  });

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
        <span className="text-zinc-900/90"> để nhận ưu đãi, tích điểm và quản lý đơn hàng dễ dàng hơn!</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-bold">Họ tên *</label>
          <input type="text" placeholder="Liên hệ" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-bold">Điện thoại *</label>
          <input type="text" placeholder="Nhập số điện thoại" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-bold">Email *</label>
          <input type="email" placeholder="Nhập email" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-bold">Địa chỉ</label>
          <input type="text" placeholder="Nhập địa chỉ" className="w-full p-2 border rounded" />
        </div>
      </div>
      {/* Hành khách */}
      <div className="text-xl font-bold">Hành khách</div>
      {[
        { label: "Người lớn", type: "adult", desc: "Từ 12 trở lên" },
        { label: "Trẻ em", type: "child", desc: "Từ 5 - 11 tuổi" },
        { label: "Trẻ nhỏ", type: "toddler", desc: "Từ 2 - 4 tuổi" },
        { label: "Em bé", type: "infant", desc: "Dưới 2 tuổi" },
      ].map(({ label, type, desc }) => (
        <div key={type} className="flex items-center gap-4 border p-3 rounded-lg">
          <div className="flex-1">
            <div className="font-bold">{label}</div>
            <div className="text-xs text-gray-600">{desc}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePassengerChange(type, -1)}
              className="w-10 h-10 border rounded flex justify-center items-center"
            >
              -
            </button>
            <span className="text-lg font-bold">{passengers[type]}</span>
            <button
              onClick={() => handlePassengerChange(type, 1)}
              className="w-10 h-10 border rounded flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactForm;
