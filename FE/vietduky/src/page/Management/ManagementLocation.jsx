import React, { useEffect, useState } from "react";
import Layout from "../../layouts/LayoutManagement";
import { getLocations, deleteLocation } from "../../services/location.api";
import { LuSearch } from "react-icons/lu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ModalAddLocation from "../../components/ModalManage/ModalAddLocation";
import { MdEdit, MdDelete } from "react-icons/md";

export default function ManagementLocation() {
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // ID của vị trí đang mở menu

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

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

  const handleSuccess = (newLocation) => {
    setLocations((prev) => [...prev, newLocation]);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteLocation(id);
      alert("Xóa vị trí thành công");
      setLocations((prev) => prev.filter((location) => location.id !== id));
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      console.log("Lỗi khi xóa vị trí", error);
    }
  };

  return (
    <Layout title="Quản lý vị trí">
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
            Thêm vị trí
          </button>
        </div>

        {/* Location table */}
        <div className="mt-2 bg-white p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-SmokyGray text-left">
                <th className="p-2">Tên vị trí</th>
                {/* <th className="p-2">Mô tả vị trí</th> */}
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
                  {/* <td className="flex justify-end p-2">
                    <HiOutlineDotsHorizontal />
                  </td> */}
                  <td className="flex justify-end p-2 relative">
                    {/* Nút 3 chấm */}
                    <button
                      onClick={() => toggleDropdown(location.id)}
                      className="relative"
                    >
                      <HiOutlineDotsHorizontal className="text-xl cursor-pointer" />
                    </button>

                    {/* Dropdown menu */}
                    {openDropdown === location.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                        <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap">
                          <MdEdit className="mr-2 text-gray-700" /> Cập nhật địa
                          điểm
                        </button>
                        <button
                          onClick={() => handleDelete(location.id)}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600 whitespace-nowrap"
                        >
                          <MdDelete className="mr-2" /> Xóa vị trí
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal thêm tour */}
        {isModalOpen && (
          <ModalAddLocation onClose={toggleModal} onSuccess={handleSuccess} />
        )}
      </div>
    </Layout>
  );
}
