import { useEffect, useState } from "react";
import Layout from "../../layouts/LayoutManagement";
import { LuSearch } from "react-icons/lu";
import ModalAddTheme from "../../components/ModalManage/ModalAdd/ModalAddTheme.jsx";
import { getTopics, updateTopic } from "../../services/API/topic.service.js"; // ✅ THÊM updateTopic

export default function ManagementTour() {
    const [isAddTourModalOpen, setIsAddTourModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [topics, setTopics] = useState([]);

    const toggleAddTourModal = () => {
        setIsAddTourModalOpen(!isAddTourModalOpen);
    };

    useEffect(() => {
        const fetchTopics = async () => {
            const data = await getTopics();
            setTopics(data.map(item => ({
                ...item,
                checked: item.active,
            })));
        };
        fetchTopics();
    }, []);

    // ✅ HÀM ĐỔI TRẠNG THÁI ACTIVE
    const handleToggleActive = async (topic) => {
        const updatedData = {
            name: topic.name,
            description: topic.description,
            active: !topic.active,
        };

        try {
            await updateTopic(topic.id, updatedData);
            setTopics(prev =>
                prev.map(t =>
                    t.id === topic.id
                        ? { ...t, active: !t.active, checked: !t.active }
                        : t
                )
            );
        } catch (error) {
            alert("Cập nhật trạng thái thất bại.");
            console.error(error);
        }
    };

    return (
        <Layout title="Quản lý Tour">
            <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
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

                    <div className="flex gap-3">
                        <button className="border border-red-700 text-red-700 px-4 py-2 rounded-md">
                            Nhập danh sách chủ đề
                        </button>
                        <button
                            className="bg-red-700 text-white px-4 py-2 rounded-md shadow-md"
                            onClick={toggleAddTourModal}
                        >
                            Thêm chủ đề mới
                        </button>
                    </div>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                    <tr className="border-b text-gray-700">
                        <th className="p-2 text-left">Tên chủ đề</th>
                        <th className="p-2 text-left">Trạng thái</th>
                        <th className="p-2 text-left">Mô tả chủ đề</th>
                        <th className="p-2 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topics
                        .filter(topic =>
                            topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            topic.description.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((topic) => (
                            <tr key={topic.id} className="border-t text-gray-900">
                                <td className="p-2">{topic.name}</td>
                                <td className="p-2">
                                    <input
                                        type="checkbox"
                                        checked={topic.active}
                                        onChange={() => handleToggleActive(topic)}
                                        className="accent-red-700 cursor-pointer"
                                    />
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
