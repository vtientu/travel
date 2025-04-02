import { useState, useEffect } from "react";

export default function LocationVN() {
  const [discounts, setDiscounts] = useState([]);
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discountRes, tourRes, locationRes] = await Promise.all([
          fetch("http://localhost:3000/api/discount-service/").then((res) =>
            res.json()
          ),
          fetch("http://localhost:3000/api/tour").then((res) => res.json()),
          fetch("http://localhost:3000/api/location/").then((res) =>
            res.json()
          ),
        ]);

        if (discountRes?.data) {
          setDiscounts(discountRes.data);
        }

        setTours(tourRes);
        setFilteredTours(tourRes);

        const cityList = [
          "Tất cả",
          ...locationRes.map((location) => location.name_location),
        ];
        setCities(cityList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const destinations = [
    { name: "Đà Lạt", image: "/images/dalat.jpg", trips: 120 },
    { name: "Huế", image: "/images/hue.jpg", trips: 50 },
    { name: "Phú Quốc", image: "/images/phuquoc.jpg", trips: 30 },
    { name: "Hội An", image: "/images/hoian.jpg", trips: 15 },
    { name: "Cần Thơ", image: "/images/cantho.jpg", trips: 10 },
  ];

  return (
    <div className="bg-[rgba(254,238,199,0.35)]">
      <div className="py-10 w-4/5 mx-auto relative p-6">
        <div className="flex flex-col">
          <p className="text-3xl font-bold text-neutral-700">
            Các điểm du lịch phổ biến
          </p>
          <p className="text-gray-500 text-base mt-2">Bao La Thế Giới Bốn Bể Là Nhà</p>
          <div className="w-1/5 h-1 bg-[#A80F21] rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
          {destinations.map((place, index) => (
            <div
              key={index}
              className="relative group overflow-hidden"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-semibold">
                  {place.name}
                </h3>
                <p className="text-white text-sm">{place.trips} Hành Trình</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
