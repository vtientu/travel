import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout from "../../../layouts/LayoutManagement";
import ModalAddUser from "../../../components/ModalManage/ModalUser/ModalAddUser.jsx";

export default function ManagementUserRole() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([
        { email: "sapoxdcwaeqweqwe@gmail.com", name: "Phạm Đức Mạnh A", role: "Super Admin", status: "Hoạt động" },
        { email: "manhpdhe160198@fpt.edu.vn", name: "Phạm Đức Mạnh B", role: "Staff", status: "Chặn truy cập" },
    ]);
    const [isAddTourModalOpen, setIsAddTourModalOpen] = useState(false); // Modal thêm Tour

    // Mở/đóng modal thêm Tour
    const toggleAddTourModal = () => {
        setIsAddTourModalOpen(!isAddTourModalOpen);
    };
    return (
        <Layout title="Quản lý Tài Khoản">
            <div className="p-4 bg-white rounded-md">
                {/* Thanh tìm kiếm và nút thêm tài khoản */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1">
                        <LuSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bằng từ khóa"
                            className="pl-10 pr-4 py-2 border rounded-md w-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-red-700 text-white px-4 py-2 rounded-md" onClick={toggleAddTourModal}>
                        Thêm tài khoản
                    </button>
                </div>

                {/* Bảng danh sách tài khoản */}
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-left text-gray-700 border-b">
                        <th className="p-2">Tài khoản</th>
                        <th className="p-2">Họ tên</th>
                        <th className="p-2">Quyền</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-2 truncate max-w-xs">{user.email}</td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.role}</td>
                            <td className={`p-2 ${user.status === "Hoạt động" ? "text-green-600" : "text-red-600"}`}>
                                {user.status}
                            </td>
                            <td className="p-2 text-right">
                                <button className="relative">
                                    <BsThreeDotsVertical />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {isAddTourModalOpen && <ModalAddUser onClose={toggleAddTourModal} />}
            </div>
        </Layout>
    );
}
