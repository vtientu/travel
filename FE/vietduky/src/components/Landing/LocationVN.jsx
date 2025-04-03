import { LocationService } from "@/services/API/location.service";
import { useState, useEffect } from "react";

export default function LocationVN() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await LocationService.getAllLocations();
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="bg-[rgba(254,238,199,0.35)]">
      <div className="py-10 w-4/5 mx-auto relative p-6 cursor-pointer">
        <div className="flex flex-col">
          <p className="text-3xl font-bold text-neutral-700">
            Các điểm du lịch phổ biến
          </p>
          <p className="text-gray-500 text-base mt-2">
            Bao La Thế Giới Bốn Bể Là Nhà
          </p>
          <div className="w-1/5 h-1 bg-[#A80F21] rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
          {locations.map((place, index) => (
            <div key={index} className="relative group overflow-hidden">
              <img
                src={place.image}
                alt={place.name_location}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                <h3 className="text-white text-3xl font-semibold">
                  {place.name_location}
                </h3>
                <p className="text-white text-base">{place.trips} Hành Trình</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
