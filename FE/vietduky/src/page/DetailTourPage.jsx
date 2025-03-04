import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import DatePicker from "react-datepicker";
import {useState} from "react";
import { ChevronDown } from "lucide-react";

export default function DetailTourPage() {
    const tourSchedule = [
        { departure: "T6, 28/02/2025", return: "T2, 03/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
        { departure: "CN, 02/03/2025", return: "T4, 05/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
        { departure: "T6, 07/03/2025", return: "T2, 10/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
        { departure: "CN, 09/03/2025", return: "T4, 12/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
        { departure: "T6, 14/03/2025", return: "T2, 17/03/2025", status: "Liên hệ", price: "7.990.000 VNĐ" },
    ];
    const notes = [
        { title: "Giá tour bao gồm", content: "Các dịch vụ, ăn uống, khách sạn..." },
        { title: "Giá tour không bao gồm", content: "Chi phí cá nhân, vé tham quan..." },
        { title: "Lưu ý giá trẻ em", content: "Giá trẻ em áp dụng theo quy định..." },
        { title: "Điều kiện thanh toán", content: "Thanh toán 50% khi đặt tour..." },
        { title: "Điều kiện đăng ký", content: "Đăng ký trước 7 ngày..." },
        { title: "Lưu ý về chuyển hoặc hủy tour", content: "Hủy trước 5 ngày sẽ mất 30%..." },
        { title: "Các điều kiện hủy tour đối với ngày thường", content: "Hủy trước 3 ngày..." },
        { title: "Các điều kiện hủy tour đối với ngày lễ, Tết", content: "Hủy trước 7 ngày..." },
        { title: "Trường hợp bất khả kháng", content: "Trời mưa, thiên tai..." },
        { title: "Liên hệ", content: "Hotline: 0123 456 789" },
    ];
    const tourData = [
        {
            day: "Ngày 1",
            title: "Tp Hồ Chí Minh – Đà Nẵng – Ngũ Hành Sơn – Phố Cổ Hội An",
            meals: "(Ăn Trưa, Chiều)",
            image: "https://via.placeholder.com/100", // Thay bằng link ảnh thực tế
        },
        {
            day: "Ngày 2",
            title: "Đà Nẵng – Bà Nà – Cầu Vàng – Huế",
            meals: "(Ăn Sáng, Chiều)",
            image: "https://via.placeholder.com/100",
        },
        {
            day: "Ngày 3",
            title: "Huế – La Vang – Quảng Bình – Động Thiên Đường",
            meals: "(Ăn Sáng, Trưa, Chiều)",
            image: "https://via.placeholder.com/100",
        },
        {
            day: "Ngày 4",
            title: "Huế – Đại Nội – Làng Hương Thủy Xuân – Tp. Hồ Chí Minh",
            meals: "(Ăn Sáng, Trưa)",
            image: "https://via.placeholder.com/100",
        },
    ];
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
    const [selectedFilter, setSelectedFilter] = useState("Tất cả");
    const filters = ["Tất cả", "Chỉ có hình ảnh", "4.0+", "3.0+"];
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState("2025-02-28");
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white" style={{ backgroundImage: "url('/Image/Background.png')", backgroundSize: "cover", backgroundPosition: "center", width: "100%", minHeight: "100vh" }}>
            <Header />

            <div className="container mx-auto py-8 px-4">
                {/* Breadcrumb */}
                <nav className="text-lg text-gray-500 mb-4">
                    Việt Du Ký / Du lịch Việt Du Ký / <span className="text-red-600 font-bold ">Tour Đà Nẵng 4N3Đ: HCM - Đà Nẵng - KDL Bà Nà - Sơn Trà - Hội An - Động Thiên Đường - Làng hương Thủy Xuân</span>
                </nav>

                {/* Tiêu đề Tour */}
                <h1 className="text-4xl font-bold text-red-600 ">Tour Đà Nẵng 4N3Đ: HCM - Đà Nẵng - KDL Bà Nà - Sơn Trà - Hội An - Động Thiên Đường - Làng hương Thủy Xuân</h1>

                {/* Hình ảnh chính */}

                <div className="grid grid-cols-9 gap-6 mt-6">

                    {/* Thông tin Tour */}
                    <div className=" col-span-6 ">
                        <div >
                            <img src="/Image/Overlay+Shadow.png" alt="Tour Đà Nẵng" className="w-full rounded-lg shadow-lg" />
                        </div>

                        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
                            <div className="flex justify-between text-gray-700 ">
                                <span><strong>Khởi hành từ:</strong> <span className="text-red-600">Hồ Chí Minh</span></span>
                                <span><strong>Mã Tour:</strong> <span className="text-red-600">TO4479</span></span>
                            </div>

                            <h2 className="mt-4 text-lg font-bold">Tour Trọn Gói Bao Gồm</h2>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <span>✔ Vé máy bay</span>
                                <span>✔ Xe tham quan</span>
                                <span>✔ Bảo hiểm du lịch</span>
                                <span>✔ Khách sạn 4*</span>
                                <span>✔ Vé tham quan</span>
                                <span>✔ Bữa ăn</span>
                                <span>✔ Hướng dẫn viên</span>
                            </div>
                        </div>

                        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
                            <div className="mt-4 flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900">Trải nghiệm thú vị trong tour</h1>
                                <div className="flex gap-2 mb-8 ">
                                    <button className="bg-[#7300FF] text-white px-3 py-1.5 rounded-md shadow-md flex items-center text-sm font-medium">
                                        <i className="fa fa-thumbs-up mr-2"></i> Like
                                    </button>
                                    <button className="bg-[#7300FF] text-white px-3 py-1.5 rounded-md shadow-md flex items-center text-sm font-medium">
                                        <i className="fa fa-share mr-2"></i> Share
                                    </button>
                                </div>
                            </div>
                            <ul className="space-y-3 text-gray-700">
                                <li>✅ <strong>Bà Nà Hills</strong> - Tiên cảnh chốn nhân gian: Check-in Cầu Vàng, trải nghiệm cáp treo và dạo bước trong khu làng Pháp.</li>
                                <li>🏮 <strong>Phố cổ Hội An</strong> huyền bí: Ngắm đèn lồng lung linh, tham quan Chùa Cầu và những ngôi nhà cổ độc đáo.</li>
                                <li>🛕 <strong>Sơn Trà - Linh Ứng Tự</strong>: Chiêm ngưỡng tượng Phật Quan Âm cao nhất Việt Nam, tận hưởng không khí trong lành.</li>
                                <li>⛰️ <strong>Động Thiên Đường</strong>: Khám phá ‘Hoàng cung lòng đất’ với thạch nhũ tráng lệ và không gian huyền ảo.</li>
                                <li>🌿 <strong>Làng hương Thủy Xuân</strong>: Trải nghiệm làm hương truyền thống, check-in cùng sắc màu rực rỡ.</li>
                            </ul>

                        </div>

                        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">Chương trình tour</h2>
                                <button className="text-blue-600 font-medium">Xem tất cả</button>
                            </div>
                            <div className="space-y-2">
                                {tourData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-white-100 rounded-lg overflow-hidden shadow-sm"
                                    >
                                        <img src={item.image} alt={item.day} className="w-24 h-24 object-cover" />
                                        <div className="flex-1 p-3">
                                            <p className="text-gray-500 text-sm">{item.day}</p>
                                            <p className="font-semibold text-gray-800">{item.title}</p>
                                            <p className="text-sm text-gray-500">{item.meals}</p>
                                        </div>
                                        <button
                                            className="p-2"
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        >
                                            <ChevronDown
                                                className={`w-5 h-5 text-gray-600 transition-transform ${
                                                    openIndex === index ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
                            {/* Header */}
                            <div className="flex justify-between items-center pb-3 border-b">
                                <h2 className="text-lg font-bold">Lịch khởi hành & giá Tour</h2>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="px-3 py-1 border rounded-md bg-gray-100 text-gray-600 cursor-pointer"
                                />
                            </div>

                            {/* Table */}
                            <div className="mt-3">
                                <table className="w-full text-left text-lg">
                                    <thead className="text-gray-500">
                                    <tr>
                                        <th className="py-2">Ngày khởi hành</th>
                                        <th className="py-2">Ngày về</th>
                                        <th className="py-2">Tình trạng chỗ</th>
                                        <th className="py-2 text-right">Giá</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tourSchedule.map((tour, index) => (
                                        <tr key={index} className={`border-t ${index % 2 ? "bg-gray-100" : ""}`}>
                                            <td className="py-2">{tour.departure}</td>
                                            <td className="py-2">{tour.return}</td>
                                            <td className="py-2">{tour.status}</td>
                                            <td className="py-2 text-right font-bold text-red-600">{tour.price}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Xem thêm */}
                            <div className="text-center mt-3">
                                <button className="text-red-500 font-medium">Xem thêm</button>
                            </div>
                        </div>

                        <div className="col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
                            <h2 className="text-center text-lg font-bold mb-4">Những thông tin cần lưu ý</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {notes.map((note, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-4 rounded-lg shadow-md cursor-pointer"
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-gray-700">{note.title}</h3>
                                            <span className="text-gray-500">{openIndex === index ? "▲" : "▼"}</span>
                                        </div>
                                        {openIndex === index && <p className="mt-2 text-gray-600">{note.content}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Bảng giá và Lịch trình */}
                    <div className="p-4 rounded-lg col-span-3" style={{ height: "600px", backgroundColor: "#FEEEC7" }}>
                        <h2 className="text-lg font-bold text-red-600">Lịch Trình và Giá Tour</h2>
                        <p className="text-sm text-gray-600">Chọn Lịch Trình và Xem Giá:</p>
                        <div className="mt-2 flex gap-2">
                            <button className="bg-white px-4 py-2 rounded shadow border">28/02</button>
                            <button className="bg-white px-4 py-2 rounded shadow border">02/03</button>
                            <button className="bg-white px-4 py-2 rounded shadow border">07/03</button>
                            <div className="relative inline-block">
                                    {/* Nút mở dropdown */}
                                    <button
                                        className="bg-white px-4 py-2 rounded shadow border flex items-center"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <i className="fas fa-calendar"></i> Tất cả
                                    </button>

                                    {/* Dropdown lịch */}
                                    {isOpen && (
                                        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded p-2 z-50">
                                            <DatePicker
                                                inline
                                                selected={selectedDate}
                                                onChange={(date) => {
                                                    setSelectedDate(date);
                                                    setIsOpen(false);
                                                }}
                                            />
                                        </div>
                                    )}
                            </div>

                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center p-2 bg-white rounded shadow border">
                                <span>Người lớn "(11 tuổi)" </span>
                                <span className="text-red-600 font-bold">x 7.990.000</span>
                                <div className="flex items-center">
                                    <button className="px-2">-</button>
                                    <span className="px-2">2</span>
                                    <button className="px-2">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded shadow border">
                                <span>Trẻ em (5 - 11 tuổi)</span>
                                <div className="flex items-center">
                                    <button className="px-2">-</button>
                                    <span className="px-2">0</span>
                                    <button className="px-2">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded shadow border">
                                <span>Trẻ em (2 - 4 tuổi)</span>
                                <div className="flex items-center">
                                    <button className="px-2">-</button>
                                    <span className="px-2">0</span>
                                    <button className="px-2">+</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded shadow border">
                                <span>Trẻ nhỏ "(2 tuổi)"</span>
                                <div className="flex items-center">
                                    <button className="px-2">-</button>
                                    <span className="px-2">0</span>
                                    <button className="px-2">+</button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-right text-red-600 font-bold text-xl">Tổng Giá Tour: 15.980.000 VNĐ</p>
                        <button className="bg-yellow-500 w-full mt-4 py-2 rounded text-white font-bold">Đặt Tour</button>
                    </div>
                </div>

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

            </div>

            <Footer />
        </div>    );
}
