import { useState } from "react";

export default function Sidebar({ setSelectedMenu, closeSidebar }) {
  const [selected, setSelected] = useState(null);

  const menuItems = [
    { id: 1, name: "Quản lý Tour" },
    { id: 2, name: "Lorem Ipsum" },
    { id: 3, name: "Lorem Ipsum" },
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
                    setSelected(item.id);
                    setSelectedMenu(item.name);
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