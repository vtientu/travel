import Icons from "@/components/Icons/Icon";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const ExpireTourCard = ({ title, duration, seatsLeft, originalPrice, discountPrice}) => {
  const [timeLeft, setTimeLeft] = useState("14:15:04");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeLeft(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 px-2 py-3 bg-white rounded-2xl flex flex-col gap-2 shadow">
      {/* Hình ảnh + Thời gian */}
      <div className="relative h-48 rounded-2xl overflow-hidden">
        <img
          src="https://pos.nvncdn.com/d75ecc-146199/art/artCT/20230807_oG6YHK3q.jpeg"
          alt="Tour"
          className="w-full h-full object-cover rounded-2xl"
        />
        <button className="absolute top-2 left-2 rounded-full shadow">
          <img src={Icons.Heart} alt="Heart" className="w-9 h-9" />
        </button>

        <div className="absolute bottom-3 left-3 bg-white px-3 py-2 rounded-[5px] flex justify-start items-center gap-1 shadow">
          <img src={Icons.Flame} />
          <span className="text-red-800 text-sm font-bold">Giờ chót</span>
        </div>

        <div className="absolute bottom-3 right-3 bg-white px-3 py-2 rounded-[5px] text-red-800 text-sm font-bold shadow">
          {timeLeft}
        </div>
      </div>

      {/* Tiêu đề */}
      <h3 className="text-sky-900 text-sm font-bold leading-tight">
        {title}
      </h3>

      {/* Thông tin tour */}
      <div className="flex justify-between items-center text-blue-950 text-xs font-normal">
        <div className="flex items-center gap-2">
          <img src={Icons.Clock_3} />
          <span className="text-blue-950 text-xs">Thời gian: {duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={Icons.ConciergeBell} />
          <img src={Icons.Plane} />
          <img src={Icons.Car} />
        </div>
      </div>

      {/* Số lượng chỗ ngồi */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <img src={Icons.AimChair} />
          <span className="text-neutral-900 text-sm">
            Số lượng chỗ ngồi còn trống:
          </span>
        </div>
        <span className="text-red-800 text-sm font-bold">{seatsLeft}</span>
      </div>

      {/* Giá cả */}
      <p className="text-gray-500 text-xs">Giá mỗi đêm chưa gồm thuế và phí</p>
      <p className="text-gray-900 text-sm">
        <span className="font-bold">Biểu giá: </span>
        <span className="line-through text-zinc-900 text-opacity-90 font-medium">
          {originalPrice}
        </span>
      </p>
      <p className="text-red-800 text-xl font-bold leading-7">{discountPrice}</p>
    </div>
  );
};

export default ExpireTourCard;
