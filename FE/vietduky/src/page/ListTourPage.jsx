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
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTours, setFilteredTours] = useState([]);

  const itemsPerPage = 6;
  const navigate = useNavigate();

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

  const handleFilter = (filters) => {
    const { budget, departure, destination, date, tourType } = filters;

    let result = tours;

    if (budget) {
      result = result.filter((tour) => {
        const price = tour.price || 0;
        if (budget === "Dưới 5 triệu") return price < 5000000;
        if (budget === "Từ 5 - 10 triệu")
          return price >= 5000000 && price <= 10000000;
        if (budget === "Từ 10 - 20 triệu")
          return price > 10000000 && price <= 20000000;
        if (budget === "Trên 20 triệu") return price > 20000000;
        return true;
      });
    }

    if (departure !== "Tất cả") {
      result = result.filter((tour) => tour.departure?.includes(departure));
    }

    if (destination !== "Tất cả") {
      result = result.filter((tour) => tour.destination?.includes(destination));
    }

    if (date) {
      result = result.filter((tour) => tour.startDate?.startsWith(date));
    }

    if (tourType) {
      result = result.filter((tour) => tour.type?.includes(tourType));
    }

    setFilteredTours(result);
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
              <TourCard tours={tours} travelTours={travelTours} />
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
