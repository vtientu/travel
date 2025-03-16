import { HiOutlineDotsHorizontal, HiOutlineInbox } from "react-icons/hi";
import { formatDayDMY } from "../../../utils/dateUtil";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import ModalAddTravelTour from "../ModalAddTravelTour";
import { deleteTravelTour, getTravelTourByTourId } from "../../../services/API/travel_tour.service";

export default function ModalManageTravelTour({ tourId, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [travelTours, setTravelTours] = useState([]);
  const [isAddTravelTourModalOpen, setIsAddTravelTourModalOpen] = useState(false);

  const handleAddTravelTour = () => {
    setIsAddTravelTourModalOpen(true);
  };

  const handleAddTravelTourSuccess = (newTravelTour) => {
    setTravelTours((prev) => [...prev, newTravelTour]);
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-3/4 overflow-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <h2 className="text-lg font-semibold">Lịch khởi hành</h2>
          <button onClick={onClose} className="text-gray-500">
            &times;
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 ">
            <LuSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm bằng từ khóa"
              className="pl-10 pr-4 py-2 border rounded-md w-1/3"
            />
          </div>
          <div className="flex gap-4">
            <button className="border px-4 py-2 rounded-md">
              Nhập danh sách hành trình
            </button>
            <button
              className="bg-red-700 text-white px-4 py-2 rounded-md"
              onClick={handleAddTravelTour}
            >
              Thêm hành trình
            </button>

            {isAddTravelTourModalOpen && (
              <ModalAddTravelTour
                tourId={tourId}
                onClose={() => setIsAddTravelTourModalOpen(false)}
                onAddSuccess={handleAddTravelTourSuccess}
              />
            )}
          </div>
        </div>

        <div className="relative">
          <div className="mt-4 mb-4 bg-white">
            <table className="w-full border-collapse border rounded-lg shadow-md bg-white">
              <thead>
                <tr className="text-SmokyGray">
                  <th className="p-2 text-left">Ngày khởi hành</th>
                  <th className="p-2">Ngày về</th>
                  <th className="p-2">Tình trạng chỗ</th>
                  <th className="p-2">Giá</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              {travelTours.length > 0 ? (
                <tbody>
                  {travelTours.map((travelTour, index) => (
                    <tr
                      key={index}
                      className={`border-t text-center ${
                        index % 2 === 0 ? "bg-white" : "bg-[#e4e4e7]"
                      }`}
                    >
                      <td className="p-2 text-left">
                        {formatDayDMY(travelTour.start_time)}
                      </td>
                      <td className="p-2">
                        {formatDayDMY(travelTour.end_time)}
                      </td>
                      <td className="p-2">{travelTour.max_people}</td>
                      <td className="p-2 text-RedPrice">
                        {travelTour.price_tour.toLocaleString("vi-VN")} VNĐ
                      </td>
                      <td className="flex justify-end p-2 relative">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="relative"
                        >
                          <HiOutlineDotsHorizontal className="text-xl cursor-pointer" />
                        </button>
                        {openDropdown === index && (
                          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                            <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap">
                              <MdEdit className="mr-2 text-gray-700" /> Cập
                              nhật hành trình
                            </button>
                            <button
                              onClick={() => handleDeleteTravelTour(index)}
                              className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600 whitespace-nowrap"
                            >
                              <MdDelete className="mr-2" /> Xóa hành trình
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-gray-100 rounded-full mb-2">
                        <HiOutlineInbox className="text-4xl text-gray-500" />
                      </div>
                      <p className="text-gray-500 text-lg">
                        Chưa có hành trình nào
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}