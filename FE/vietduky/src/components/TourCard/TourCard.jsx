import { TourService } from "../../services/API/tour.service";
import { TravelTourService } from "../../services/API/travel_tour.service";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TourCard() {
  const [tours, setTours] = useState([]);
  const [travelTours, setTravelTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/tour/")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched tours:", data); // Debug dữ liệu
                setTours(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error("Error fetching tours data:", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/travel-tour")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched travel tours:", data);
                setTravelTours(Array.isArray(data?.travelTours) ? data.travelTours : []);
            })
            .catch(error => console.error("Error fetching travel tours data:", error));
    }, []);

    useEffect(() => {
        console.log("Updated tours state:", tours);
    }, [tours]); // Kiểm tra React có render lại không

    if (!Array.isArray(tours) || tours.length === 0) {
        return <div>Không có dữ liệu tour</div>;
    }

  const totalPages = Math.ceil(tours.length / itemsPerPage);
  const paginatedTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div>
        {paginatedTours.map((tour) => {
          const tourDates = Array.isArray(travelTours)
            ? travelTours
                .filter((travelTour) => travelTour.tour_id === tour.id)
                .map((travelTour) =>
                  new Date(travelTour.start_time).toLocaleDateString("vi-VN")
                )
            : [];

                    return (
                        <div key={tour.id} className="flex bg-white bg-opacity-40 mb-4 shadow-lg rounded-lg overflow-hidden border border-gray-200">
                            <div className="w-1/3 relative">
                                <img
                                    src={tour.image || "https://via.placeholder.com/300"}
                                    alt="Tour Image"
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                                    Tiết kiệm
                                </span>
                            </div>

                            <div className="w-2/3 p-4 flex flex-col justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {tour?.name_tour || "N/A"}
                                </h3>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                                    <p><strong>Mã tour:</strong> <span className="font-bold">{tour?.id || "N/A"}</span></p>
                                    <p><strong>Khởi hành:</strong> <span className="text-red-600 font-bold">
                                        {tour?.startLocation?.name_location || "Chưa cập nhật"}
                                    </span></p>
                                    <p><strong>Thời gian:</strong> <span className="font-bold">{tour?.day_number || "N/A"} ngày</span></p>
                                    <p><strong>Dịch vụ:</strong> <span className="text-red-600 font-bold">Khách sạn tiêu chuẩn</span></p>
                                </div>

                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="text-sm font-semibold">Ngày khởi hành:</span>
                                    <div className="flex space-x-2 overflow-x-auto">
                                        <AiOutlineArrowLeft className="w-6 h-4 text-gray-600 cursor-pointer" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                                        {tourDates.map((date, index) => (
                                            <span key={index} className="px-2 py-1 border border-red-500 text-red-500 rounded text-xs">{date}</span>
                                        ))}
                                        <AiOutlineArrowRight className="w-6 h-4 text-gray-600 cursor-pointer" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-red-600">
                                        Giá từ: {Number(tour?.price_tour || 0).toLocaleString()} VNĐ
                                    </span>
                                    <button className="bg-red-600 text-white text-sm py-2 px-4 rounded hover:bg-red-700"
                                            onClick={() => navigate(`/tour/${tour.id}`)}>
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
