import TextEditor from "../../lib/TextEditor";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { getTravelTour } from "../../services/travel_tour.api";
import { formatDayDMY } from "../../utils/dateUtil";

export default function ModalAddTour({ onClose }) {
  const [locations, setLocations] = useState([]);
  const [tourData, setTourData] = useState({
    name_tour: "",
    price_tour: "",
    day_number: "",
    max_people: "",
    activity_description: "",
    start_location: "",
    end_location: "",
    image: null,
  });
  const [travelTours, setTravelTours] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // ID của Địa điểm đang mở menu

  useEffect(() => {
    fetch("http://localhost:3000/api/location/")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Lỗi khi tải vị trí:", error));
  }, []);

  // Xử lý khi thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý tải ảnh
  const handleFileChange = (e) => {
    setTourData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Xử lý gửi dữ liệu lên API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(tourData).forEach((key) => {
      formData.append(key, tourData[key]);
    });

    try {
      const response = await fetch("http://localhost:3000/api/tour/create", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Tạo tour thành công!");
        onClose(); // Đóng modal sau khi tạo tour thành công
      } else {
        alert(`Lỗi: ${result.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert("Đã xảy ra lỗi!");
    }
  };

  // call API
  useEffect(() => {
    const fetchTravelTours = async () => {
      try {
        const response = await getTravelTour();
        const data = response.travelTours || response;
        // console.log("Dữ liệu nhận được:", data);

        setTravelTours(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu từ API", error);
        setTravelTours([]);
      }
    };

    fetchTravelTours();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6">
            {/* Cột trái */}
            <div className="w-2/5">
              <h2 className="text-lg font-semibold">Thêm Tour du lịch</h2>
              <h6 className="text-sm mb-4">
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
                placeholder="Mã tour"
                // value={tourData.name_tour}
                // onChange={handleChange}
                required
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
                    className="w-[230px] p-2 border rounded text-gray-500"
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
                    className="w-[230px] p-2 border rounded text-gray-500"
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
              <select className="w-full p-2 border rounded text-gray-500">
                <option value="" disabled selected>
                  Chọn loại Tour
                </option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
              </select>

              {/* Dịch vụ */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                Dịch vụ
              </label>
              <select className="w-full p-2 border rounded text-gray-500">
                <option value="" disabled selected>
                  Chọn dịch vụ kèm theo
                </option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
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
                    <button className="border px-4 py-2 rounded-md">
                      Nhập danh sách hành trình
                    </button>
                    <button className="bg-red-700 text-white px-4 py-2 rounded-md">
                      Thêm hành trình
                    </button>
                  </div>
                </div>

                <div className="relative">
                  {/* Lớp phủ (Backdrop) để đóng dropdown khi click bên ngoài */}
                  {openDropdown !== null && (
                    <div
                      className="fixed inset-0 bg-transparent"
                      onClick={() => setOpenDropdown(null)}
                    ></div>
                  )}

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
                      <tbody>
                        {travelTours.map((travelTour, index) => (
                          <tr
                            key={travelTour.id}
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
                              {travelTour.price_tour.toLocaleString("vi-VN")}{" "}
                              VNĐ
                            </td>
                            <td className="flex justify-end p-2 relative">
                              {/* Nút 3 chấm */}
                              <button
                                onClick={() => toggleDropdown(travelTour.id)}
                                className="relative"
                              >
                                <HiOutlineDotsHorizontal className="text-xl cursor-pointer" />
                              </button>

                              {/* Dropdown menu */}
                              {openDropdown === travelTour.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                                  <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap">
                                    <MdEdit className="mr-2 text-gray-700" />{" "}
                                    Cập nhật chuyến đi
                                  </button>
                                  <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap">
                                    <MdEdit className="mr-2 text-gray-700" />{" "}
                                    Thêm hành trình
                                  </button>
                                  <button
                                    onClick={() =>
                                      console.log(
                                        "Xóa hành trình",
                                        travelTour.id
                                      )
                                    }
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600 whitespace-nowrap"
                                  >
                                    <MdDelete className="mr-2" /> Xóa hành trình
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Mô tả hành trình
                </label>
                <TextEditor />
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
