import { HiOutlineDotsHorizontal, HiOutlineInbox } from "react-icons/hi";
import { formatDayDMY } from "../../../utils/dateUtil";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import ModalAddTravelTour from "../ModalAddTravelTour";
import { deleteTravelTour, getTravelTourByTourId } from "../../../services/API/travel_tour.service";

export default function ModalManageTravelTour({ tourId, onClose }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [travelTours, setTravelTours] = useState([]);
  const [isAddTravelTourModalOpen, setIsAddTravelTourModalOpen] = useState(false);

  const handleAddTravelTour = () => {
    setIsAddTravelTourModalOpen(true);
  };

  const handleAddTravelTourSuccess = async () => {
    setIsAddTravelTourModalOpen(false);
    try {
      const response = await getTravelTourByTourId(tourId);
      const data = response.travelTours || response;
      setTravelTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi reload danh sách:", error);
    }
  };

  useEffect(() => {
    const fetchTravelTours = async () => {
      try {
        const response = await getTravelTourByTourId(tourId);
        const data = response.travelTours || response;
        setTravelTours(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu từ API", error);
        setTravelTours([]);
      }
    };

    fetchTravelTours();
  }, [tourId]);

  const handleDeleteTravelTour = async (index) => {
    const id = travelTours[index].id;
    try {
      await deleteTravelTour(id);
      setTravelTours((prev) => prev.filter((_, i) => i !== index));
      alert("Xóa hành trình thành công");
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      console.log("Lỗi khi xóa hành trình", error);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleWrapperClick = () => {
    onClose();
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleWrapperClick}>
        <div className="bg-white p-4 rounded-lg shadow-lg w-[80%] h-[80%] overflow-auto " onClick={handleModalClick}>
          <div className="flex justify-between items-center pb-3 mb-3">
            <h2 className="text-lg font-semibold">Lịch khởi hành Tour</h2>
            <button onClick={onClose} className="text-gray-500 text-xl font-bold">×</button>
          </div>

          <div className="mb-4">
            <div className="flex space-x-6 mb-4">
              <button className="text-red-700 font-semibold border-b-2 border-red-700 pb-2">Tất cả</button>
              <button className="text-gray-500 font-medium pb-2">Lịch trình sắp khởi hành</button>
              <button className="text-gray-500 font-medium pb-2">Lịch trình đang diễn ra</button>
              <button className="text-gray-500 font-medium pb-2">Lịch trình đã hoàn thành</button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="relative w-1/3">
                <LuSearch className="absolute left-3 top-2.5 text-gray-500" />
                <input type="text" placeholder="Tìm kiếm bằng từ khóa" className="pl-10 pr-4 py-2 border rounded-md w-full" />
              </div>
              <div className="flex gap-4">
                <button className="border px-4 py-2 rounded-md">Nhập danh sách lịch khởi hành</button>
                <button onClick={handleAddTravelTour} className="bg-red-700 text-white px-4 py-2 rounded-md">Thêm lịch khởi hành</button>
                {isAddTravelTourModalOpen && (
                    <ModalAddTravelTour
                        tourId={tourId}
                        onClose={() => setIsAddTravelTourModalOpen(false)}
                        onAddSuccess={handleAddTravelTourSuccess}
                    />
                )}
              </div>
            </div>

            {travelTours.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20">
                  <div className="p-4 bg-gray-100 rounded-full mb-2">
                    <HiOutlineInbox className="text-4xl text-gray-500" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium mb-4">Chưa có lịch khởi hành nào</p>
                  <button onClick={handleAddTravelTour} className="bg-red-700 text-white px-4 py-2 rounded-md">Thêm lịch khởi hành</button>
                </div>
            ) : (
                <div className="overflow-auto">
                  <table className="w-full  rounded-lg shadow-md bg-white">
                    <thead>
                    <tr className="text-SmokyGray">
                      <th className="p-2 text-left">Ngày khởi hành</th>
                      <th className="p-2">Ngày về</th>
                      <th className="p-2">Tình trạng chỗ</th>
                      <th className="p-2 ">Giá</th>
                      <th className="p-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {travelTours.map((travelTour, index) => {
                      if (!travelTour || !travelTour.start_time || !travelTour.end_time) return null; // ⛔ tránh crash

                      return (
                          <tr key={index} className={`border-t text-center ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                            <td className="p-2 text-left">{formatDayDMY(travelTour.start_time)}</td>
                            <td className="p-2">{formatDayDMY(travelTour.end_time)}</td>
                            <td className="p-2">{travelTour.max_people}</td>
                            <td className="p-2 text-RedPrice">{travelTour.price_tour.toLocaleString("vi-VN")} VNĐ</td>
                            <td className="flex justify-end p-2 relative">
                              {/* dropdown actions */}
                            </td>
                          </tr>
                      );
                    })}                    </tbody>
                  </table>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}