import React from "react";

const tours = [
  {
    id: 1,
    name: "Nha Trang - Biển Nhũ Tiên",
    date: "28/02/2023",
    location: "TP. Hồ Chí Minh",
    price: 1990000,
    image: "https://example.com/image1.jpg",
  },
  // Thêm các tour khác...
];

const FavouriteTourCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <div
          key={tour.id}
          className="border rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={tour.image || "/placeholder.jpg"}
            alt={tour.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{tour.name}</h3>
            <p className="text-gray-600 mb-2">
              {tour.date} - {tour.location}
            </p>
            <p className="text-red-600 font-semibold">
              {tour.price.toLocaleString("vi-VN")} VND
            </p>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Xem chi tiết
              </button>
              <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                ♥
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouriteTourCard;