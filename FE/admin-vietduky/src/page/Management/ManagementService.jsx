import { useState } from "react";
import Layout from "../../layouts/LayoutManagement";
import { LuSearch } from "react-icons/lu";
import ModalAddService from "../../components/ModalManage/ModalAddService.jsx";

export default function ManagementService() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locations, setLocations] = useState([]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleSuccess = (newLocation) => {
        setLocations((prev) => [...prev, newLocation]);
    };
    // Dữ liệu dịch vụ mẫu
    const services = [
        { name: "Xe cộ", description: "Lorem Ipsum is dolor sit amet" },
        { name: "eSim", description: "Lorem Ipsum is dolor sit amet" }
    ];

    return (
        <Layout title="Quản lý Dịch vụ">
            <div className="p-4 bg-white rounded-md">
                {/* Thanh tìm kiếm và nút hành động */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1">
                        <LuSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bằng từ khóa"
                            className="pl-10 pr-4 py-2 border rounded-md w-auto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="border border-red-600 text-red-600 px-4 py-2 rounded-md">
                        Nhập d.sách dịch vụ
                    </button>
                    <button
                        className="bg-red-700 text-white px-4 py-2 rounded-md shadow-md"
                        onClick={toggleModal}
                    >
                        Thêm dịch vụ
                    </button>
                </div>

                {/* Bảng danh sách dịch vụ */}
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-left text-gray-700">
                        <th className="p-2">Tên dịch vụ</th>
                        <th className="p-2">Mô tả dịch vụ</th>
                        <th className="p-2 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {services.map((service, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-2">{service.name}</td>
                            <td className="p-2">{service.description}</td>
                            <td className="p-2 text-right">...</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {isModalOpen && (
                    <ModalAddService onClose={toggleModal} onSuccess={handleSuccess} />
                )}
            </div>
        </Layout>
    );
}