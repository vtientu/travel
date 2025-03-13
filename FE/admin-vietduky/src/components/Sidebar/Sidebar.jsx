import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icons from "../Icons/Icon";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";

export default function Sidebar({ setSelectedMenu, isCollapsed }) {
  const [selected, setSelected] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 1, name: "Thống kê", icon: Icons.Sidebar, path: "/#" },
    {
      id: 2,
      name: "Quản lý Tour",
      icon: Icons.TourIcon,
      subItems: [
        { id: 201, name: "Vị trí", path: "/managementLocation" },
        { id: 202, name: "Chuyến du lịch", path: "/managementTour" },
      ],
    },
    {
      id: 3,
      name: "Quản lý khách sạn",
      icon: Icons.HotelIcon,
      path: "/managementHotel",
    },
    {
      id: 4,
      name: "Quản lý nhà hàng",
      icon: Icons.RestaurantIcon,
      path: "/managementRestaurant",
    },
    {
      id: 5,
      name: "Quản lý phương tiện",
      icon: Icons.VehicleIcon,
      subItems: [
        { id: 501, name: "Loại phương tiện" },
        { id: 502, name: "Phương tiện" },
      ],
    },
    {
      id: 6,
      name: "Quản lý khuyến mãi",
      icon: Icons.PromotionIcon,
      path: "/#",
    },
    { id: 7, name: "Quản lý dịch vụ", icon: Icons.ServiceIcon, path: "/#" },
  ];

  const systemItems = [
    {
      id: 8,
      name: "Cấu hình hệ thống",
      icon: Icons.SystemConfigIcon,
      path: "/#",
      subItems: [],
    },
    {
      id: 9,
      name: "Quản lý tài khoản",
      icon: Icons.AccountIcon,
      path: "/#",
      subItems: [],
    },
  ];

  useEffect(() => {
    const activeItem = menuItems.find((item) =>
      item.path ? location.pathname.includes(item.path) : false
    );
    if (activeItem) {
      setSelected(activeItem.id);
      setSelectedMenu(activeItem.name);
    }
  }, [location.pathname]);

  return (
    <aside
      className={`h-screen bg-[#9A1B21] text-white p-4 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <a href="/" className="flex justify-center">
        <img
          src="/Image/Logo.png"
          alt="Viet Du Ky"
          width={isCollapsed ? 50 : 175}
          height={isCollapsed ? 50 : 125}
          className="transition-all duration-300"
        />
      </a>

      <nav className="mb-6">
        <ul>
          {menuItems.map((item) => {
            const isSelected = selected === item.id || openSubMenu === item.id;
            return (
              <li key={item.id}>
                <div
                  className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                    isSelected
                      ? "bg-[#F4F4F5] text-black"
                      : "hover:bg-[#B22222]"
                  }`}
                  onClick={() => {
                    if (item.subItems) {
                      setOpenSubMenu(openSubMenu === item.id ? null : item.id);
                    } else {
                      navigate(item.path);
                      setSelected(item.id);
                      setOpenSubMenu(null);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                      className={`filter ${isSelected ? "invert-0" : "invert"}`}
                    />
                    {!isCollapsed && item.name}
                  </div>
                  {!isCollapsed &&
                    item.subItems &&
                    (openSubMenu === item.id ? (
                      <img src={Icons.ArrowBottom} className="filter invert" />
                    ) : (
                      <img src={Icons.ArrowRight} className="filter invert" />
                    ))}
                </div>

                {!isCollapsed && item.subItems && openSubMenu === item.id && (
                  <ul className="ml-6 border-l border-gray-300 pl-3 mt-1">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={`py-1 cursor-pointer ${
                          selected === subItem.id
                            ? "text-black font-medium"
                            : "hover:text-gray-300"
                        }`}
                        onClick={() => {
                          navigate(subItem.path);
                          setSelected(item.id);
                        }}
                      >
                        {subItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="text-sm opacity-70 mb-2">{!isCollapsed && "Hệ thống"}</p>
      <nav>
        <ul>
          {systemItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#B22222]"
              onClick={() => setSelectedMenu(item.name)}
            >
              <img
                src={item.icon}
                alt={item.name}
                width={20}
                height={20}
                className={`filter ${
                  selected === item.id ? "invert-0" : "invert"
                }`}
              />
              {!isCollapsed && item.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
