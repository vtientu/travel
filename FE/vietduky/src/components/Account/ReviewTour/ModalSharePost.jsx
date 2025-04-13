import { PostExperienceService } from "@/services/API/post_experience.service";
import { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
// Import ReactQuill
import "react-quill/dist/quill.snow.css";

// Import Quill styles

export default function ModalSharePost({ isOpen, onClose }) {
  const [form, setForm] = useState({
    user_id: JSON.parse(localStorage.getItem("user"))?.id || "",
    title_post: "",
    slug: "",
    description_post: "",
    post_date: new Date().toISOString(),
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewURLs);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", form.user_id);
      formData.append("title_post", form.title_post);
      formData.append("slug", form.slug);
      formData.append("description_post", form.description_post);
      formData.append("post_date", form.post_date);

      // Append each selected file to formData
      selectedFiles.forEach((file) => {
        formData.append("postEx_album", file);
      });

      await PostExperienceService.createPostExperience(formData);
      toast.success("Bài viết đã được thêm, vui lòng chờ duyệt!");
    } catch (error) {
      toast.error("Lỗi khi thêm bài viết!");
      console.error("Lỗi khi đăng bài viết:", error);
    } finally {
      onClose();
      setPreviewImages([]);
      setSelectedFiles([]);
    }
  };

  console.log("Form data:", form);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg max-w-6xl w-full p-6 relative">
        <button
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Thêm bài viết chia sẻ</h2>
        <p className="text-sm text-gray-500 mb-6">
          Quản trị viên thêm bài viết mới
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">* Tên bài viết</label>
              <input
                type="text"
                name="title_post"
                value={form.title_post}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
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
                className="w-full mt-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Đường dẫn"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1">
                Tập tin đính kèm
              </label>
              <div
                className="w-full h-40 border-2 border-dashed rounded flex items-center justify-center text-gray-400 hover:border-red-600 hover:text-red-600 cursor-pointer transition"
                onClick={() =>
                  document.getElementById("hiddenFileInput").click()
                }
              >
                {previewImages.length === 0 ? (
                  <span>Click để chọn ảnh</span>
                ) : (
                  <div className="flex overflow-x-auto space-x-2 p-2">
                    {previewImages.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover border rounded shadow"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Hidden input file */}
              <input
                id="hiddenFileInput"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Soạn thảo nội dung */}
          <div className="flex flex-col h-full">
            <label className="text-sm font-medium mb-1">Bài viết</label>
            <div className="border rounded flex-1 flex flex-col overflow-hidden">
              <ReactQuill
                name="description_post"
                value={form.description_post}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, description_post: value }))
                }
                placeholder="Nhập nội dung bài viết tại đây"
                className="flex-1 text-sm resize-none focus:outline-none"
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
