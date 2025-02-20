import { FaBars, FaUserCircle } from "react-icons/fa";
import { FiSidebar, FiMoon, FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function HeaderManage({ toggleSidebar, selectedMenu }) {
  return (
    <div className="flex justify-between items-center mb-4 bg-white p-4 shadow rounded-lg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <FiSidebar className="cursor-pointer text-gray-800" onClick={toggleSidebar} />
        <span className="text-gray-400">|</span>
        <span>Quản lý</span>
        <span className="text-gray-800 font-medium">{">"} {selectedMenu}</span>
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