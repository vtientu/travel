import { useState } from "react";
import { Card } from "react-bootstrap";
import { Bell, CalendarDays, Heart, Star, User } from "lucide-react";

export default function SideBarBooking() {
    const [active, setActive] = useState("Hồ sơ của tôi");

    const menuItems = [
        { key: "Hồ sơ của tôi", icon: User },
        { key: "Lịch sử đặt Tour", icon: CalendarDays },
        { key: "Đánh giá", icon: Star },
        { key: "Danh sách yêu thích", icon: Heart },
        { key: "Cài đặt thông báo", icon: Bell },
    ];

    return (
        <div>
            <div className="mb-8 text-gray-500 text-lg">
                Trang chủ / Tài khoản / <span className="text-red-500">{active}</span>
            </div>
            <Card className="p-4 w-80 bg-white shadow-lg bg-opacity-60 rounded-lg">
                <ul className="space-y-4 m-4">
                    {menuItems.map(({ key, icon: Icon }) => (
                        <li
                            key={key}
                            className={`flex items-center font-medium cursor-pointer 
                                ${active === key ? "text-red-500" : "text-gray-700 hover:text-red-400"}`}
                            onClick={() => setActive(key)}
                        >
                            <Icon className="w-4 h-4 mr-2" />
                            {key}
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}
