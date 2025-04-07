import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeaderCard from "@/components/ListTour/HeaderCard";
import SearchBar from "@/components/ListTour/SearchBar";
import TourFilter from "@/components/ListTour/TourFilter";
import TourCard from "@/components/TourCard/TourCard";
import { TourService } from "@/services/API/tour.service";
import { TravelTourService } from "@/services/API/travel_tour.service";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListTour() {
  const [tours, setTours] = useState([]);
  const [travelTours, setTravelTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const toursResponse = await TourService.getTours();
        setTours(toursResponse.data.data);
      } catch (error) {
        console.error("Error fetching tours data:", error);
      }
    };

    const fetchTravelTours = async () => {
      try {
        const travelToursResponse = await TravelTourService.getTravelTours();
        setTravelTours(travelToursResponse.data.travelTours);
      } catch (error) {
        console.error("Error fetching travel tours data:", error);
      }
    };

    fetchTours();
    fetchTravelTours();
  }, []);

  const handleFilter = (tours) => {
    setFilteredTours(tours);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <Header />
      <HeaderCard />
      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold bg-transparent text-gray-900 mb-4">
          Bộ lọc tìm kiếm
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Bộ lọc bên trái */}
          <TourFilter
            tours={tours}
            travelTours={travelTours}
            onFilter={handleFilter}
          />
          {/* Danh sách Tour */}
          <div className="w-full md:w-3/4">
            {/* Ô tìm kiếm */}
            <SearchBar tours={tours} travelTours={travelTours} />
            {/* Danh sách Tour */}
            <div className="mt-4 space-y-4">
              {/* {filteredTours.map((tour) => ( */}
                <TourCard tours={tours} />
              {/* ))} */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
