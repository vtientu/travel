import { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { BsCash, BsPaypal } from "react-icons/bs";
import { RiBankCardLine } from "react-icons/ri";
// import { Checkbox } from "@/components/ui/checkbox";

export default function BookingTour() {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-700 mb-4">Đặt tour</h2>
        
        {/* Thông tin liên lạc */}
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Thông tin liên lạc</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Họ tên" className="p-2 border rounded" />
            <input type="text" placeholder="Điện thoại" className="p-2 border rounded" />
            <input type="email" placeholder="Email" className="p-2 border rounded col-span-2" />
          </div>
        </div>

        {/* Hành khách */}
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Hành khách</h3>
          <div className="flex items-center gap-4">
            <div>
              <span>Người lớn:</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setAdultCount(Math.max(1, adultCount - 1))} className="p-1 border rounded">-</button>
                <span>{adultCount}</span>
                <button onClick={() => setAdultCount(adultCount + 1)} className="p-1 border rounded">+</button>
              </div>
            </div>
            <div>
              <span>Trẻ em:</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setChildCount(Math.max(0, childCount - 1))} className="p-1 border rounded">-</button>
                <span>{childCount}</span>
                <button onClick={() => setChildCount(childCount + 1)} className="p-1 border rounded">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin hành khách */}
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Thông tin hành khách</h3>
          <div className="flex items-center gap-2">
            <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
            <label>Tôi đồng ý chia sẻ thông tin với Viectu</label>
          </div>
        </div>

        {/* Hình thức thanh toán */}
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Các hình thức thanh toán</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 p-2 border rounded cursor-pointer">
              <BsCash className="text-xl" /> Tiền mặt
            </label>
            <label className="flex items-center gap-2 p-2 border rounded cursor-pointer">
              <FaRegCreditCard className="text-xl" /> Thẻ tín dụng
            </label>
            <label className="flex items-center gap-2 p-2 border rounded cursor-pointer">
              <RiBankCardLine className="text-xl" /> Thanh toán bằng ZaloPay
            </label>
            <label className="flex items-center gap-2 p-2 border rounded cursor-pointer">
              <BsPaypal className="text-xl" /> Thanh toán bằng VNPAY
            </label>
          </div>
        </div>

        {/* Điều khoản và đặt tour */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Tôi đồng ý với <a href="#" className="text-red-600">Chính sách bảo mật</a> và <a href="#" className="text-red-600">điều khoản</a>
          </p>
          <button className="mt-4 w-full bg-red-700 text-white py-2 rounded">Đặt tour ngay</button>
        </div>
      </div>
    </div>
  );
}
