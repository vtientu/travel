import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import { PiMapPinLineBold } from "react-icons/pi"; // Icon hành trình
import { deleteTour } from "../../services/API/tour.service";

export default function DropdownMenu({ tour, onDelete, onManageTravelTour }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Đóng dropdown khi click bên ngoài
  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setIsOpen(false);
    }
  };

  useState(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTour(id);
      onDelete(id);
      alert("Xóa tour thành công");
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      console.log("Lỗi khi xóa tour", error);
    } finally {
      setIsOpen(false); // Đóng dropdown sau khi xóa
    }
  };


  return (
      <div
          className="relative dropdown-container flex items-center gap-2 justify-end"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <HiOutlineDotsHorizontal className="text-xl cursor-pointer" />
        </button>

        {isHovered && (
            <div className="absolute right-full flex gap-2 mr-2">
              <button
                  onClick={() => onManageTravelTour()}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                <PiMapPinLineBold className="text-lg" />
              </button>
              <button
                  onClick={() => onEdit(tour)}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                <MdEdit className="text-lg" />
              </button>
            </div>
        )}

        {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
              <button
                  onClick={() => onManageTravelTour()}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <PiMapPinLineBold className="mr-2 text-gray-700" />
                Quản lý hành trình
              </button>
              <button
                  onClick={() => {
                    onEdit(tour); // ✅ Gọi callback từ cha
                    setIsOpen(false); // Đóng dropdown
                  }}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <MdEdit className="mr-2 text-gray-700" />
                Cập nhật chuyến đi
              </button>
              <button
                  onClick={() => handleDelete(tour.id)}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
              >
                <MdDelete className="mr-2" />
                Xóa chuyến đi
              </button>
            </div>
        )}
      </div>
  );
}
