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
import { useLocation } from "react-router-dom";

export default function ListTour() {
  const location = useLocation();
  const [tours, setTours] = useState([]);
  const [travelTours, setTravelTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tourTypes, setTourTypes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [message, setMessage] = useState("");

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
        setTravelTours(travelToursResponse.data.data);
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
    // Kiểm tra xem có bộ lọc nào hợp lệ không
    const hasFilters = Object.values(filterParams).some(param => param !== "" && param !== "Tất cả");
  
    if (!hasFilters) {
      // Nếu không có bộ lọc, đặt lại danh sách tour về danh sách gốc
      setFilteredTours(tours);
      setMessage(""); // Xóa thông báo
      return;
    }
  
    try {
      const res = await TourService.searchTour(filterParams);
      const toursData = res.data.data.tours;
      setFilteredTours(toursData);
      setMessage(toursData.length === 0 ? "Không tìm thấy tour nào." : ""); // Cập nhật thông báo
    } catch (err) {
      console.error("Lỗi khi tìm kiếm tour:", err);
      setMessage("Không tìm thấy tour nào !"); // Hiển thị thông báo nếu có lỗi
    }
  };

  const activeTopics = topics.filter((topic) => topic.active === true);

  console.log("filteredTours", filteredTours);
  

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
              locations={locations}
              typeTours={tourTypes}
              activeTopics={activeTopics}
              onFilter={handleFilter}
              initialDeparture={location.state?.departure || "Tất cả"} // Truyền departure từ state
              initialDate={location.state?.date || ""} // Truyền date từ state
              initialDestination={location.state?.destination || ""} // Truyền destination từ state
            />
          </div>
          {/* Danh sách Tour */}
          <div className="w-full md:w-3/4">
            {/* Ô tìm kiếm */}
            <div>
              <SearchBar tours={tours} travelTours={travelTours} filteredTours={filteredTours}/>
            </div>
            {/* Danh sách Tour */}
            <div className="mt-4 space-y-4">
              {message && <div className="text-red-500 font-semibold text-2xl">{message}</div>}{" "}
              {!message && (
                <TourCard
                  tours={filteredTours.length > 0 ? filteredTours : tours}
                  travelTours={travelTours}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
