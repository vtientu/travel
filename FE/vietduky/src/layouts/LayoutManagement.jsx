import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderManage from "../components/HeaderManage/HeaderManage";

export default function LayoutManagement({ children, title }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Quản lý Tour");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      <Sidebar setSelectedMenu={setSelectedMenu} isCollapsed={isCollapsed} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <HeaderManage
          toggleSidebar={toggleSidebar}
          selectedMenu={selectedMenu}
        />

        {/* Content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
