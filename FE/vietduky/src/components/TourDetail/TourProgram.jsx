import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronDown } from "lucide-react";

export default function TourProgram() {
    const { id } = useParams();
    const [activities, setActivities] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/tour/${id}/activities`)
            .then(response => {
                const tourActivities = response.data.data.activities || [];
                setActivities(tourActivities);
            })
            .catch(error => console.error("Lỗi lấy thông tin lịch trình:", error));
    }, [id]);

    return (
        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Chương trình tour</h2>
                <button className="text-blue-600 font-medium">Xem tất cả</button>
            </div>
            <div className="space-y-2">
                {activities.length > 0 ? (
                    activities.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex items-center bg-white-100 rounded-lg overflow-hidden shadow-sm"
                        >
                            {/* Hiện tại API không có ảnh cho từng ngày, bạn có thể thay thế bằng ảnh thực tế */}
                            <img src="https://via.placeholder.com/100" alt={item.title} className="w-24 h-24 object-cover" />
                            <div className="flex-1 p-3">
                                <p className="text-gray-500 text-sm">Ngày {item.day}</p>
                                <p className="font-semibold text-gray-800">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.detail}</p>
                            </div>
                            <button
                                className="p-2"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-600 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                                />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Chưa có thông tin lịch trình.</p>
                )}
            </div>
        </div>
    );
}
