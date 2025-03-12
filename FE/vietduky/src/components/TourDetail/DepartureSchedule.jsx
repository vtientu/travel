import {useState} from "react";

export default function DepartureSchedule() {
    const tourSchedule = [
        { departure: "T6, 28/02/2025", return: "T2, 03/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
        { departure: "CN, 02/03/2025", return: "T4, 05/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
        { departure: "T6, 07/03/2025", return: "T2, 10/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
        { departure: "CN, 09/03/2025", return: "T4, 12/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
        { departure: "T6, 14/03/2025", return: "T2, 17/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
    ];

    const [selectedDate, setSelectedDate] = useState("2025-02-28");
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
                                    {tourSchedule.map((tour, index) => (
                                        <tr key={index} className={`border-t ${index % 2 ? "bg-gray-100" : ""}`}>
                                            <td className="py-2">{tour.departure}</td>
                                            <td className="py-2">{tour.return}</td>
                                            <td className="py-2">{tour.status}</td>
                                            <td className="py-2 text-right font-bold text-red-600">{tour.price}</td>
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
