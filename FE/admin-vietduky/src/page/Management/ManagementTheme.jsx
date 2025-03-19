import {useState } from "react";
import Layout from "../../layouts/LayoutManagement";
import { LuSearch } from "react-icons/lu";

import ModalAddTheme from "../../components/ModalManage/ModalAddTheme.jsx";

export default function ManagementTour() {

    const [isAddTourModalOpen, setIsAddTourModalOpen] = useState(false); // Modal thêm Tour

    // Mở/đóng modal thêm Tour
    const toggleAddTourModal = () => {
        setIsAddTourModalOpen(!isAddTourModalOpen);
    };

    // Mở/đóng modal quản lý hành trình
    const [searchTerm, setSearchTerm] = useState("");
    const [topics] = useState([
        { id: 1, name: "Tour du lịch Lễ 30/4", description: "Lorem Ipsum is dabet isum", checked: true },
        { id: 2, name: "Tour du lịch hành hương", description: "Lorem Ipsum is dabet isum", checked: true },
    ]);
    return (
        <Layout title="Quản lý Tour">
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Thanh tìm kiếm và nút chức năng */}
                <div className="flex items-center justify-between mb-4">
                    {/* Ô tìm kiếm */}
                    <div className="relative flex-1 max-w-xs">
                        <LuSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bằng từ khóa"
                            className="pl-10 pr-4 py-2 border rounded-md w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Nút thao tác */}
                    <div className="flex gap-3">
                        <button className="border border-red-700 text-red-700 px-4 py-2 rounded-md">
                            Nhập danh sách chủ đề
                        </button>
                        {/* Nút thêm chủ đề */}
                        <button
                            className="bg-red-700 text-white px-4 py-2 rounded-md shadow-md"
                            onClick={toggleAddTourModal}
                        >
                            Thêm chủ đề mới
                        </button>
                    </div>
                </div>

                {/* Bảng danh sách chủ đề */}
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="border-b text-gray-700">
                        <th className="p-2 text-left">Tên chủ đề</th>
                        <th className="p-2 text-left">Tên chủ đề</th>
                        <th className="p-2 text-left">Mô tả chủ đề</th>
                        <th className="p-2 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topics.map((topic) => (
                        <tr key={topic.id} className="border-t text-gray-900">
                            <td className="p-2">{topic.name}</td>
                            <td className="p-2">
                                <input type="checkbox" checked={topic.checked} readOnly className="accent-red-700" />
                            </td>
                            <td className="p-2">{topic.description}</td>
                            <td className="p-2 text-right">
                                <button className="text-gray-600">⋯</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {isAddTourModalOpen && <ModalAddTheme onClose={toggleAddTourModal} />}
            </div>
        </Layout>
    );
}