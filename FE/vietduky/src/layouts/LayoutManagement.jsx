import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderManage from "../components/HeaderManage/HeaderManage";

export default function LayoutManagement({ children, title}) {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState("Quản lý Tour");


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

  return (
    <div className="flex h-screen">
      {isOpen && <Sidebar setSelectedMenu={setSelectedMenu} closeSidebar={toggleSidebar}/>}
      
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <HeaderManage toggleSidebar={toggleSidebar} selectedMenu={selectedMenu}/>

        {/* Content */}
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}
