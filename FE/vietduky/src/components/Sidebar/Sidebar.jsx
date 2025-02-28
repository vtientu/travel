import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icons from "../Icons/Icon";

export default function Sidebar({ setSelectedMenu }) {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 1, name: "Thống kê", icon: Icons.Sidebar, path: "/#" },
    {
      id: 2,
      name: "Quản lý chuyến du lịch",
      icon: Icons.TourIcon,
      path: "/managementTour",
    },
    {
      id: 3,
      name: "Quản lý hành trình",
      icon: Icons.TravelTourIcon,
      path: "/managementTravelTour",
    },
    {
      id: 4,
      name: "Quản lý địa điểm",
      icon: Icons.LocationIcon,
      path: "/managementLocation",
    },
    {
      id: 5,
      name: "Quản lý khách sạn",
      icon: Icons.HotelIcon,
      path: "/managementHotel",
    },
    {
      id: 6,
      name: "Quản lý nhà hàng",
      icon: Icons.RestaurantIcon,
      path: "/managementRestaurant",
    },
    {
      id: 7,
      name: "Quản lý phương tiện",
      icon: Icons.VehicleIcon,
      path: "/managementVehicle",
      subItems: [
        { id: 101, name: "Loại phương tiện" },
        { id: 102, name: "Phương tiện" },
      ],
    },
    {
      id: 8,
      name: "Quản lý khuyến mãi",
      icon: Icons.PromotionIcon,
      path: "/#",
    },
    { id: 9, name: "Quản lý dịch vụ", icon: Icons.ServiceIcon, path: "/#" },
  ];

  const systemItems = [
    { id: 10, name: "Cấu hình hệ thống", icon: Icons.SystemConfigIcon },
    { id: 11, name: "Quản lý tài khoản", icon: Icons.AccountIcon },
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
                className={`flex items-center gap-2 p-1 rounded mb-2 cursor-pointer ${
                  selected === item.id ? "bg-[#F4F4F5] text-black" : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    width={16}
                    height={16}
                    className={`transition-all ${
                      selected === item.id ? "" : "filter invert"
                    }`}
                  />
                )}
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
                className={`flex items-center gap-2 p-2 rounded mb-2 cursor-pointer ${
                  selected === item.id ? "bg-[#F4F4F5] text-black" : ""
                }`}
                onClick={() => {
                  setSelected(item.id);
                  setSelectedMenu(item.name);
                }}
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    width={16}
                    height={16}
                    className={`transition-all ${
                      selected === item.id ? "" : "filter invert"
                    }`}
                  />
                )}
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
