import { useState } from "react";
import { Card } from "react-bootstrap";
import axios from 'axios';

export default function TourFilter({ onFilter }) {
  const [budget, setBudget] = useState(null);
  const [departure, setDeparture] = useState("Tất cả");
  const [destination, setDestination] = useState("Tất cả");
  const [date, setDate] = useState("");
  const [tourType, setTourType] = useState(null);
  const [tourTheme, setTourTheme] = useState(null);

  const handleApplyFilter = async () => {
    // Tạo đối tượng filter
    const filters = {
      budget,
      departure: departure !== "Tất cả" ? departure : undefined,
      destination: destination !== "Tất cả" ? destination : undefined,
      date,
      tourType,
      tourTheme,
    };

    // Gọi API tìm kiếm tour
    try {
      const response = await axios.get('http://localhost:3000/api/tour/search', {
        params: {
          start: filters.departure,
          end: filters.destination,
          date: filters.date,
          priceRange: budget ? budget.toLowerCase().replace(/ /g, '') : undefined,
          typeId: filters.tourType,
          topicId: filters.tourTheme,
        },
      });

      // Gọi callback để xử lý dữ liệu tour
      onFilter(response.data.data.tours);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const renderButtonGroup = (options, selected, setSelected) =>
    options.map((item) => (
      <button
        key={item}
        className={`border rounded-lg px-4 py-2 whitespace-nowrap ${
          selected === item
            ? "bg-red-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setSelected(item)}
      >
        {item}
      </button>
    ));

  return (
    <div>
      <Card className="p-4 w-80 bg-white shadow-lg bg-opacity-60 rounded-lg space-y-4">
        {/* Ngân sách */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Ngân sách:</h3>
          <div className="grid grid-cols-2 gap-2">
            {renderButtonGroup(
              ["Dưới 5 triệu", "Từ 5 - 10 triệu", "Từ 10 - 20 triệu", "Trên 20 triệu"],
              budget,
              setBudget
            )}
          </div>
        </div>

        {/* Điểm khởi hành */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Điểm khởi hành</h3>
          <select
            className="w-full p-2 border rounded"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
          </select>
        </div>

        {/* Điểm đến */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Điểm đến</h3>
          <select
            className="w-full p-2 border rounded"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Nha Trang">Nha Trang</option>
          </select>
        </div>

        {/* Ngày đi */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Ngày đi</h3>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Dòng Tour */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Dòng Tour</h3>
          <div className="grid grid-cols-2 gap-2">
            {renderButtonGroup(
              ["Cao cấp", "Tiêu chuẩn", "Tiết kiệm", "Giá tốt"],
              tourType,
              setTourType
            )}
          </div>
        </div>

        {/* Chủ đề Tour */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Tour theo chủ đề</h3>
          <div className="grid grid-cols-2 gap-2">
            {renderButtonGroup(
              ["Gia đình", "Honeymoon", "Mạo hiểm", "Nghỉ dưỡng"],
              tourTheme,
              setTourTheme
            )}
          </div>
        </div>

        {/* Nút áp dụng */}
        <button
          onClick={handleApplyFilter}
          className="w-full bg-red-600 text-white text-lg py-3 rounded-lg hover:bg-red-800 transition duration-200"
        >
          Áp dụng
        </button>
      </Card>
    </div>
  );
}