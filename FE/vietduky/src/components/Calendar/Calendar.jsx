import Icons from "../Icons/Icon";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "dayjs/locale/vi";
import { TourService } from "@/services/API/tour.service";
import { TravelTourService } from "@/services/API/travel_tour.service";

dayjs.locale("vi");

const Calendar = ({ id }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDates, setSelectedDates] = useState([]);

  const [tourDates, setTourDates] = useState([]);

  useEffect(() => {
    const fetchTourDates = async () => {
        try {
          const response = await TravelTourService.getTravelTourByTourId(id);
          const travelTourData = response.data;
      
          if (!Array.isArray(travelTourData)) {
            console.error("Dữ liệu travelTourData không hợp lệ:", travelTourData);
            setTourDates({});
            return;
          }
      
          const formattedTourDates = travelTourData.reduce((acc, tour) => {
            if (tour.start_time) {
              const dateStr = dayjs(tour.start_time).format("YYYY-MM-DD");
              acc[dateStr] = tour.price_tour.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              });
            }
            return acc;
          }, {});
      
          setTourDates(formattedTourDates);
        } catch (error) {
          console.error("Error fetching travel tour data:", error);
        }
      };
      

    fetchTourDates();
  }, [id]);

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const totalDays = 42;

  const days = Array.from({ length: totalDays }, (_, index) => {
    return startOfMonth.subtract(startDay, "day").add(index, "day");
  });

  const startYear = Math.floor(currentDate.year() / 16) * 16;
  const years = Array.from({ length: 16 }, (_, i) => startYear + i);
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format("MMMM")
  );

  const handlePrev = () => {
    if (viewMode === "calendar")
      setCurrentDate(currentDate.subtract(1, "month"));
    else if (viewMode === "month")
      setCurrentDate(currentDate.subtract(1, "year"));
    else if (viewMode === "year")
      setCurrentDate(currentDate.subtract(16, "year"));
  };

  const handleNext = () => {
    if (viewMode === "calendar") setCurrentDate(currentDate.add(1, "month"));
    else if (viewMode === "month") setCurrentDate(currentDate.add(1, "year"));
    else if (viewMode === "year") setCurrentDate(currentDate.add(16, "year"));
  };

  const toggleDateSelection = (dateStr) => {
    setSelectedDates((prev) =>
      prev.includes(dateStr)
        ? prev.filter((date) => date !== dateStr)
        : [...prev, dateStr]
    );
  };

  return (
    <div className="">
      <div className="bg-yellow-100 p-5 rounded-md shadow-lg">
        <h2 className="text-red-600 font-bold text-2xl">
          Lịch Trình và Giá Tour
        </h2>

        <div className="bg-white p-5 rounded-md mt-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <button onClick={handlePrev}>
              <FaChevronLeft />
            </button>

            <div className="flex items-center gap-1">
              {viewMode === "calendar" && (
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => setViewMode("month")}
                >
                  {currentDate.format("MMMM").charAt(0).toUpperCase() +
                    currentDate.format("MMMM").slice(1)}
                  ,{" "}
                  <span
                    className="font-bold cursor-pointer"
                    onClick={() => setViewMode("month")}
                  >
                    {currentDate.year()}
                  </span>
                </span>
              )}
              {viewMode !== "year" && viewMode !== "calendar" && (
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => setViewMode("year")}
                >
                  {currentDate.year()}
                </span>
              )}
            </div>

            <button onClick={handleNext}>
              <FaChevronRight />
            </button>
          </div>

          {/* Calendar */}
          {viewMode === "calendar" && (
            <div>
              <div className="grid grid-cols-7 text-center mt-3 text-gray-700">
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                  <div key={day} className="font-bold">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mt-2">
                {days.map((date, i) => {
                  const dateStr = date.format("YYYY-MM-DD");
                  const isTourDate = tourDates[dateStr];
                  const isSelected = selectedDates.includes(dateStr);
                  const isCurrentMonth = date.month() === currentDate.month();
                  return (
                    <div
                      key={i}
                      className={`h-16 w-16 flex flex-col items-center justify-center rounded-md cursor-pointer transition duration-300 
                        ${
                          isTourDate ? "border border-red-500 text-red-500" : ""
                        } 
                        ${isSelected ? "bg-red-700 text-white" : "bg-white"}
                        ${!isCurrentMonth ? "text-gray-400" : "text-black"}`}
                      onClick={() => isTourDate && toggleDateSelection(dateStr)}
                    >
                      <span className="text-sm font-semibold">
                        {date.date()}
                      </span>
                      {isTourDate && (
                        <span className="text-xs font-medium">
                          {tourDates[dateStr]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === "month" && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {months.map((month, index) => (
                <div
                  key={index}
                  className={`px-3 py-8 text-center rounded-[50%] cursor-pointer transition hover:bg-gray-200 ${
                    currentDate.month() === index
                      ? "bg-blue-600 text-white hover:bg-blue-600"
                      : ""
                  }`}
                  onClick={() => {
                    setCurrentDate(currentDate.month(index));
                    setViewMode("calendar");
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
          )}

          {viewMode === "year" && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {years.map((year) => (
                <div
                  key={year}
                  className={`px-6 py-8 text-center rounded-[50%] cursor-pointer transition hover:bg-gray-200 ${
                    currentDate.year() === year
                      ? "bg-blue-600 text-white hover:bg-blue-600"
                      : ""
                  }`}
                  onClick={() => {
                    setCurrentDate(currentDate.year(year));
                    setViewMode("month");
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Button */}
        {viewMode === "calendar" && (
          <button className="bg-orange-500 text-white font-bold w-full mt-4 py-4 rounded hover:bg-orange-600">
            Đặt Tour ({selectedDates.length} ngày)
          </button>
        )}
      </div>
    </div>
  );
};

export default Calendar;
