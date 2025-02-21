import { FaBars, FaUserCircle } from "react-icons/fa";
import { FiSidebar, FiMoon, FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function HeaderManage({ toggleSidebar, selectedMenu }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600 text-base">
        <FiSidebar className="cursor-pointer text-gray-600 text-[20px]" onClick={toggleSidebar} />
        <span className="text-GrayishBlue">|</span>
        <span className="text-GrayishBlue font-medium">Quản lý</span>
        <span className="text-black font-medium">{<IoIosArrowForward className="inline text-[12px] text-GrayishBlue opacity-70"/>} {selectedMenu}</span>
      </div>

      {/* User Icon */}
      <div className="flex gap-4 items-center">
        <FiMoon size={24} />
        <IoMdNotificationsOutline size={24} />
        <FiUser size={24} />
      </div>
    </div>
  );
}