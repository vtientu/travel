import Icons from "../Icons/Icon";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function TourCard({ tours = [], travelTours = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const maxVisibleDates = 4;

  const filteredTours = Array.isArray(tours) ? tours : [];

  if (filteredTours.length === 0) {
    return (
      <div className="text-center text-gray-600 py-10">
        Không có tour nào phù hợp...
      </div>
    );
    return (
      <div className="text-center text-gray-600 py-10">
        Không có tour nào phù hợp...
      </div>
    );
  }

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // console.log("Tour", tours);
  // console.log("Travel Tour", travelTours);

  return (
    <div>
      <div>
        {paginatedTours.map((tour) => {
          const tourDates = travelTours
            .filter((tt) => tt.tour_id === tour.id)
            .map((tt) => new Date(tt.start_day).toLocaleDateString("vi-VN"));

          // Di chuyển logic xử lý để sử dụng tourDates
          const handlePrevClick = () => {
            if (currentDateIndex > 0) {
              setCurrentDateIndex((prev) => Math.max(prev - 1, 0));
            }
          };

          const handleNextClick = () => {
            if (currentDateIndex < tourDates.length - maxVisibleDates) {
              setCurrentDateIndex((prev) =>
                Math.min(prev + 1, tourDates.length - maxVisibleDates)
              );
            }
          };

          const handleDateClick = (date) => {
            // Navigate to detail page with the selected date
            navigate(`/tour/${tour.id}`, { state: { selectedDate: date } });
          };

          return (
            <div
              key={tour.id}
              className="flex bg-white bg-opacity-40 mb-4 shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Hình ảnh Tour */}
              <div className="w-1/3 relative">
                <img
                  src={
                    tour.album?.[0] ||
                    "https://dummyimage.com/300x200/ddd/000&text=No+Image"
                    tour.album?.[0] ||
                    "https://dummyimage.com/300x200/ddd/000&text=No+Image"
                  }
                  alt="Tour"
                  className="w-full h-full object-cover rounded-l-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 bg-red-800 text-white text-sm font-bold px-3 py-1 rounded">
                  {tour.typeTour ? tour.typeTour.name_type : "Không rõ"}
                </span>
              </div>

              {/* Nội dung Tour */}
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <h3
                  className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-red-600"
                  onClick={() => navigate(`/tour/${tour.id}`)}
                >
                  {tour.name_tour}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center text-neutral-900">
                    <img src={Icons.Coupon} className="mr-2" />
                    <span>Mã tour:</span>{" "}
                    <span className="font-semibold ml-2">
                      {tour.code_tour || "Không rõ"}
                    </span>
                  </div>
                  <div className="flex items-center text-neutral-900">
                    <img src={Icons.Location1} className="mr-2" />
                    <span>Khởi hành:</span>{" "}
                    <span className="text-red-800 font-semibold ml-2">
                      {tour.startLocation?.name_location || "Không rõ"}
                    </span>
                  </div>
                  <div className="flex items-center text-neutral-900">
                    <img src={Icons.Clock} className="mr-2" />
                    <span>Thời gian:</span>{" "}
                    <span className="font-semibold ml-2">
                      {tour.day_number} ngày {tour.day_number - 1} đêm
                    </span>
                  </div>
                  <div className="flex items-center text-neutral-900">
                    <span>Dịch vụ:</span>{" "}
                    <span className="text-red-800 font-semibold ml-2">
                      {tour.services?.length > 0
                        ? tour.services
                            .map((service) => service.name_service)
                            .join(", ")
                        : "Không rõ"}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center text-neutral-900">
                    <img src={Icons.CalendarPre} className="mr-2" />
                    <span>Ngày khởi hành:</span>
                  </div>
                  <div className="flex space-x-2 items-center overflow-x-auto">
                    <AiOutlineArrowLeft
                      className="w-6 h-4 text-gray-600 cursor-pointer"
                      onClick={handlePrevClick}
                    />
                    {tourDates
                      .slice(
                        currentDateIndex,
                        currentDateIndex + maxVisibleDates
                      )
                      .map((date, index) => (
                        <span
                          key={index}
                          onClick={() => handleDateClick(date)}
                          className="px-2 py-1 border border-red-600 text-red-600 rounded text-xs cursor-pointer"
                        >
                          {date}
                        </span>
                      ))}
                    <AiOutlineArrowRight
                      className="w-6 h-4 text-gray-600 cursor-pointer"
                      onClick={handleNextClick}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-900">
                    Giá từ:
                    <p className="text-2xl text-red-800 font-bold">
                      {Number(tour.price_tour).toLocaleString("vi-VN")} VNĐ
                    </p>
                  </span>
                  <button
                    className="bg-[#A80F21] text-white text-sm py-2 px-4 rounded hover:bg-red-700"
                    onClick={() => navigate(`/tour/${tour.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <span className="px-4 py-2">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
}
