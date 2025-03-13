import {useState} from "react";

export default function Feedback() {
    const [selectedFilter, setSelectedFilter] = useState("Tất cả");
    const filters = ["Tất cả", "Chỉ có hình ảnh", "4.0+", "3.0+"];
    return (
        <div className=" mx-auto mt-8 p-4 border rounded-lg  bg-transparent ">
                    {/* Header đánh giá */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">4.7</span>
                        <span className="text-yellow-400 text-xl">★★★★★</span>
                        <span className="text-gray-600 text-sm">Dựa trên hơn 14 nghìn đánh giá</span>
                        <a href="#" className="text-blue-600 text-sm ml-auto">Đọc Blog Trải nghiệm</a>
                    </div>

                    {/* Bộ lọc */}
                    <div className="flex gap-2 mt-3">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-3 py-1 border rounded-full text-sm ${
                                    selectedFilter === filter
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Nội dung đánh giá */}
                    <div className="mt-4 flex gap-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-bold">VietDuKy User</p>
                            <p className="text-gray-500 text-sm">4 days ago</p>
                            <p className="text-yellow-400 text-lg">★★★★★</p>
                            <p className="font-semibold mt-1">Rất khuyến khích</p>
                            <p className="text-gray-700 text-sm">
                                Thời gian đặt trước rất tuyệt để hạn chế số người vào bên trong. Chúng tôi có một khung giờ 7:30 tối thực sự tuyệt vời.
                            </p>
                        </div>
                    </div>

                    {/* Ảnh đính kèm */}
                    <div className="mt-3 flex gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="w-16 h-16 bg-gray-300 rounded-md animate-pulse"
                            />
                        ))}
                    </div>

                    {/* Phản hồi hữu ích */}
                    <div className="mt-3 text-gray-600 text-sm">
                        <span>👍 1 người thấy điều này hữu ích</span>
                    </div>
                </div>
    );
}
