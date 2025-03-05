import { useState } from "react";

const PassengerInfoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    assistance: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-neutral-900">Thông tin hành khách</h2>
      <div className="p-4 bg-[#ffe8eb] rounded-lg flex items-center gap-2.5">
        <input
          type="checkbox"
          name="assistance"
          checked={formData.assistance}
          onChange={handleChange}
          className="w-6 h-6 border border-[#5d5d5d] rounded-md"
        />
        <span className="text-sm font-semibold text-zinc-900/90">
          Tôi cần được nhân viên tư vấn VietDuKy trợ giúp nhập thông tin đăng ký dịch vụ
        </span>
      </div>
      <div className="border-b border-[#b1b1b1]" />
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col w-1/4">
          <label className="text-sm font-bold">Họ tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Liên hệ"
            className="p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col w-1/4">
          <label className="text-sm font-bold">Điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col w-1/4">
          <label className="text-sm font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col w-1/4">
          <label className="text-sm font-bold">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
            className="p-2 border rounded-md"
          />
        </div>
      </div>
      <div className="border-b border-[#b1b1b1]" />
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Ghi chú</h3>
        <p className="text-base text-neutral-900">
          Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi
        </p>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Anh hoặc tiếng Việt"
          className="p-4 w-full h-24 border rounded-md bg-[#f8f8f8]"
        />
      </div>
    </div>
  );
};

export default PassengerInfoForm;
