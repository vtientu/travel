import { useState } from "react";
import { BsThreeDots, BsPencil, BsArrowRepeat } from "react-icons/bs";
import { CalendarDays, User } from "lucide-react";

export default function TourCardBooking() {
    const [activeTab, setActiveTab] = useState("upcoming");

    const tour = {
        orderCode: "DL0078928",
        name: "Tour HCM 3N2Đ: Khám Phá Sơn Trà - Phố Cổ Hội An - Bà Nà - Rừng Dừa Bảy Mẫu",
        image: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/06/tuong-phat-thich-ca-27m-tren-nui-linh-ung.jpg",
        date: "T6, 28/02 → T4, 04/03",
        people: "2 người lớn"
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 ">
            {/* Tabs */}
            <div className="flex border-b mb-4">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`mr-6 pb-2 font-semibold ${
                        activeTab === "upcoming"
                            ? "text-red-700 border-b-2 border-red-700"
                            : "text-gray-500 hover:text-red-600"
                    }`}
                >
                    Chuyến đi sắp tới
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`pb-2 font-semibold ${
                        activeTab === "history"
                            ? "text-red-700 border-b-2 border-red-700"
                            : "text-gray-500 hover:text-red-600"
                    }`}
                >
                    Lịch sử chuyến đi
                </button>
            </div>

            {/* Nội dung của tab */}
            {activeTab === "upcoming" ? (
                <div className="bg-white rounded-md shadow border border-gray-200 p-4 mb-6 bg-opacity-60">
                    {/* Mã đơn hàng */}
                    <p className="text-sm mb-2">
                        Mã đơn hàng: <span className="text-red-600 font-semibold">{tour.orderCode}</span>
                    </p>

                    <div className="flex gap-4">
                        {/* Ảnh tour */}
                        <div className="w-32 h-24 overflow-hidden rounded">
                            <img
                                src={tour.image}
                                alt="Tour"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Thông tin tour */}
                        <div className="flex-1">
                            <h3 className="text-red-700 font-semibold text-xl mb-2">
                                {tour.name}
                            </h3>

                            <div className="flex items-center text-sm text-gray-600 gap-6">
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>{tour.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>{tour.people}</span>
                                </div>
                            </div>
                        </div>

                        {/* Hành động */}
                        <div className="flex items-start gap-3 text-gray-600 text-lg">
                            <button title="Làm mới" className="hover:text-red-600"><BsArrowRepeat /></button>
                            <button title="Chỉnh sửa" className="hover:text-red-600"><BsPencil /></button>
                            <button title="Khác" className="hover:text-red-600"><BsThreeDots /></button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500 italic">
                    Bạn chưa có lịch sử chuyến đi nào.
                </div>
            )}
        </div>
    );
}
