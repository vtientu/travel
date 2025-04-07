import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function TourCard({ tours = [], travelTours = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const filteredTours = Array.isArray(tours) ? tours : [];

  if (filteredTours.length === 0) {
    return <div className="text-center text-gray-600 py-10">Không có tour nào phù hợp.</div>;
  }

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div>
        {paginatedTours.map((tour) => {
          const tourDates = travelTours
            .filter((tt) => tt.tour_id === tour.id)
            .map((tt) =>
              new Date(tt.start_time).toLocaleDateString("vi-VN")
            );

          return (
            <div
              key={tour.id}
              className="flex bg-white bg-opacity-40 mb-4 shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Hình ảnh Tour */}
              <div className="w-1/3 relative">
                <img
                  src={
                    tour.album?.[0] || "https://dummyimage.com/300x200/ddd/000&text=No+Image"
                  }
                  alt="Tour"
                  className="w-full h-full object-cover rounded-l-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  Tiết kiệm
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
                  <p>
                    <strong>Mã tour:</strong>{" "}
                    <span className="font-bold">{tour.id}</span>
                  </p>
                  <p>
                    <strong>Khởi hành:</strong>{" "}
                    <span className="text-red-600 font-bold">
                      {tour.startLocation?.name_location || "Không rõ"}
                    </span>
                  </p>
                  <p>
                    <strong>Thời gian:</strong>{" "}
                    <span className="font-bold">{tour.day_number} ngày</span>
                  </p>
                  <p>
                    <strong>Dịch vụ:</strong>{" "}
                    <span className="text-red-600 font-bold">
                      Khách sạn tiêu chuẩn
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-semibold">Ngày khởi hành:</span>
                  <div className="flex space-x-2 overflow-x-auto">
                    <AiOutlineArrowLeft className="w-6 h-4 text-gray-600 cursor-pointer" />
                    {tourDates.length > 0 ? (
                      tourDates.map((date, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 border border-red-500 text-red-500 rounded text-xs"
                        >
                          {date}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">Chưa có lịch</span>
                    )}
                    <AiOutlineArrowRight className="w-6 h-4 text-gray-600 cursor-pointer" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-red-600">
                    Giá từ: {Number(tour.price_tour).toLocaleString("vi-VN")} VNĐ
                  </span>
                  <button
                    className="bg-red-600 text-white text-sm py-2 px-4 rounded hover:bg-red-700"
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
