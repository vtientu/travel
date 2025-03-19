import { useEffect, useState } from "react";
import Layout from "../../layouts/LayoutManagement";
import { LuSearch } from "react-icons/lu";
import { getTours } from "../../services/API/tour.service";
import ModalAddVocher from "../../components/ModalManage/ModalAddVocher.jsx";

export default function ManagementDiscount() {
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
    const discounts = [
        {
            code: "HELLOSGCAVN", value: "500.000 VNĐ", percent: 30, amount: 30,
            startDate: "13/03/2025", endDate: "13/04/2025", status: "Còn hạn"
        },
        {
            code: "HELLOSGCAVN", value: "100.000 VNĐ", percent: 100, amount: 100,
            startDate: "13/03/2025", endDate: "13/04/2025", status: "Hết hạn"
        },
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
                        Nhập d.sách mã giảm giá
                    </button>
                    <button className="bg-red-700 text-white px-4 py-2 rounded-md" onClick={toggleAddTourModal}>
                        Thêm mã giảm giá
                    </button>
                </div>

                {/* Bảng danh sách mã giảm giá */}
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-left text-gray-700">
                        <th className="p-2">Mã giảm giá</th>
                        <th className="p-2">Giá trị giảm giá</th>
                        <th className="p-2">% giảm giá</th>
                        <th className="p-2">Số lượng</th>
                        <th className="p-2">Ngày bắt đầu</th>
                        <th className="p-2">Ngày kết thúc</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {discounts.map((discount, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-2">{discount.code}</td>
                            <td className="p-2">{discount.value}</td>
                            <td className="p-2">{discount.percent}</td>
                            <td className="p-2">{discount.amount}</td>
                            <td className="p-2">{discount.startDate}</td>
                            <td className="p-2">{discount.endDate}</td>
                            <td className="p-2">
                                <span className={discount.status === "Còn hạn" ? "text-green-600" : "text-red-600"}>
                                    {discount.status}
                                </span>
                            </td>
                            <td className="p-2 text-right">...</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {isAddTourModalOpen && <ModalAddVocher onClose={toggleAddTourModal} />}
            </div>
        </Layout>
    );
}