import { TravelTourService } from "@/services/API/travel_tour.service";
import { formatDayDMY } from "@/utils/dateUtil";
import { useEffect, useState } from "react";

export default function DepartureSchedule({ id }) {
  const [tourSchedules, setTourSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2025-02-28");

  useEffect(() => {
    TravelTourService.getTravelTourByTourId(id)
      .then((response) => {
        const travelTourData = response.data;
        setTourSchedules(travelTourData);
      })
      .catch((error) =>
        console.error("Error fetching travel tour data:", error)
      );
  }, [id]);

  return (
    <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b">
        <h2 className="text-lg font-bold">Lịch khởi hành & giá Tour</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-1 border rounded-md bg-gray-100 text-gray-600 cursor-pointer"
        />
      </div>
      {/*Body*/}
      <div className="mt-3">
        <table className="w-full text-left text-lg">
          <thead className="text-gray-500">
            <tr>
              <th className="py-2">Ngày khởi hành</th>
              <th className="py-2">Ngày về</th>
              <th className="py-2">Tình trạng chỗ</th>
              <th className="py-2 text-right">Giá</th>
            </tr>
          </thead>
          <tbody>
            {tourSchedules.map((tour, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 ? "bg-gray-100" : ""}`}
              >
                <td className="py-2">{formatDayDMY(tour.start_day)}</td>
                <td className="py-2">{formatDayDMY(tour.end_day)}</td>
                <td className="py-2">{tour.max_people}</td>
                <td className="py-2 text-right font-bold text-red-600">
                  {tour.price_tour.toLocaleString("vi-VN")} VNĐ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Xem thêm */}
      <div className="text-center mt-3">
        <button className="text-red-500 font-medium">Xem thêm</button>
      </div>
    </div>
  );
}
