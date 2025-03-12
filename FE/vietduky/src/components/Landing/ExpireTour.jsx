import { Heart, Clock } from "lucide-react";

const tours = [
    {
        id: 1,
        image: "/images/tour1.jpg",
        title: "Tour Côn Đảo 2N2Đ bằng Xe Giường Nằm + Tàu Cao Tốc",
        duration: "5 Ngày 4 Đêm",
        seatsLeft: 14,
        originalPrice: "9.900.000 VNĐ",
        discountPrice: "5.900.000 VNĐ",
    },
    {
        id: 2,
        image: "/images/tour1.jpg",
        title: "Tour Côn Đảo 2N2Đ bằng Xe Giường Nằm + Tàu Cao Tốc",
        duration: "5 Ngày 4 Đêm",
        seatsLeft: 14,
        originalPrice: "9.900.000 VNĐ",
        discountPrice: "5.900.000 VNĐ",
    },
    {
        id: 3,
        image: "/images/tour1.jpg",
        title: "Tour Côn Đảo 2N2Đ bằng Xe Giường Nằm + Tàu Cao Tốc",
        duration: "5 Ngày 4 Đêm",
        seatsLeft: 14,
        originalPrice: "9.900.000 VNĐ",
        discountPrice: "5.900.000 VNĐ",
    },
    {
        id: 4,
        image: "/images/tour1.jpg",
        title: "Tour Côn Đảo 2N2Đ bằng Xe Giường Nằm + Tàu Cao Tốc",
        duration: "5 Ngày 4 Đêm",
        seatsLeft: 14,
        originalPrice: "9.900.000 VNĐ",
        discountPrice: "5.900.000 VNĐ",
    },
    {
        id: 5,
        image: "/images/tour1.jpg",
        title: "Tour Côn Đảo 2N2Đ bằng Xe Giường Nằm + Tàu Cao Tốc",
        duration: "5 Ngày 4 Đêm",
        seatsLeft: 14,
        originalPrice: "9.900.000 VNĐ",
        discountPrice: "5.900.000 VNĐ",
    },
    // Thêm các tour khác tương tự ở đây
];
export default function ExpireTour() {

    return (
        <div className="bg-transparent py-10 px-5">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-red-600">Ưu đãi phút chót</h2>
                <p className="text-gray-600">Hãy nhanh tay nắm bắt cơ hội giảm giá cuối cùng.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">
                {tours.map((tour) => (
                    <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="relative">
                            <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
                            <button className="absolute top-2 left-2 bg-transparent  rounded-full p-2  backdrop-blur-md">
                                <Heart className="text-gray-600" size={18} />
                            </button>
                            <div className="absolute bottom-2 left-2 flex items-center bg-white text-red-700 px-3 py-1 rounded-lg shadow-md border border-red-700">
                                <Clock size={16} className="mr-1 text-red-700" />
                                <span className="font-semibold">Giờ chót</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{tour.title}</h3>
                            <p className="text-sm text-gray-600">{tour.duration}</p>
                            <p className="text-sm text-gray-600">Số lượng chỗ ngồi còn trống: {tour.seatsLeft}</p>
                            <p className="text-gray-400 line-through text-sm">{tour.originalPrice}</p>
                            <p className="text-red-600 font-bold text-lg">{tour.discountPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-6">
                <button className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition duration-300">
                    Xem thêm Tours
                </button>
            </div>
        </div>
    );
}
