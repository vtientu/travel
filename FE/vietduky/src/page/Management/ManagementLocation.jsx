import React, { useEffect, useState } from "react";
import Layout from "../../layouts/LayoutManagement";
import { getLocations } from "../../../services/location.api";
import { LuSearch } from "react-icons/lu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ModalAddLocation from "../../components/ModalManage/ModalAddLocation";

// const locations = [
//   {
//     id: 1,
//     location: "Hà Nội",
//     description: "Lorem Ipsum is dabet isum",
//   },
//   {
//     id: 2,
//     location: "Hải Phòng",
//     description: "Lorem Ipsum is dabet isum",
//   },
// ];

export default function ManagementLocation() {
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        // console.log("Dữ liệu nhận được:", data);
        setLocations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu từ API", error);
        setLocations([]);
      }
    };

    fetchLocations();
  }, []);

  return (
    <Layout title="Quản lý Địa điểm">
      <div className="overflow-visible">
        {/* Search */}
        <div className="bg-white p-4 mb-4 rounded-md flex gap-4 items-center">
          <div className="relative flex-1 ">
            <LuSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm bằng từ khóa"
              className="pl-10 pr-4 py-2 border rounded-md w-1/3"
            />
          </div>

          {/* Nút thêm tour */}
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-md shadow-md"
            onClick={toggleModal}
          >
            Thêm địa điểm
          </button>
        </div>

        {/* Location table */}
        <div className="mt-2 bg-white p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-SmokyGray">
                <th className="p-2">Tên địa điểm</th>
                <th className="p-2">Mô tả địa điểm</th>
                <th
                  className="text-end p-2"
                  style={{ width: "1%", whiteSpace: "nowrap" }}
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id} className="border-t">
                  <td className=" p-2">{location.name_location}</td>
                  <td className=" p-2">{location.description}</td>
                  <td className="flex justify-end p-2">
                    <HiOutlineDotsHorizontal />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal thêm tour */}
        {isModalOpen && <ModalAddLocation onClose={toggleModal} />}
      </div>
    </Layout>
  );
}
