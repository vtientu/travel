import TextEditor from "../../lib/TextEditor";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("http://localhost:3000/api/location/")
        .then((res) => res.json())
        .then((data) => setLocations(data))
        .catch((error) => console.error("Lỗi khi tải địa điểm:", error));
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

                {/* Số lượng người */}
                <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                  Số lượng người
                </label>
                <input
                    type="number"
                    name="max_people"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Nhập số lượng người"
                    value={tourData.max_people}
                    onChange={handleChange}
                    required
                />

                {/* Ảnh minh họa */}
                <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                  Ảnh minh họa
                </label>
                <input type="file" className="w-full border p-2 rounded mb-4" onChange={handleFileChange} required />
              </div>

              {/* Cột phải */}
              <div className="w-3/5">
                <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                  Mô tả hành trình
                </label>
                <TextEditor />

                <button className="bg-gray-100 text-black mt-7 px-3 py-1.5 rounded">
                  Thêm mô tả
                </button>
              </div>
            </div>

            {/* Button Actions */}
            <div className="flex justify-end gap-4 mt-4">
              <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded">
                Tạo Tour mới
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
