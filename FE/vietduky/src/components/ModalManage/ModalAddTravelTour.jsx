import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowRight } from "react-icons/fa";
import { createTravelTour } from "../../services/API/travel_tour.api";

export default function ModalAddTravelTour({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [travelTourData, setTravelTourData] = useState({
    tour_id: "", // Cần nhập ID Tour
    start_time: new Date(),
    end_time: new Date(),
    max_people: "",
    price_tour: "",
  });

  // Cập nhật state khi nhập dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTravelTourData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cập nhật ngày
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
      start_time: travelTourData.start_time.toISOString().split("T")[0], // Chuyển ngày về format YYYY-MM-DD
      end_time: travelTourData.end_time.toISOString().split("T")[0],
      max_people: parseInt(travelTourData.max_people, 10), // Đảm bảo là số nguyên
      price_tour: parseFloat(travelTourData.price_tour), // Đảm bảo là số
    };

    try {
      const response = await createTravelTour(formattedData);

      alert("Thêm Travel Tour thành công!");
      onClose();
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      console.log("Lỗi khi thêm Travel Tour", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">Thêm Travel Tour</h2>
          <h6 className="text-sm mb-4">Quản trị viên thêm Travel Tour trong Tour</h6>

          {/* ID Tour */}
          <label className="block mb-2 font-medium">
            ID Tour <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="tour_id"
            value={travelTourData.tour_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập ID Tour"
            required
          />

          <div className="flex items-center gap-4 mt-4">
            {/* Ngày khởi hành */}
            <div>
              <label className="block mb-2 font-medium">
                Ngày khởi hành <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={travelTourData.start_time}
                onChange={(date) => handleDateChange(date, "start_time")}
                selectsStart
                startDate={travelTourData.start_time}
                endDate={travelTourData.end_time}
                dateFormat="yyyy-MM-dd"
                className="w-[200px] p-2 border rounded text-gray-500"
              />
            </div>

            <FaArrowRight className="text-gray-400 text-lg" />

            {/* Ngày về */}
            <div>
              <label className="block mb-2 font-medium">
                Ngày về <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={travelTourData.end_time}
                onChange={(date) => handleDateChange(date, "end_time")}
                selectsEnd
                startDate={travelTourData.start_time}
                endDate={travelTourData.end_time}
                minDate={travelTourData.start_time}
                dateFormat="yyyy-MM-dd"
                className="w-[200px] p-2 border rounded text-gray-500"
              />
            </div>
          </div>

          {/* Số lượng người */}
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

          {/* Giá tour */}
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

          {/* Button Actions */}
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Hủy
            </button>
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Tạo Tour mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
