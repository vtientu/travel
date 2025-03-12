

export default function RelatedTours() {
    const tours = [
        {
            id: 1,
            label: "Tiêu chuẩn",
            labelColor: "bg-red-500",
            image: "/images/tour-1.jpg",
            title: "Tour Hồ Chí Minh 5N4Đ: Hồ Chí Minh - Đà Lạt",
            duration: "5 Ngày 4 Đêm",
            price: "9.900.000 VNĐ",
        },
        {
            id: 2,
            label: "Tiết kiệm",
            labelColor: "bg-green-500",
            image: "/images/tour-2.jpg",
            title: "Tour Đà Nẵng - Huế 4N3Đ: Bà Nà - Phố Cổ Hội An - Cố Đô Huế",
            duration: "5 Ngày 4 Đêm",
            price: "9.900.000 VNĐ",
        },
        {
            id: 3,
            label: "Cao cấp",
            labelColor: "bg-yellow-600",
            image: "/images/tour-3.jpg",
            title: "Tour Đà Nẵng 4N3Đ: HCM - Hội An - Quảng Bình - Huế",
            duration: "5 Ngày 4 Đêm",
            price: "9.900.000 VNĐ",
        },
    ];
    return (
        <div className="p-6 bg-white rounded-lg shadow-md mt-8 ">
                    <h2 className="text-lg font-bold mb-4">Tours du lịch liên quan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tours.map((tour) => (
                            <div key={tour.id} className="bg-white shadow-lg rounded-lg overflow-hidden border">
                                <div className="relative">
                                    <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
                                    <span className={`absolute top-6 left-2 text-white text-xs px-2 py-1 rounded-md ${tour.labelColor}`}>
                                        + {tour.label}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-md font-semibold text-gray-800">{tour.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        {tour.duration}
                                    </p>
                                    <p className="text-red-600 font-bold text-lg mt-auto">{tour.price}</p>
                                    <p className="text-xs text-gray-400">Giá mỗi đêm chưa gồm thuế và phí</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    );
}
