import {useEffect, useState} from "react";
import {fetchLocations, fetchServices, fetchTypeTours} from "../../../services/service.js";
import {TourService} from "../../../services/API/tour.service.js";

export default function ModalAddUser({ onClose }) {
    const [setLocations] = useState([]);
    const [setServices] = useState([]);
    const [setTypeTours] = useState([]);
    const [tourData, setTourData] = useState({
        name_tour: "",
        price_tour: "",
        day_number: "",
        max_people: "10",
        activity_description: "",
        start_location: "",
        end_location: "",
        available_month: "3",
        type_id: "",
        service_id: "",
        rating_tour: "5",
        image: null,
        travel_tours: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            setLocations(await fetchLocations());
            setServices(await fetchServices());
            setTypeTours(await fetchTypeTours());
        };
        fetchData();
    }, []);

    // Xử lý khi thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTourData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý gửi dữ liệu lên API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tourData.activity_description.trim()) {
            alert("Vui lòng nhập mô tả hành trình!");
            return;
        }

        try {
            const formData = new FormData();
            Object.keys(tourData).forEach((key) => {
                if (key === "travel_tours") {
                    formData.append(key, JSON.stringify(tourData[key]));
                } else if (tourData[key] !== null && tourData[key] !== undefined) {
                    formData.append(key, tourData[key]);
                }
            });

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await TourService.createTour(formData);
            if (response) {
                alert("Tạo Tour mới thành công");
                setTourData({
                    ...tourData,
                    name_tour: "",
                    price_tour: "",
                    travel_tours: [],
                });
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            alert(`Lỗi: ${JSON.stringify(error.response?.data)}`);
            console.error("Lỗi API:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        console.log("Updated travel tour:", tourData.travel_tours);
    }, [tourData.travel_tours]);

    const handleWrapperClick = () => {
        onClose();
    };
    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleWrapperClick} >
            <div className="bg-white rounded-md shadow-lg w-2/5 p-6" onClick={handleModalClick}>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-6">
                        {/* Cột trái */}
                        <div className="w-full">
                            <h2 className="text-lg font-semibold">Thêm tài khoản</h2>
                            <h6 className="text-sm mb-4 text-SmokyGray">
                                Quản trị viên thêm tài khoản người dùng
                            </h6>

                            {/* Mã Tour */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Tên người dùng
                            </label>
                            <input
                                type="text"
                                name="name_service"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Nhập tên người dùng"
                                required
                            />

                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Email
                            </label>
                            <input
                                type="text"
                                name="name_service"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Nhập email"
                                required
                            />

                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Mật khẩu
                            </label>
                            <input
                                type="text"
                                name="name_service"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                            {/* Giá trị giảm giá */}
                            <label className="block mb-2 font-medium before:text-red-500 before:mr-1 mt-2">
                                Quyền hạn
                            </label>
                            <input
                                type="select"
                                name="day_number"
                                className="w-full p-2 border rounded mb-4 h-[80px]"
                                placeholder="Mô tả"
                                value={tourData.day_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Button Actions */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded-md"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-red-700 text-white px-4 py-2 rounded-md"
                        >
                            Tạo Tour mới
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
