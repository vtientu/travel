import { useState } from "react";
import {LuSearch} from "react-icons/lu";

export default function ModalAddTheme({ onClose }) {
    const [themeName, setThemeName] = useState("");
    const [themeDescription, setThemeDescription] = useState("");
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedTours, setSelectedTours] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const locations = [
        "Đà Lạt", "Nha Trang", "Hội An", "Phú Quốc", "Mũi Né", "Hạ Long", "Sapa", "Cát Bà", "Vũng Tàu"
    ];
    const tours = [
        "Tour Đà Lạt 2N2Đ bằng xe Giường Nằm + Tàu Cao tốc (cảng Trần Đề, Sóc Trăng)",
        "Tour Đà Lạt 3N2Đ bằng xe Giường Nằm",
        "Tour Đà Lạt 4N3Đ tham quan toàn cảnh",
    ];

    const handleWrapperClick = () => {
        onClose();
    };
    const handleModalClick = (event) => {
        event.stopPropagation();
    };
    const handleLocationChange = (location) => {
        setSelectedLocations((prev) =>
            prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
        );
    };

    const handleTourChange = (tour) => {
        setSelectedTours((prev) =>
            prev.includes(tour) ? prev.filter((t) => t !== tour) : [...prev, tour]
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleWrapperClick} >
            <div className="bg-white rounded-md shadow-lg w-3/5 p-6" onClick={handleModalClick}>
                {/* Tiêu đề */}
                <div className="relative pb-3">
                    <h2 className="text-lg font-semibold">Thêm chủ đề</h2>
                    <p className="text-gray-500 mb-4">Quản trị viên thêm chủ đề Tour du lịch</p>

                    {/* Nút đóng */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                {/* Form nhập liệu */}
                <div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1 before:content-['*'] before:text-red-500 before:mr-1">
                            Tên chủ đề
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded-md p-2"
                            placeholder="Nhập tên chủ đề"
                            value={themeName}
                            onChange={(e) => setThemeName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Mô tả chủ đề</label>
                        <textarea
                            className="w-full border rounded-md p-2"
                            placeholder="Nhập mô tả chủ đề"
                            value={themeDescription}
                            onChange={(e) => setThemeDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* Danh sách vị trí & Tour */}
                <div className="flex gap-6">
                    {/* Danh sách vị trí */}
                    <div className="w-1/3">
                        <h3 className="font-semibold mb-2">Danh sách vị trí</h3>
                        <div className="relative flex-1 mb-2 ">
                            <LuSearch className="absolute left-3 top-3 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm bằng từ khóa"
                                className="pl-10 pr-4 py-2 border rounded-md w-full"
                            />
                        </div>

                        <div className="border p-2 rounded-md h-40 overflow-y-auto">
                            {locations.map((location) => (
                                <label key={location} className="flex items-center gap-2 accent-red-700" >
                                    <input
                                        type="checkbox"
                                        checked={selectedLocations.includes(location)}
                                        onChange={() => handleLocationChange(location)}
                                    />
                                    {location}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Danh sách Tour */}
                    <div className="w-2/3">
                        <h3 className="font-semibold mb-2">Danh sách Tour</h3>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-md mb-2"
                            placeholder="Tìm kiếm bằng từ khóa"
                        />
                        <div className="border p-2 rounded-md h-40 overflow-y-auto">
                            {tours.map((tour) => (
                                <label key={tour} className="flex items-center gap-2 accent-red-700">
                                    <input
                                        type="checkbox"
                                        checked={selectedTours.includes(tour)}
                                        onChange={() => handleTourChange(tour)}
                                    />
                                    {tour}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Toggle Kích hoạt */}
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-gray-700">Kích hoạt</span>
                    <button
                        className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
                            isActive ? "bg-red-700" : "bg-gray-300"
                        }`}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                                isActive ? "translate-x-5" : ""
                            }`}
                        ></div>
                    </button>
                </div>

                {/* Button Actions */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="submit"
                        className="border border-red-700 text-red-700 px-4 py-2 rounded-md"
                    >
                        Tạo mới
                    </button>
                    <button
                        type="submit"
                        className="bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                        Tạo & tiếp tục
                    </button>
                </div>
            </div>
        </div>
    );
}
