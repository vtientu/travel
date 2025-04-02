import TextEditor from "../../lib/TextEditor.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiOutlineInbox } from "react-icons/hi";
import { fetchLocations, fetchServices, fetchTypeTours } from "../../services/service";
import ModalAddProgram from "../ModalManage/ModalAddProgram.jsx";
import { createTour, updateTour, getTourById } from "../../services/API/tour.service.js";

export default function ModalUpdateTour({ mode = "update", tourId = null, onClose, onCreateSuccess }) {
    const [locations, setLocations] = useState([]);
    const [services, setServices] = useState([]);
    const [typeTours, setTypeTours] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

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
            try {
                const [locs, servs, types] = await Promise.all([
                    fetchLocations(),
                    fetchServices(),
                    fetchTypeTours()
                ]);
                setLocations(locs);
                setServices(servs);
                setTypeTours(types);

                if (mode === "update" && tourId) {
                    const tour = await getTourById(tourId);
                    console.log("Dữ liệu tour:", tour);

                    setTourData({
                        name_tour: tour.name_tour || "",
                        price_tour: tour.price_tour || "",
                        day_number: tour.day_number || "",
                        max_people: tour.max_people || "10",
                        activity_description: tour.activity_description || "",
                        start_location: tour.start_location || "",
                        end_location: tour.end_location || "",
                        available_month: tour.available_month || "3",
                        type_id: tour.type_id || tour.typeTour?.id || "",
                        service_id: tour.services?.[0]?.id || "",
                        rating_tour: tour.rating_tour || "5",
                        image: null,
                        travel_tours: tour.travel_tours || [],
                    });
                    setPreviewImage(tour.image || null);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                alert("Không thể tải thông tin tour hoặc danh mục!");
            }
        };
        fetchData();
    }, [mode, tourId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTourData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (content) => {
        setTourData((prev) => ({ ...prev, activity_description: content }));
    };

    const handleAddTravelTour = (newTravelTour) => {
        setTourData((prev) => ({
            ...prev,
            travel_tours: [...prev.travel_tours, newTravelTour],
        }));
        setIsModalOpen(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTourData((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

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

            const response = mode === "update"
                ? await updateTour(tourId, formData)
                : await createTour(formData);

            const id = response?.tour?.id || tourId;
            if (id) {
                alert(`${mode === "update" ? "Cập nhật" : "Tạo"} Tour thành công!`);
                onCreateSuccess?.(id);
                onClose();
            } else {
                alert(`${mode === "update" ? "Cập nhật" : "Tạo"} Tour thất bại!`);
            }
        } catch (error) {
            alert(`Lỗi: ${JSON.stringify(error.response?.data || error.message)}`);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleWrapperClick = () => {
        onClose();
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center" onClick={handleWrapperClick}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-5/7" onClick={handleModalClick}>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-6">
                        {/* Cột trái */}
                        <div className="w-2/5">
                            <h2 className="text-lg font-semibold">Thêm Tour du lịch</h2>
                            <h6 className="text-sm mb-4 text-SmokyGray">
                                Quản trị viên thêm Tour du lịch mới
                            </h6>

                            {/* Mã Tour */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Mã Tour
                            </label>
                            <input
                                type="text"
                                name="name_tour"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Mã Tour"
                                disabled
                            />

                            {/* Tên Tour */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Tên Tour
                            </label>
                            <input
                                type="text"
                                name="name_tour"
                                className="w-full p-2 border rounded mb-4 "
                                placeholder="Nhập tên tour"
                                value={tourData.name_tour}
                                onChange={handleChange}
                                required
                            />

                            <div className="flex items-center gap-4">
                                {/* Điểm khởi hành */}
                                <div>
                                    <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                        Điểm khởi hành
                                    </label>
                                    <select
                                        name="start_location"
                                        className="w-[250px] p-2 border rounded text-gray-600"
                                        value={tourData.start_location}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Chọn điểm khởi hành
                                        </option>
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.name_location}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Mũi tên */}
                                <FaArrowRight className="text-gray-400 text-lg" />

                                {/* Điểm đến */}
                                <div>
                                    <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                        Điểm đến
                                    </label>
                                    <select
                                        name="end_location"
                                        className="w-[250px] p-2 border rounded text-gray-600"
                                        value={tourData.end_location}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Chọn điểm đến
                                        </option>
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.name_location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Số ngày */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Số ngày
                            </label>
                            <input
                                type="number"
                                name="day_number"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Nhập số ngày"
                                value={tourData.day_number}
                                onChange={handleChange}
                                required
                            />

                            {/* Giá tour */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Giá tour
                            </label>
                            <input
                                type="number"
                                name="price_tour"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Nhập giá tour"
                                value={tourData.price_tour}
                                onChange={handleChange}
                                required
                            />

                            {/* loại Tour */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Loại Tour
                            </label>
                            <select
                                name="type_id"
                                value={tourData.type_id}
                                onChange={(e) => {
                                    setTourData((prev) => ({
                                        ...prev,
                                        type_id: e.target.value,
                                    }));
                                }}
                                required
                                className="w-full p-2 border rounded text-gray-600"
                            >
                                <option value="" disabled>
                                    Chọn loại Tour
                                </option>
                                {typeTours.length > 0 ? (
                                    typeTours.map((typeTours) => (
                                        <option key={typeTours.id} value={typeTours.id}>
                                            {typeTours.name_type}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Không có loại Tour</option>
                                )}
                            </select>

                            {/* Dịch vụ */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Dịch vụ
                            </label>
                            <select
                                name="service_id"
                                className="w-full p-2 border rounded text-gray-600"
                                value={tourData.service_id}
                                onChange={(e) => {
                                    setTourData((prev) => ({
                                        ...prev,
                                        service_id: e.target.value,
                                    }));
                                }}
                                required
                            >
                                <option value="" disabled>
                                    Chọn dịch vụ kèm theo
                                </option>
                                {services.length > 0 ? (
                                    services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name_service}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Không có dịch vụ</option>
                                )}
                            </select>

                            {/* Ảnh minh họa */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Ảnh bìa
                            </label>
                            <div
                                className="w-full h-36 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-center bg-gray-50 text-gray-600 cursor-pointer hover:bg-gray-100 transition"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file) {
                                        setTourData((prev) => ({ ...prev, image: file }));
                                        setPreviewImage(URL.createObjectURL(file));
                                    }
                                }}
                                onClick={() => document.getElementById("fileInput")?.click()}
                            >
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Xem trước ảnh"
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <span>Kéo & thả ảnh Tour tại đây (.png .jpg .pdf)</span>
                                )}
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                accept=".png,.jpg,.jpeg,.pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Cột phải */}
                        <div className="w-3/5">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <label className="font-medium">
                                            Chương trình Tour
                                        </label>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            className="bg-red-700 text-white px-4 py-2 rounded-md"
                                            onClick={toggleModal}
                                        >
                                            Thêm chương trình
                                        </button>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="mt-4 mb-4 bg-white">
                                        <table className="w-full border-collapse border rounded-lg shadow-md bg-white">
                                            <thead>
                                            <tr className="text-SmokyGray">
                                                <th className="p-2 ">Tiêu đề</th>
                                                <th className="p-2">Mô tả</th>
                                                <th className="p-2">Mô tả chi tiết</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td colSpan="5" className="p-6 text-center">
                                                    <div className="flex flex-col items-center h-[160px]">
                                                        <div className="p-4 bg-gray-100 rounded-full mb-2">
                                                            <HiOutlineInbox className="text-4xl text-gray-600" />
                                                        </div>
                                                        <p className="text-gray-600 text-md">
                                                            Chưa có hành trình nào
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {isModalOpen && (
                                        <ModalAddProgram
                                            onClose={toggleModal}
                                            onAddTravelTour={handleAddTravelTour}
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Mô tả hành trình
                                </label>
                                <TextEditor
                                    value={tourData.activity_description}
                                    onChange={handleEditorChange}
                                />
                            </div>
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
                            {mode === "update" ? "Cập nhật Tour" : "Tạo Tour mới"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
