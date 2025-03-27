import TextEditor from "../../../lib/TextEditor";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiOutlineDotsHorizontal, HiOutlineInbox } from "react-icons/hi";
import {
  fetchLocations,
  fetchServices,
  fetchTypeTours,
} from "../../../services/service";
import { createTour } from "../../../services/API/tour.service";
import { formatDayDMY } from "../../../utils/dateUtil";
import TestModal from "./ModalAddTravelTours";

export default function ModalAddTour({ onClose }) {
  const [travelTours, setTravelTours] = useState([]);
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [typeTours, setTypeTours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [previewImage, setPreviewImage] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // ID của Địa điểm đang mở menu

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

  const handleDeleteTravelTour = (index) => {
    setTourData((prev) => ({
      ...prev,
      travel_tours: prev.travel_tours.filter((_, i) => i !== index),
    }));
  };

  // Xử lý tải ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTourData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
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

      const response = await createTour(formData);
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

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Toggle modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center" onClick={handleWrapperClick}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4" onClick={handleModalClick}>
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
                className="w-full p-2 border rounded mb-4"
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
                    className="w-[250px] p-2 border rounded text-gray-500"
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
                    className="w-[250px] p-2 border rounded text-gray-500"
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
                className="w-full p-2 border rounded text-gray-500"
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
                className="w-full p-2 border rounded text-gray-500"
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
                Ảnh minh họa
              </label>
              <input
                type="file"
                className="w-full border p-2 rounded mb-4"
                onChange={handleFileChange}
                required
              />
              {previewImage && (
                  <div className="mt-2">
                    <img
                        src={previewImage}
                        alt="Xem trước ảnh minh họa"
                        className="h-40 w-full object-cover rounded shadow"
                    />
                  </div>
              )}
            </div>

            {/* Cột phải */}
            <div className="w-3/5">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <label className="font-medium">
                      Lịch khởi hành & giá Tour
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="border px-4 py-2 rounded-md"
                    >
                      Nhập danh sách hành trình
                    </button>
                    <button
                      type="button"
                      className="bg-red-700 text-white px-4 py-2 rounded-md"
                      onClick={toggleModal}
                    >
                      Thêm hành trình
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="mt-4 mb-4 bg-white">
                    <table className="w-full border-collapse border rounded-lg shadow-md bg-white">
                      <thead>
                        <tr className="text-SmokyGray">
                          <th className="p-2 text-left">Ngày khởi hành</th>
                          <th className="p-2">Ngày về</th>
                          <th className="p-2">Tình trạng chỗ</th>
                          <th className="p-2">Giá</th>
                          <th className="p-2"></th>
                        </tr>
                      </thead>
                      {tourData.travel_tours.length > 0 ? (
                        <tbody>
                          {tourData.travel_tours.length > 0 ? (
                            tourData.travel_tours.map((travelTour, index) => (
                              <tr
                                key={index}
                                className={`border-t text-center ${
                                  index % 2 === 0 ? "bg-white" : "bg-[#e4e4e7]"
                                }`}
                              >
                                <td className="p-2 text-left">
                                  {formatDayDMY(travelTour.start_time)}
                                </td>
                                <td className="p-2">
                                  {formatDayDMY(travelTour.end_time)}
                                </td>
                                <td className="p-2">{travelTour.max_people}</td>
                                <td className="p-2 text-RedPrice">
                                  {travelTour.price_tour.toLocaleString(
                                    "vi-VN"
                                  )}{" "}
                                  VNĐ
                                </td>
                                <td className="flex justify-end p-2 relative">
                                  <button
                                    type="button"
                                    onClick={() => toggleDropdown(index)}
                                    className="relative"
                                  >
                                    <HiOutlineDotsHorizontal className="text-xl cursor-pointer" />
                                  </button>
                                  {openDropdown === index && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                                      <button
                                        type="button"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap"
                                      >
                                        <MdEdit className="mr-2 text-gray-700" />{" "}
                                        Cập nhật hành trình
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDeleteTravelTour(index)
                                        }
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600 whitespace-nowrap"
                                      >
                                        <MdDelete className="mr-2" /> Xóa hành
                                        trình
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="p-6 text-center">
                                <div className="flex flex-col items-center">
                                  <div className="p-4 bg-gray-100 rounded-full mb-2">
                                    <HiOutlineInbox className="text-4xl text-gray-500" />
                                  </div>
                                  <p className="text-gray-500 text-lg">
                                    Chưa có hành trình nào
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-6 text-center">
                            <div className="flex flex-col items-center">
                              <div className="p-4 bg-gray-100 rounded-full mb-2">
                                <HiOutlineInbox className="text-4xl text-gray-500" />
                              </div>
                              <p className="text-gray-500 text-lg">
                                Chưa có hành trình nào
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </table>
                  </div>
                  {isModalOpen && (
                    <TestModal
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
              Tạo Tour mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
