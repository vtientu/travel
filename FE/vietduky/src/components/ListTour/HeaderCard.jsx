import { useState, useEffect } from "react";
import {FaSearch, FaDotCircle, FaRegCalendarAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

export default function HeaderCard() {
    const [selected, setSelected] = useState("tour");
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [selectedStart, setSelectedStart] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/location/")
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.error("Error fetching locations:", error));
    }, []);

    return (
        <div className="relative">
            {/* Background container */}
            <div className="relative w-full h-[250px] bg-cover bg-center overflow-hidden" style={{backgroundImage: `url('/Image/loginImage.png')`,}}>
                {/* Overlay phủ màu */}
                <div className="absolute inset-0 bg-black opacity-30"></div>

                {/* Nội dung bên trên lớp phủ */}
                <div className="relative z-10">
                    {/* Breadcrumb */}
                    <div className="text-white max-w-6xl mx-auto px-4 pt-4 text-lg font-light">
                        Việt Du Ký / <span className="text-red-600 font-semibold">Du lịch Việt Du Ký</span>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-6xl mx-auto px-4 mt-6">
                        <div className="bg-transparent pt-10 p-4 flex flex-col md:flex-row md:items-stretch md:space-x-4 space-y-4 md:space-y-0 w-full">
                            {/* Ô nhập điểm du lịch */}
                            <div className="flex items-start flex-1 bg-white border rounded-lg px-4 py-6 h-full">
                                <FaSearch className="text-gray-500 mr-3 mt-1" />
                                <input
                                    type="text"
                                    placeholder="Nhập điểm du lịch"
                                    className="w-full h-full outline-none text-gray-700"
                                />
                            </div>

                            {/* Ngày khởi hành */}
                            <div className="flex items-start flex-1 bg-white border rounded-lg px-4 py-3 h-full">
                                <FaRegCalendarAlt className="text-gray-500 text-xl mr-4 mt-1" />
                                <div className="flex flex-col w-full">
                                    <span className="text-sm text-gray-500">Ngày khởi hành</span>
                                    {!date ? (
                                        <div
                                            className="text-base text-black cursor-pointer"
                                            onClick={() => {
                                                const input = document.getElementById("hidden-date-picker");
                                                if (input) input.showPicker?.();
                                            }}
                                        >
                                            Chọn ngày khởi hành
                                            <input
                                                id="hidden-date-picker"
                                                type="date"
                                                className="sr-only"
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="text-base text-black outline-none"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Điểm khởi hành */}
                            <div className="flex items-start flex-1 bg-white border rounded-lg px-4 py-3 h-full">
                                <FaDotCircle className="text-gray-500 mr-3 mt-1" />
                                <div className="flex flex-col w-full">
                                    <span className="text-sm text-gray-500 ml-1">Điểm khởi hành</span>
                                    <select
                                        className="w-full outline-none text-black bg-transparent"
                                        value={selectedStart}
                                        onChange={(e) => setSelectedStart(e.target.value)}
                                    >
                                        <option value="">Chọn điểm khởi hành</option>
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.name_location}>
                                                {location.name_location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Nút TÌM */}
                            <div className="flex flex-1 h-full">
                                <button className="w-full h-full bg-[#A31627] hover:bg-red-800 transition text-white px-8 py-5 rounded-lg text-xl font-semibold">
                                    TÌM
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
