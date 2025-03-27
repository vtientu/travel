import TextEditor from "../../lib/TextEditor.jsx";
import { useState } from "react";

export default function ModalAddProgram({ onClose, onAddTravelTour }) {
    const [previewImage, setPreviewImage] = useState(null);
    const [programData, setProgramData] = useState({
        day: "",
        title: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgramData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (value) => {
        setProgramData((prev) => ({ ...prev, description: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProgramData((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!programData.title || !programData.description) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        onAddTravelTour(programData); // ✅ gọi callback
        onClose(); // đóng modal
    };

    const handleWrapperClick = () => {
        onClose();
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[9999]" onClick={handleWrapperClick}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/7 h-3/6" onClick={handleModalClick}>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-6">
                        {/* Cột trái */}
                        <div className="w-2/5">
                            <h2 className="text-lg font-semibold">Thêm chương trình</h2>
                            <h6 className="text-sm mb-4 text-SmokyGray">
                                Quản trị viên thêm chương trình Tour
                            </h6>

                            {/* Ngày */}
                            <label className="block mb-2 font-medium">
                                Ngày
                            </label>
                            <input
                                type="text"
                                name="day"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="VD: Ngày 1"
                                value={programData.day}
                                onChange={handleChange}
                            />

                            {/* Tiêu đề */}
                            <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                                Tiêu đề
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Nhập tiêu đề"
                                value={programData.title}
                                onChange={handleChange}
                                required
                            />

                            {/* Ảnh minh họa */}
                            <label className="block mb-2 font-medium">
                                Ảnh minh họa
                            </label>
                            <input
                                type="file"
                                className="w-full border p-2 rounded mb-4"
                                onChange={handleImageChange}
                            />
                            {previewImage && (
                                <div className="mt-2">
                                    <img
                                        src={previewImage}
                                        alt="Xem trước ảnh minh họa"
                                        className="h-40 w-full object-cover rounded shadow"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Cột phải */}
                        <div className="w-3/5">
                            <label className="block mb-2 font-medium">Mô tả hành trình</label>
                            <TextEditor
                                value={programData.description}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>

                    {/* Button Actions */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded-md"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-red-700 text-white px-4 py-2 rounded-md"
                        >
                            Lưu & tiếp tục
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}