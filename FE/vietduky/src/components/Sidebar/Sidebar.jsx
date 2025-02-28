import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ setSelectedMenu }) {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 1, name: "Thống kê", path: "/#" },
    { id: 2, name: "Quản lý chuyến du lịch", path: "/managementTour" },
    { id: 3, name: "Quản lý địa điểm ", path: "/managementLocation" },
    { id: 4, name: "Quản lý hành trình", path: "/managementTravelTour" },
    { id: 5, name: "Quản lý khách sạn", path: "/managementHotel" },
    { id: 6, name: "Quản lý nhà hàng", path: "/managementRestaurant" },
    {
      id: 7,
      name: "Quản lý phương tiện",
      path: "/managementVehicle",
      subItems: [
        { id: 101, name: "Loại phương tiện"},
        { id: 102, name: "Phương tiện"},
      ],
    },
    { id: 8, name: "Quản lý khuyến mãi", path: "/#" },
    { id: 9, name: "Quản lý dịch vụ", path: "/#" },
  ];

  const systemItems = [
    { id: 10, name: "Cấu hình hệ thống" },
    { id: 11, name: "Quản lý tài khoản" }
  ];

  useEffect(() => {
    const activeItem = menuItems.find((item) =>
      location.pathname.includes(item.path)
    );
    if (activeItem) {
      setSelected(activeItem.id);
      setSelectedMenu(activeItem.name);
    }
  }, [location.path]);

  return (
    <div>
      {/* Sidebar */}
      <aside className="w-64 bg-red-700 text-white p-4 h-screen">
        <a href="/">
          <img
              className="mb-8"
              src="/Image/Logo.png"
              alt="Viet Du Ky"
              width={175}
              height={125}
          />
        </a>
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
