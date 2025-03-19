import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout from "../../../layouts/LayoutManagement";
import ModalAddUser from "../../../components/ModalManage/ModalUser/ModalAddUser.jsx";
import ModalAddTourGuide from "../../../components/ModalManage/ModalUser/ModalAddTourGuide.jsx";

export default function ManagementTourGuide() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users] = useState([
        { email: "sapoxdcwaeqweqwe@gmail.com", name: "Phạm Đức Mạnh A",gender:"Nam", dob:"21/06/2002", phonenumber: "0987654321", status: "Hoạt động" },
        { email: "sapoxdcwaeqweqwe@gmail.com", name: "Phạm Đức Mạnh B",gender:"Nam", dob:"21/06/2002", phonenumber: "0987654321", status: "Chặn truy cập" },
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
                        <th className="p-2">Giới tính</th>
                        <th className="p-2">Ngày sinh</th>
                        <th className="p-2">Số điện thoại</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-2 truncate max-w-xs">{user.email}</td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.gender}</td>
                            <td className="p-2">{user.dob}</td>
                            <td className="p-2">{user.phonenumber}</td>
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
                {isAddTourModalOpen && <ModalAddTourGuide onClose={toggleAddTourModal} />}
            </div>
        </Layout>
    );
}
