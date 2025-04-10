import { useState } from "react";
import { FiUpload } from "react-icons/fi";

export default function ModalSharePost({ isOpen, onClose }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    imageUrl: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Xử lý lưu bài viết ở đây
    console.log(form);
    onClose(); // đóng modal sau khi lưu
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg max-w-4xl w-full p-6 relative">
        <button
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Thêm bài viết chia sẻ</h2>
        <p className="text-sm text-gray-500 mb-6">Quản trị viên thêm bài viết mới</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">* Tên bài viết</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                placeholder="Nhập tên bài viết"
              />
            </div>

            <div>
              <label className="text-sm font-medium">* Đường dẫn</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                placeholder="Đường dẫn"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Ảnh bìa</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder="Đường dẫn ảnh bìa"
                />
                <button className="p-2 bg-gray-100 rounded border">
                  <FiUpload />
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Tập tin đính kèm</label>
              <div className="flex items-center gap-2 mt-1">
                <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
                  <FiUpload />
                  Tải lên
                </button>
              </div>
            </div>
          </div>

          {/* Soạn thảo nội dung */}
          <div className="flex flex-col h-full">
            <label className="text-sm font-medium mb-1">Bài viết</label>
            <div className="border rounded flex-1 flex flex-col overflow-hidden">
              {/* Thanh công cụ đơn giản */}
              <div className="border-b p-2 flex gap-2 text-sm items-center bg-gray-50">
                <select className="text-sm border px-1 py-0.5 rounded">
                  <option>Normal text</option>
                  <option>Heading</option>
                </select>
                <button className="px-1 font-bold">B</button>
                <button className="px-1 italic">I</button>
                <button className="px-1 underline">U</button>
                <button className="px-1">•</button>
                <button className="px-1">1.</button>
                <button className="px-1">“”</button>
                <button className="px-1">📎</button>
                <button className="px-1">&lt;/&gt;</button>
              </div>
              {/* Nội dung */}
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Nhập nội dung bài viết tại đây"
                className="flex-1 p-3 text-sm resize-none focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Nút lưu & hủy */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
