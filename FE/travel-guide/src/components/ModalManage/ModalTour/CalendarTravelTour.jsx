import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  format,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CalendarTravelTour({
  travelTours = [],
  tourId,
  tours = [],
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const filteredTours = travelTours.filter((t) => t.tour_id === tourId);

  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

  const days = [];
  let current = start;
  while (current <= end) {
    days.push(new Date(current));
    current = addDays(current, 1);
  }

  // Gán mỗi tour 1 dòng hiển thị
  const tourLineIndexMap = {};
  let nextLineIndex = 0;
  filteredTours.forEach((tour) => {
    if (!tourLineIndexMap[tour.id]) {
      tourLineIndexMap[tour.id] = nextLineIndex++;
    }
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Thống kê chi tiết</h2>
      <div className="bg-white  border rounded-md p-4 overflow-auto relative">
        <h2 className="font-semibold mb-5">Lịch trình sắp tới</h2>
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <button
              className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
              onClick={() => setCurrentMonth(new Date())}
            >
              Hôm nay
            </button>
            <button
              className="text-xl px-2"
              onClick={() =>
                setCurrentMonth((prev) => addDays(startOfMonth(prev), -1))
              }
            >
              <FiChevronLeft />
            </button>
            <span className="font-semibold text-sm">
              {format(currentMonth, "MMMM, yyyy")}
            </span>
            <button
              className="text-xl px-2"
              onClick={() =>
                setCurrentMonth((prev) => addDays(endOfMonth(prev), 1))
              }
            >
              <FiChevronRight />
            </button>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs items-center">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span> Sắp
              khởi hành
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span> Đang
              diễn ra
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-gray-500"></span> Đã hoàn
              thành
            </div>
          </div>
        </div>

        {/* Weekday Header */}
        <div className="grid grid-cols-7 text-xs font-semibold text-gray-600 mb-1">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
            <div key={d} className="text-center py-2 border-b border-gray-200">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 text-xs relative z-0">
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);

            const toursInDay = filteredTours.filter((tour) => {
              const start = parseISO(tour.start_time);
              const end = parseISO(tour.end_time);
              return isWithinInterval(day, { start, end });
            });

            return (
              <div
                key={idx}
                className={`border border-gray-200 pb-1 pt-1 relative flex flex-col justify-start ${
                  !isCurrentMonth ? "bg-gray-50 text-gray-400" : ""
                }`}
              >
                <div className="absolute top-1 left-1 text-[11px]">
                  {format(day, "dd")}
                </div>

                {/* Hiển thị tour tại các dòng cố định */}
                <div className="flex flex-col mt-5 gap-[1px] h-8">
                  {Array.from({ length: nextLineIndex }).map((_, lineIdx) => {
                    const tourAtLine = toursInDay.find(
                      (tour) => tourLineIndexMap[tour.id] === lineIdx
                    );

                    if (!tourAtLine) {
                      return <div key={lineIdx} className="h-[20px] w-full" />; // giữ chỗ
                    }

                    const start = parseISO(tourAtLine.start_time);
                    const end = parseISO(tourAtLine.end_time);
                    const tourInfo = tours.find(
                      (t) => t.id === tourAtLine.tour_id
                    );
                    const tourName = tourInfo?.name_tour || `#${tourAtLine.id}`;
                    const isStart =
                      format(day, "yyyy-MM-dd") === format(start, "yyyy-MM-dd");
                    const isEnd =
                      format(day, "yyyy-MM-dd") === format(end, "yyyy-MM-dd");

                    let bg = "bg-blue-100 text-blue-700";
                    if (today >= start && today <= end)
                      bg = "bg-orange-100 text-orange-700";
                    if (today > end) bg = "bg-gray-300 text-gray-600";

                    const borderRadiusClass =
                      isStart && isEnd
                        ? "rounded-lg"
                        : isStart
                        ? "rounded-l-lg"
                        : isEnd
                        ? "rounded-r-lg"
                        : "!rounded-none";

                    return (
                      <div
                        key={lineIdx}
                        className={`h-[20px] w-full text-[11px] relative flex items-center ${bg} ${borderRadiusClass}`}
                        title={`#${tourAtLine.id} - ${
                          tourAtLine.max_people
                        } chỗ\n${format(start, "dd/MM")} → ${format(
                          end,
                          "dd/MM"
                        )}`}
                      >
                        {/* Stripe đầu bên trái nếu là start */}
                        {isStart && (
                          <div
                            className={`absolute left-0 top-0 h-full w-[4px] ${
                              bg.includes("blue")
                                ? "bg-blue-600"
                                : bg.includes("orange")
                                ? "bg-orange-600"
                                : "bg-gray-600"
                            } rounded-l`}
                          />
                        )}

                        {/* Stripe cuối bên phải nếu là end */}
                        {isEnd && (
                          <div
                            className={`absolute right-0 top-0 h-full w-[4px] ${
                              bg.includes("blue")
                                ? "bg-blue-600"
                                : bg.includes("orange")
                                ? "bg-orange-600"
                                : "bg-gray-600"
                            } rounded-r`}
                          />
                        )}

                        {/* Nội dung chỉ hiện ở start */}
                        {isStart && (
                          <span className="truncate pl-4 z-10">
                            {" "}
                            {tourName} - {tourAtLine.max_people} chỗ
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
