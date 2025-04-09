import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeaderCard from "@/components/ListTour/HeaderCard";
import SearchBar from "@/components/ListTour/SearchBar";
import TourFilter from "@/components/ListTour/TourFilter";
import TourCard from "@/components/TourCard/TourCard";
import { LocationService } from "@/services/API/location.service";
import { TopicService } from "@/services/API/topic.service";
import { TourService } from "@/services/API/tour.service";
import { TravelTourService } from "@/services/API/travel_tour.service";
import { TypeTourService } from "@/services/API/type_tour.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListTour() {
  const [tours, setTours] = useState([]);
  const [travelTours, setTravelTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tourTypes, setTourTypes] = useState([]);
  const [topics, setTopics] = useState([]);

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

    const fetchLocations = async () => {
      try {
        const locationsResponse = await LocationService.getAllLocations();
        setLocations(locationsResponse.data);
      } catch (error) {
        console.error("Error fetching locations data:", error);
      }
    };

    const fetchTourTypes = async () => {
      try {
        const tourTypesResponse = await TypeTourService.getTypeTour();
        setTourTypes(tourTypesResponse.data);
      } catch (error) {
        console.error("Error fetching tour types data:", error);
      }
    };

    const fetchTopics = async () => {
      try {
        const topicsResponse = await TopicService.getTopic();
        setTopics(topicsResponse.data.data);
      } catch (error) {
        console.error("Error fetching topics data:", error);
      }
    };

    fetchTours();
    fetchTravelTours();
    fetchLocations();
    fetchTourTypes();
    fetchTopics();
  }, []);

  const handleFilter = async (filterParams) => {
    try {
      const res = await TourService.searchTour(filterParams);
      setFilteredTours(res.data.data.tours);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm tour:", err);
    }
  };

  console.log("Filtered Tours:", filteredTours);

  const activeTopics = topics.filter((topic) => topic.active === true);

  return (
    <div className="bg-white">
      {/* Header */}
      <Header />
      <HeaderCard />
      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <h2 className="text-lg font-bold bg-transparent text-gray-900 py-8">
              Bộ lọc tìm kiếm
            </h2>
            {/* Bộ lọc bên trái */}
            <TourFilter
              tours={tours}
              travelTours={travelTours}
              locations={locations}
              typeTours={tourTypes}
              activeTopics={activeTopics}
              onFilter={handleFilter}
            />
          </div>
          {/* Danh sách Tour */}
          <div className="w-full md:w-3/4">
            {/* Ô tìm kiếm */}
            <div className="">
              <SearchBar tours={tours} travelTours={travelTours} />
            </div>
            {/* Danh sách Tour */}
            <div className="mt-4 space-y-4">
              <TourCard
                tours={filteredTours.length > 0 ? filteredTours : tours}
                travelTours={travelTours}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
