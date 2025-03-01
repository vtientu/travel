import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import { PiMapPinLineBold } from "react-icons/pi"; // Icon hành trình

export default function DropdownMenu({ tour }) {
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
        // const response = await deleteTour(id);
        alert("Xóa tour thành công");
        setTours((prev) => prev.filter((tour) => tour.id !== id));
      } catch (error) {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        console.log("Lỗi khi xóa tour", error);
      } finally {
        setOpenDropdown(null);
      }
    };

  return (
    <div
      className="relative dropdown-container flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Button 3 chấm */}
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        <HiOutlineDotsHorizontal className="text-xl cursor-pointer" />
      </button>

      {/* Hiển thị 2 icon khi hover */}
      {isHovered && (
        <>
          <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300">
            <PiMapPinLineBold className="text-lg" />
          </button>
          <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300">
            <MdEdit className="text-lg" />
          </button>
        </>
      )}

      {/* Dropdown Menu khi click */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
          <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left">
            <PiMapPinLineBold className="mr-2 text-gray-700" /> Quản lý hành trình
          </button>
          <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left">
            <MdEdit className="mr-2 text-gray-700" /> Cập nhật chuyến đi
          </button>
          <button
            onClick={() => console.log("Xóa tour", tour.id)}
            className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
          >
            <MdDelete className="mr-2" onClick={() => handleDelete(tour.id)}/> Xóa chuyến đi
          </button>
        </div>
      )}
    </div>
  );
}
