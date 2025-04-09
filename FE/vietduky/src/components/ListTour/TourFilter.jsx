import React, { useState } from "react";

const TourFilter = ({ onFilter, locations, typeTours, activeTopics }) => {
  const [selectedBudget, setSelectedBudget] = useState("");
  const [departure, setDeparture] = useState("Tất cả");
  const [destination, setDestination] = useState("Tất cả");
  const [date, setDate] = useState("");
  const [tourType, setTourType] = useState("");
  const [tourTheme, setTourTheme] = useState("");

  const budgetOptions = [
    "Dưới 5 triệu",
    "Từ 5 - 10 triệu",
    "Từ 10 - 20 triệu",
    "Trên 20 triệu",
  ];

  const tourTypes = typeTours.map((type) => type.name_type);
  const tourThemes = activeTopics.map((topic) => topic.name);  

  const handleBudgetClick = (option) => {
    setSelectedBudget(option === selectedBudget ? "" : option);
  };

  const handleTourTypeClick = (type) => {
    const selected = typeTours.find(t => t.name_type === type);
    setTourType(selected ? selected.id : "");
  };
  
  const handleTourThemeClick = (theme) => {
    const selected = activeTopics.find(t => t.name === theme);
    setTourTheme(selected ? selected.id : "");
  };

  // Lọc locations để loại bỏ địa điểm khởi hành
  const filteredDestinations = locations.filter(location => location.name_location !== departure);

  return (
    <div className="w-full max-w-[350px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Ngân sách */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Ngân sách:</h3>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleBudgetClick(option)}
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedBudget === option
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Điểm khởi hành */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Điểm khởi hành</label>
        <select
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option>Tất cả</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name_location}>
              {location.name_location}
            </option>
          ))}
        </select>
      </div>

      {/* Điểm đến */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Điểm đến</label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option>Tất cả</option>
          {filteredDestinations.map((location) => (
            <option key={location.id} value={location.name_location}>
              {location.name_location}
            </option>
          ))}
        </select>
      </div>

      {/* Ngày đi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ngày đi</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Dòng tour */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Dòng Tour</h3>
          {tourType && (
            <button
              onClick={() => setTourType("")}
              className="text-red-500 text-xs underline"
            >
              Xóa
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tourTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTourTypeClick(type)}
              className={`px-3 py-1 rounded-full border text-sm ${
                tourType === type
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Chủ đề */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Tours theo chủ đề</h3>
        <div className="flex flex-col gap-2">
          {tourThemes.map((theme) => (
            <button
              key={theme}
              onClick={() => handleTourThemeClick(theme)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm border ${
                tourTheme === theme
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Nút áp dụng */}
      <button
        onClick={() =>
          onFilter({
            departure,
            destination,
            date,
            priceRange: selectedBudget,
            tourType,
            tourTheme,
          })
        }
        className="w-full mt-4 bg-primary text-white py-2 rounded-md text-sm font-semibold"
      >
        Áp dụng
      </button>
    </div>
  );
};

export default TourFilter;