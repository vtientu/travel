import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import Layout from "../layouts/LayoutManagement";
import ModalAddTour from "../components/ModalAddTour/ModalAddTour";

const tours = [
  {
    id: 1,
    name: "Du lịch Sapa",
    location: "Hà Nội --> Sapa",
    days: 5,
    people: 30,
    price: "1.550.000 VNĐ",
  },
  {
    id: 2,
    name: "Du lịch Hà Nội",
    location: "Hải Phòng --> Hà Nội",
    days: 5,
    people: 35,
    price: "1.720.000 VNĐ",
  },
];

export default function ManagementTour() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Layout title="Quản lý Tour">
      <div>
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow flex gap-4 items-center">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm bằng từ khóa"
              className="pl-10 pr-4 py-2 border rounded w-full"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={toggleModal}
          >
            <FaPlus /> Thêm Tour mới
          </button>
        </div>

        {/* Tour List */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Tên Tour</th>
                <th className="p-2">Địa điểm</th>
                <th className="p-2">Số ngày</th>
                <th className="p-2">Số lượng người</th>
                <th className="p-2">Giá Tour</th>
                <th className="p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="border-t">
                  <td className="p-2">{tour.name}</td>
                  <td className="p-2">{tour.location}</td>
                  <td className="p-2">{tour.days}</td>
                  <td className="p-2">{tour.people}</td>
                  <td className="p-2">{tour.price}</td>
                  <td className="p-2 text-center">...</td>
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
