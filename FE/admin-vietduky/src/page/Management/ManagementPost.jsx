import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import Layout from "../../layouts/LayoutManagement.jsx";
import { BsPencil, BsTrash } from "react-icons/bs";
import ModalAddPost from "../../components/ModalManage/ModalNews/ModalAddPost.jsx";

export default function ManagementPost() {
    const [searchTerm, setSearchTerm] = useState("");
    const [posts, setPosts] = useState([
        {
            id: 1,
            category: "Sự kiện",
            title: "Chấm thi trắc nghiệm tự động",
            slug: "cham-thi-trac-nghiem",
            featured: true,
            status: "Hoạt động",
            selected: true,
        },
        {
            id: 2,
            category: "Công nghệ",
            title: "Giải pháp chấm thi cho giáo dục",
            slug: "giai-phap-cham-thi",
            featured: true,
            status: "Khóa",
            selected: true,
        },
    ]);
    const [selectedPosts, setSelectedPosts] = useState(posts.map(() => false));
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {
        const newState = !selectAll;
        setSelectAll(newState);
        setSelectedPosts(posts.map(() => newState));
    };

    const handleSelectPost = (index) => {
        const newSelectedPosts = [...selectedPosts];
        newSelectedPosts[index] = !newSelectedPosts[index];
        setSelectedPosts(newSelectedPosts);
        setSelectAll(newSelectedPosts.every((selected) => selected));
    };

    return (
        <Layout title="Quản lý Tài Khoản">
            <div className="p-4 bg-white rounded-md">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1">
                        <LuSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bằng từ khóa"
                            className="pl-10 pr-4 py-2 border rounded-md w-80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition">
                        Xóa bài viết
                    </button>
                    <button className="bg-red-700 text-white px-4 py-2 rounded-md" onClick={() => {}}>
                        Thêm bài viết
                    </button>
                </div>

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
                        <th className="p-2">Danh mục</th>
                        <th className="p-2">Tên bài viết</th>
                        <th className="p-2">Đường dẫn</th>
                        <th className="p-2">Bài nổi bật</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id} className="border-t">
                            <td className="p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedPosts[index]}
                                    onChange={() => handleSelectPost(index)}
                                    className="accent-red-700"
                                />
                            </td>
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{post.category}</td>
                            <td className="p-2">{post.title}</td>
                            <td className="p-2 truncate max-w-xs">{post.slug}</td>
                            <td className="p-2 text-center">
                                <input
                                    type="checkbox"
                                    defaultChecked={post.featured}
                                    className="accent-red-700"
                                />
                            </td>
                            <td className={`p-2 ${post.status === "Hoạt động" ? "text-green-600" : "text-red-600"}`}>
                                {post.status}
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
        </Layout>
    );
}