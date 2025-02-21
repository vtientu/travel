import { LuSearch } from "react-icons/lu";
import Layout from "../../layouts/LayoutManagement";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import ModalAddTravelTour from "../../components/ModalManage/ModalAddTravelTour";

const travelTours = [
  {
    id: 1,
    name: "Du lịch Sapa",
    startDate: "2025-02-04",
    endDate: "2025-02-06",
    member: 30,
    price: "1.550.000 VNĐ",
  },
  {
    id: 2,
    name: "Du lịch Sapa",
    startDate: "2025-02-04",
    endDate: "2025-02-06",
    member: 30,
    price: "1.720.000 VNĐ",
  },
  {
    id: 3,
    name: "Du lịch Sapa",
    startDate: "2025-02-04",
    endDate: "2025-02-06",
    member: 30,
    price: "1.610.000 VNĐ",
  },
];

export default function ManageTravelTour() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Layout>
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
              defaultValue=""
              className="px-3 py-2 border rounded-md text-gray-700"
            >
              <option value="" disabled>
                Tour
              </option>
              <option value="sapa">Du lịch Sapa</option>
            </select>
          </div>

          {/* Bộ lọc giá tour */}
          <div>
            <select
              defaultValue=""
              className="px-3 py-2 border rounded-md text-gray-700"
            >
              <option value="" disabled>
                Giá Travel Tour
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

        {/* Travel Tour table */}
        <div className="mt-2 bg-white p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-SmokyGray">
                <th className="p-2">Tên Tour</th>
                <th className="p-2">Ngày khởi hành</th>
                <th className="p-2">Ngày về</th>
                <th className="p-2">Số lượng người</th>
                <th className="p-2">Giá Travel </th>
                <th
                  className="text-end p-2"
                  style={{ width: "1%", whiteSpace: "nowrap" }}
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {travelTours.map((travelTour) => (
                <tr key={travelTour.id} className="border-t">
                  <td className=" p-2">{travelTour.name}</td>
                  <td className=" p-2">{travelTour.startDate}</td>
                  <td className=" p-2">{travelTour.endDate}</td>
                  <td className=" p-2">{travelTour.member}</td>
                  <td className=" p-2">{travelTour.price}</td>
                  <td className="flex justify-end p-2">
                    <HiOutlineDotsHorizontal />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal thêm tour */}
        {isModalOpen && <ModalAddTravelTour onClose={toggleModal} />}
      </div>
    </Layout>
  );
}
