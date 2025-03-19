import { useEffect, useState } from "react";
import Layout from "../../layouts/LayoutManagement";
import { LuSearch } from "react-icons/lu";
import { getTours } from "../../services/API/tour.service";
import ModalAddVocher from "../../components/ModalManage/ModalAddVocher.jsx";
import ModalAddSaleProgram from "../../components/ModalManage/ModalAddSaleProgram.jsx";
import {FaEllipsisH} from "react-icons/fa";

export default function ManagementSaleProgram() {
    const [tours, setTours] = useState([]);

    const [isAddTourModalOpen, setIsAddTourModalOpen] = useState(false); // Modal thêm Tour

    // Mở/đóng modal thêm Tour
    const toggleAddTourModal = () => {
        setIsAddTourModalOpen(!isAddTourModalOpen);
    };

    // call API to get tours
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const toursData = await getTours();
                console.log("Dữ liệu từ API:", toursData);

                if (Array.isArray(toursData)) {
                    setTours(toursData);
                } else {
                    console.error("Dữ liệu API không đúng định dạng:", toursData);
                    setTours([]);
                }
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu từ API", error);
                setTours([]);
            }
        };

        fetchTours();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const discountPrograms = [
        {
            name: "Giảm giá ABC",
            value: "500.000 VNĐ",
            percent: "10%",
            startDate: "13/03/2025",
            endDate: "13/04/2025",
            status: "Còn hạn",
            content: "Lorem Ipsum is simply dumm...",
            statusClass: "text-green-500"
        },
        {
            name: "Giảm giá DEF",
            value: "100.000 VNĐ",
            percent: "5%",
            startDate: "13/03/2025",
            endDate: "13/04/2025",
            status: "Hết hạn",
            content: "Lorem Ipsum is simply dumm...",
            statusClass: "text-red-500"
        }
    ];
    return (
        <Layout title="Quản lý Tour">
            <div className="p-4 bg-white rounded-md">
                {/* Thanh tìm kiếm và nút hành động */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1">
                        <LuSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bằng từ khóa"
                            className="pl-10 pr-4 py-2 border rounded-md w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="border border-red-600 text-red-600 px-4 py-2 rounded-md">
                        Nhập d.sách chiết khấu
                    </button>
                    <button className="bg-red-700 text-white px-4 py-2 rounded-md" onClick={toggleAddTourModal}>
                        Thêm chương trình chiết khấu
                    </button>
                </div>

                {/* Bảng danh sách mã giảm giá */}
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="border-b">
                        <th className="text-left p-2">Tên chương trình</th>
                        <th className="text-left p-2">Giá trị giảm giá</th>
                        <th className="text-left p-2">% giảm giá</th>
                        <th className="text-left p-2">Ngày bắt đầu</th>
                        <th className="text-left p-2">Ngày kết thúc</th>
                        <th className="text-left p-2">Trạng thái</th>
                        <th className="text-left p-2">Nội dung</th>
                        <th className="p-2">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {discountPrograms.map((program, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-2">{program.name}</td>
                            <td className="p-2">{program.value}</td>
                            <td className="p-2">{program.percent}</td>
                            <td className="p-2">{program.startDate}</td>
                            <td className="p-2">{program.endDate}</td>
                            <td className={`p-2 font-semibold ${program.statusClass}`}>{program.status}</td>
                            <td className="p-2">{program.content}</td>
                            <td className="p-2 text-center">
                                <FaEllipsisH className="cursor-pointer text-gray-500" />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {isAddTourModalOpen && <ModalAddSaleProgram onClose={toggleAddTourModal} />}
            </div>
        </Layout>
    );
}