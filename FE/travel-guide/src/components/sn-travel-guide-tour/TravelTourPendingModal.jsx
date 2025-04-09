"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function TravelTourPendingModal({
  tourId,
  title,
  onClose,
  open,
}) {
  // Dummy data — bạn có thể fetch theo tourId ở đây
  const [schedules] = useState([
    {
      departureDate: "T6, 28/02/2025",
      returnDate: "T2, 03/03/2025",
      weekday: "T6",
      availableSeats: "14/30",
      price: "7.990.000 VNĐ",
    },
    {
      departureDate: "CN, 02/03/2025",
      returnDate: "T4, 05/03/2025",
      weekday: "CN",
      availableSeats: "0/30",
      price: "7.990.000 VNĐ",
      status: "pending",
    },
  ]);

  useEffect(() => {
    // Chặn scroll nền khi mở modal
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-3/4 rounded-xl w-full max-w-4xl p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Lịch trình Hướng dẫn: <span className="text-red-600">{title}</span>
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Tìm kiếm bằng từ khóa"
            className="border rounded px-3 py-2 w-1/3 text-sm"
          />
          <input type="date" className="border rounded px-3 py-2 text-sm" />
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto flex-1">
          <table className="w-full text-sm ">
            <thead className="text-gray-600 border-b font-semibold">
              <tr>
                <th className="py-2 text-left ">Ngày khởi hành</th>
                <th className="py-2 text-left">Ngày về</th>
                <th className="py-2 text-center">Tình trạng chỗ</th>
                <th className="py-2 text-right">Giá</th>
                <th className="py-2 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 text-left">{item.departureDate}</td>
                  <td className="py-2 text-left">{item.returnDate}</td>
                  <td className="py-2 text-center">{item.availableSeats}</td>
                  <td className="py-2 text-right text-red-600 font-medium">
                    {item.price}
                  </td>
                  <td className="py-2 text-right">
                    {item.status === "pending" && (
                      <button className="text-red-600 font-medium hover:text-red-500">
                        Gửi yêu cầu
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
