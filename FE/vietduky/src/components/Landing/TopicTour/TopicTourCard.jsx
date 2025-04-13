import Icons from "@/components/Icons/Icon";
import React, { useState, useEffect } from "react";

const TopicTourCard = ({
  id, // Expect tour ID to be passed down
  name_tour,
  endLocation,
  activity_description,
  price_tour,
  typeTour,
  album,
  day_number,
  startLocation,
  userId, // Expect userId to be passed down
}) => {
  const storageKey = `favoriteTours_${userId}`;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the tour is already a favorite
    const storedFavorites = JSON.parse(localStorage.getItem(storageKey)) || [];
    setIsFavorite(storedFavorites.includes(id)); // Check if ID is in favorites
  }, [id, storageKey]);

  const handleFavoriteToggle = (event) => {
    event.stopPropagation(); // Prevent event propagation
    setIsFavorite((prev) => {
      const newFavoriteStatus = !prev;
      const storedFavorites = JSON.parse(localStorage.getItem(storageKey)) || [];
      
      // Update favorites in localStorage
      if (newFavoriteStatus) {
        // Add to favorites if not already present
        if (!storedFavorites.includes(id)) {
          storedFavorites.push(id);
        }
      } else {
        // Remove from favorites
        const index = storedFavorites.indexOf(id);
        if (index > -1) {
          storedFavorites.splice(index, 1); // Remove the tour
        }
      }
      localStorage.setItem(storageKey, JSON.stringify(storedFavorites));
      return newFavoriteStatus;
    });
  };

  

  return (
    <div className="w-96 px-2 py-3 bg-white rounded-2xl flex flex-col gap-2 hover:bg-gray-300 cursor-pointer relative group">
      {typeTour && (
        <div className="absolute z-10 flex flex-col items-center -left-0 bg-red-800 shadow-md">
          <span className="text-white text-sm px-3 py-2.5 font-bold leading-tight">
            ✨ {typeTour.name_type}
          </span>
          <div className="absolute -bottom-2 bg-red-900 -left-0 w-0 h-0 border-r-[8px] border-r-transparent border-b-[8px] border-b-white group-hover:border-b-gray-300 opacity-90" />
        </div>
      )}
      {/* Hình ảnh + Thời gian */}
      <div className="relative h-60 rounded-2xl overflow-hidden">
        <img
          src={album[0]}
          alt="Tour"
          className="w-full h-full object-cover rounded-2xl"
        />
        <button 
          className={`absolute top-3 right-3 transition-all duration-300 `}
          onClick={handleFavoriteToggle}
        >
          <img 
            src={isFavorite ? Icons.HeartRed : Icons.Heart} 
            alt="Heart" 
            className="w-9 h-9" 
          />
        </button>
      </div>
      {/* Tiêu đề */}
      <h3 className="text-sky-900 text-base font-bold leading-tight">
        {name_tour}
      </h3>
      {/* Thông tin tour */}
      <div className="flex justify-between items-center text-blue-950 text-xs font-normal">
        <div className="flex items-center gap-2">
          <img src={Icons.Clock_3} alt="Clock" className="w-4 h-4" />
          <span>
            Thời gian:{" "}
            {day_number > 1
              ? `${day_number} Ngày ${day_number - 1} Đêm`
              : `${day_number} Ngày ${day_number} Đêm`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={Icons.ConciergeBell} alt="Concierge" className="w-4 h-4" />
          <img src={Icons.Plane} alt="Plane" className="w-4 h-4" />
          <img src={Icons.Car} alt="Car" className="w-4 h-4" />
        </div>
      </div>
      {/* Số lượng chỗ ngồi */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <img src={Icons.AimChair} alt="Seats" className="w-4 h-4" />
          <span className="text-neutral-900 text-sm">
            Số lượng chỗ ngồi còn trống:
          </span>
        </div>
        <span className="text-red-800 text-sm font-bold"></span>
      </div>
      {/* Giá cả */}
      <p className="text-gray-500 text-xs">Giá mỗi đêm chưa gồm thuế và phí</p>
      <p className="text-red-800 text-xl font-bold leading-7">
        {Number(price_tour).toLocaleString("vi-VN")} VNĐ
      </p>
    </div>
  );
};

export default TopicTourCard;