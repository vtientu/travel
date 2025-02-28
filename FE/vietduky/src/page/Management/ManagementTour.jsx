import React, { useEffect, useState } from "react";
import { getTours } from "../../services/tour.api";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Layout from "../../layouts/LayoutManagement";
import ModalAddTour from "../../components/ModalManage/ModalAddTour";
import { LuSearch } from "react-icons/lu";

// const tours = [
//   {
//     id: 1,
//     name: "Du lịch Sapa",
//     location: "Hà Nội --> Sapa",
//     days: 5,
//     people: 30,
//     price: "1.550.000 VNĐ",
//   },
//   {
//     id: 2,
//     name: "Du lịch Hà Nội",
//     location: "Hải Phòng --> Hà Nội",
//     days: 5,
//     people: 35,
//     price: "1.720.000 VNĐ",
//   },
// ];

export default function ManagementTour() {
  const [tours, setTours] = useState([]);
  const [location, setLocation] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // call API to get tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        // console.log("Dữ liệu nhận được:", data);
        setTours(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu từ API", error);
        setTours([]);
      }
    };

    fetchTours();
  }, []);

  return (
    <Layout title="Quản lý Tour">
      <div>
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-md flex gap-4 items-center">
          <div className="relative flex-1 ">
            <LuSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm bằng từ khóa"
              className="pl-10 pr-4 py-2 border rounded-md w-1/3"
            />
          </div>
          {/* Bộ lọc ngày */}
          <div className="relative">
            <input
              type="date"
              className="px-3 py-2 border rounded-md w-[150px] text-gray-700"
            />
          </div>

          {/* Bộ lọc địa điểm */}
          <div>
            <select
              className="px-3 py-2 border rounded-md w-[150px] text-gray-700"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>
                Địa điểm
              </option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
            </select>
          </div>

          {/* Bộ lọc giá tour */}
          <div>
            <select
              className="px-3 py-2 border rounded-md w-[150px] text-gray-700"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="" disabled>
                Giá Tour
              </option>
              <option value="low">Dưới 5 triệu</option>
              <option value="medium">5 - 10 triệu</option>
              <option value="high">Trên 10 triệu</option>
            </select>
          </div>

          {/* Nút thêm tour */}
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-md shadow-md"
            onClick={toggleModal}
          >
            Thêm Tour mới
          </button>
        </div>

        {/* Tour List */}
        <div className="mt-4 bg-white p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-SmokyGray">
                <th className="p-2">Tên Tour</th>
                <th className="p-2">Địa điểm</th>
                <th className="p-2">Số ngày</th>
                <th className="p-2">Số lượng người</th>
                <th className="p-2">Giá Tour</th>
                <th
                  className="text-end p-2"
                  style={{ width: "1%", whiteSpace: "nowrap" }}
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="border-t">
                  <td className="p-2">{tour.name_tour}</td>
                  <td className="p-2">{tour.location}</td>
                  <td className="p-2">{tour.day_number}</td>
                  <td className="p-2">{tour.max_people}</td>
                  <td className="p-2">{tour.price_tour.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
                  <td className="p-2 flex justify-end">
                    <HiOutlineDotsHorizontal />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal thêm tour */}
        {isModalOpen && <ModalAddTour onClose={toggleModal} />}
      </div>
    </Layout>
  );
}
