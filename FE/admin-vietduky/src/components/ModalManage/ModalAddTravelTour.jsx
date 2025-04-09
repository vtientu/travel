import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowRight } from "react-icons/fa";
import { createTravelTour } from "../../services/API/travel_tour.service";

export default function ModalAddTravelTour({ tourId, onClose, onAddSuccess }) {
  const [loading, setLoading] = useState(false);
  const [travelTourData, setTravelTourData] = useState({
    tour_id: tourId,
    start_day: new Date(),
    end_day: new Date(),
    max_people: "",
    price_tour: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTravelTourData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setTravelTourData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      ...travelTourData,
      start_day: travelTourData.start_day.toISOString().split("T")[0],
      end_day: travelTourData.end_day.toISOString().split("T")[0],
      max_people: parseInt(travelTourData.max_people, 10),
      price_tour: parseFloat(travelTourData.price_tour),
    };

    try {
      const response = await createTravelTour(formattedData);

      alert("Thêm Travel Tour thành công!");
      onClose();

      if (onAddSuccess) {
        onAddSuccess(response.data); // Giả sử API trả về dữ liệu mới
      }
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      console.log("Lỗi khi thêm Travel Tour", error);
    } finally {
      setLoading(false);
    }
  };
  const handleWrapperClick = () => {
    onClose();
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[9999]"
      onClick={handleWrapperClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-auto relative"
        onClick={handleModalClick}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">Thêm lịch khởi hành</h2>
          <h6 className="text-sm mb-4">
            Quản trị viên thêm lịch khởi hành vào Tour
          </h6>

          <div className="flex items-center gap-4 mt-4">
            <div>
              <label className="block mb-2 font-medium">
                Ngày khởi hành <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={travelTourData.start_day}
                onChange={(date) => handleDateChange(date, "start_day")}
                selectsStart
                startDate={travelTourData.start_day}
                endDate={travelTourData.end_day}
                dateFormat="yyyy-MM-dd"
                className="w-[200px] p-2 border rounded text-gray-500"
              />
            </div>

            <FaArrowRight className="text-gray-400 text-lg" />

            <div>
              <label className="block mb-2 font-medium">
                Ngày về <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={travelTourData.end_day}
                onChange={(date) => handleDateChange(date, "end_day")}
                selectsEnd
                startDate={travelTourData.start_day}
                endDate={travelTourData.end_day}
                minDate={travelTourData.start_day}
                dateFormat="yyyy-MM-dd"
                className="w-[200px] p-2 border rounded text-gray-500"
              />
            </div>
          </div>

          <label className="block mt-4 mb-2 font-medium">
            Số lượng người <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="max_people"
            value={travelTourData.max_people}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập số lượng người"
            required
          />

          <label className="block mt-4 mb-2 font-medium">
            Giá Travel Tour <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price_tour"
            value={travelTourData.price_tour}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập giá Travel Tour"
            required
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Tạo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
