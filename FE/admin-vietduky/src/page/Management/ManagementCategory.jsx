import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import Layout from "../../layouts/LayoutManagement.jsx";
import { BsPencil, BsTrash } from "react-icons/bs";
import ModalAddPost from "../../components/ModalManage/ModalNews/ModalAddPost.jsx";

export default function ManagementCategory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([
        {
            id: 1,
            category: "Sự kiện",
            slug: "cham-thi-trac-nghiem",
            status: "Hoạt động",
        },
        {
            id: 2,
            category: "Công nghệ",
            slug: "giai-phap-cham-thi",
            status: "Khóa",
        },
    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Chọn tất cả danh mục
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(categories.map((cat) => cat.id));
        }
        setSelectAll(!selectAll);
    };

    // Chọn một danh mục riêng lẻ
    const handleSelectCategory = (categoryId) => {
        const updatedSelected = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...selectedCategories, categoryId];

        setSelectedCategories(updatedSelected);
        setSelectAll(updatedSelected.length === categories.length);
    };

    // Xóa danh mục đã chọn
    const handleDeleteCategories = () => {
        if (selectedCategories.length === 0) return;
        setCategories(categories.filter((cat) => !selectedCategories.includes(cat.id)));
        setSelectedCategories([]);
        setSelectAll(false);
    };

    return (
        <Layout title="Quản lý Danh Mục">
            <div className="p-4 bg-white rounded-md">
                {/* Thanh tìm kiếm & nút hành động */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1">
                        <LuSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục"
                            className="pl-10 pr-4 py-2 border rounded-md w-80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Chỉ hiển thị nút Xóa khi có danh mục được chọn */}
                    {selectedCategories.length > 0 && (
                        <button
                            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
                            onClick={handleDeleteCategories}
                        >
                            Xóa danh mục
                        </button>
                    )}

                    <button
                        className="bg-red-700 text-white px-4 py-2 rounded-md"
                        onClick={() => setShowModal(true)}
                    >
                        Thêm danh mục
                    </button>
                </div>

                {/* Bảng danh mục */}
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-left text-gray-700 border-b">
                        <th className="p-2">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="accent-red-700"
                            />
                        </th>
                        <th className="p-2">STT</th>
                        <th className="p-2">Tên danh mục</th>
                        <th className="p-2">Đường dẫn</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((cat, index) => (
                        <tr key={cat.id} className="border-t">
                            <td className="p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat.id)}
                                    onChange={() => handleSelectCategory(cat.id)}
                                    className="accent-red-700"
                                />
                            </td>
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{cat.category}</td>
                            <td className="p-2 truncate max-w-xs">{cat.slug}</td>
                            <td className={`p-2 ${cat.status === "Hoạt động" ? "text-green-600" : "text-red-600"}`}>
                                {cat.status}
                            </td>
                            <td className="p-2 text-right flex gap-2 justify-end">
                                <button className="text-gray-600 hover:text-blue-600">
                                    <BsPencil />
                                </button>
                                <button className="text-gray-600 hover:text-red-600">
                                    <BsTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm danh mục */}
            {showModal && <ModalAddPost onClose={() => setShowModal(false)} />}
        </Layout>
    );
}
