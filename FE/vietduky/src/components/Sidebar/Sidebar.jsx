import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ setSelectedMenu, closeSidebar }) {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 1, name: "Quản lý Tour", path: "/managementTour" },
    { id: 2, name: "Quản lý Địa điểm", path: "/managementLocation" },
    { id: 3, name: "Quản lý Chuyến đi", path: "/manageTravelTour" },
    { id: 4, name: "Lorem Ipsum" },
    { id: 5, name: "Lorem Ipsum" },
    { id: 6, name: "Lorem Ipsum" },
  ];

  const systemItems = [
    { id: 7, name: "Lorem Ipsum" },
    { id: 8, name: "Lorem Ipsum" },
    { id: 9, name: "Lorem Ipsum" },
    { id: 10, name: "Lorem Ipsum" },
  ];

  useEffect(() => {
    const activeItem = menuItems.find((item) => location.pathname.includes(item.path));
    if (activeItem) {
      setSelected(activeItem.id);
      setSelectedMenu(activeItem.name);
    }
  }, [location.path]);

  return (
    <div>
      {/* Sidebar */}
      <aside className="w-64 bg-red-700 text-white p-4 h-screen">
        <img
          className="mb-8"
          src="/Image/Logo.png"
          alt="Viet Du Ky"
          width={175}
          height={125}
        />
        <nav className="mb-10">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`p-1 rounded mb-2 cursor-pointer ${
                  selected === item.id ? "bg-[#F4F4F5] text-black" : ""
                }`}
                onClick={() => {
                    navigate(item.path);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          <p className="text-sm">Hệ thống</p>
          <ul>
            {systemItems.map((item) => (
              <li
                key={item.id}
                className={`p-2 rounded mb-2 cursor-pointer ${
                  selected === item.id ? "bg-[#F4F4F5] text-black" : ""
                }`}
                onClick={() => {
                    setSelected(item.id);
                    setSelectedMenu(item.name);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}