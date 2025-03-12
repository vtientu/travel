import {useState} from "react";
import { ChevronDown } from "lucide-react";

export default function TourProgram() {
    const tourData = [
        {
            day: "Ngày 1",
            title: "Tp Hồ Chí Minh – Đà Nẵng – Ngũ Hành Sơn – Phố Cổ Hội An",
            meals: "(Ăn Trưa, Chiều)",
            image: "https://via.placeholder.com/100",
        },
        {
            day: "Ngày 2",
            title: "Đà Nẵng – Bà Nà – Cầu Vàng – Huế",
            meals: "(Ăn Sáng, Chiều)",
            image: "https://via.placeholder.com/100",
        },
        {
            day: "Ngày 3",
            title: "Huế – La Vang – Quảng Bình – Động Thiên Đường",
            meals: "(Ăn Sáng, Trưa, Chiều)",
            image: "https://via.placeholder.com/100",
        },
        {
            day: "Ngày 4",
            title: "Huế – Đại Nội – Làng Hương Thủy Xuân – Tp. Hồ Chí Minh",
            meals: "(Ăn Sáng, Trưa)",
            image: "https://via.placeholder.com/100",
        },
    ];
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Chương trình tour</h2>
                <button className="text-blue-600 font-medium">Xem tất cả</button>
            </div>
            <div className="space-y-2">
                {tourData.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-white-100 rounded-lg overflow-hidden shadow-sm"
                    >
                        <img src={item.image} alt={item.day} className="w-24 h-24 object-cover" />
                        <div className="flex-1 p-3">
                            <p className="text-gray-500 text-sm">{item.day}</p>
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.meals}</p>
                        </div>
                        <button
                            className="p-2"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <ChevronDown
                                className={`w-5 h-5 text-gray-600 transition-transform ${
                                    openIndex === index ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
