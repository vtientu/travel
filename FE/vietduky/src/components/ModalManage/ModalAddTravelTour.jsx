import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function ModalAddTravelTour({ onClose }) {
  const [tourId, setTourId] = useState(""); // ID của tour
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priceTour, setPriceTour] = useState("");
  const [maxPeople, setMaxPeople] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tourData = {
      tour_id: Number(tourId), // Đảm bảo là số
      start_time: startTime,
      end_time: endTime,
      price_tour: Number(priceTour), // Đảm bảo là số
      max_people: Number(maxPeople) // Đảm bảo là số
    };

    try {
      const response = await fetch("http://localhost:3000/api/travel-tour/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Thêm Travel Tour thành công!");
        window.location.reload(); // Reload lại trang sau khi thêm thành công
      } else {
        console.error("Lỗi từ API:", result);
        alert(`Lỗi: ${result.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi gửi request:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-6">
              {/* Cột trái */}
              <div>
                <h2 className="text-lg font-semibold">Thêm Travel Tour</h2>
                <h6 className="text-sm mb-4">
                  Quản trị viên thêm Travel Tour trong Tour
                </h6>

                {/* ID Tour */}
                <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                  Tour ID
                </label>
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Nhập ID tour"
                    value={tourId}
                    onChange={(e) => setTourId(e.target.value)}
                    required
                />

                {/* Ngày khởi hành */}
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                      Ngày khởi hành
                    </label>
                    <input
                        type="datetime-local"
                        className="w-[230px] p-2 border rounded text-gray-500"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                  </div>

                  {/* Mũi tên */}
                  <FaArrowRight className="text-gray-400 text-lg" />

                  {/* Ngày về */}
                  <div>
                    <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                      Ngày về
                    </label>
                    <input
                        type="datetime-local"
                        className="w-[230px] p-2 border rounded text-gray-500"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                  </div>
                </div>

                {/* Số người tối đa */}
                <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                  Số lượng người tối đa
                </label>
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Nhập số lượng người"
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(e.target.value)}
                    required
                />

                {/* Giá tour */}
                <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                  Giá Travel Tour
                </label>
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Nhập giá Travel Tour"
                    value={priceTour}
                    onChange={(e) => setPriceTour(e.target.value)}
                    required
                />
              </div>
            </div>

            {/* Button Actions */}
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
              >
                Tạo Tour mới
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
