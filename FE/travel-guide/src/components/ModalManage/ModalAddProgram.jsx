import { useState } from "react";
import { HiOutlineInbox, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import {createTourActivity} from "../../services/API/activity_tour.service.js";

export default function ModalAddProgram({ tour, onClose, onAddTravelTour }) {
    const [submittedPrograms, setSubmittedPrograms] = useState([]);
    const [programs, setPrograms] = useState([
        { day: "", title: "", description: "", image: null, preview: null },
    ]);

    const handleChange = (index, field, value) => {
        const updated = [...programs];
        updated[index][field] = value;
        setPrograms(updated);
    };

    const handleImageChange = (index, file) => {
        const updated = [...programs];
        updated[index].image = file;
        updated[index].preview = file ? URL.createObjectURL(file) : null;
        setPrograms(updated);
    };

    const handleRemoveImage = (index) => {
        const updated = [...programs];
        updated[index].image = null;
        updated[index].preview = null;
        setPrograms(updated);
    };

    const handleAddProgram = () => {
        setPrograms([
            ...programs,
            { day: "", title: "", description: "", image: null, preview: null },
        ]);
    };

    const handleRemoveProgram = (index) => {
        const updated = [...programs];
        updated.splice(index, 1);
        setPrograms(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasInvalid = programs.some(
            (p) =>
                !p.day.trim() ||
                isNaN(p.day) ||
                Number(p.day) <= 0 ||
                !p.title.trim() ||
                !p.description.trim() ||
                !p.image
        );
        if (hasInvalid) {
            alert("Vui lòng nhập đúng ngày (số dương), tiêu đề, mô tả và ảnh.");
            return;
        }

        // Kiểm tra ngày trùng trong form
        const days = programs.map((p) => Number(p.day));
        const hasDuplicateDay = days.some((day, index) => days.indexOf(day) !== index);
        if (hasDuplicateDay) {
            alert("Không được nhập trùng ngày trong các chương trình.");
            return;
        }

        try {
            const submitted = [];

            for (let i = 0; i < programs.length; i++) {
                const prog = programs[i];
                const dayNumber = Number(prog.day);

                const formData = new FormData();
                formData.append("tour_id", tour.id);
                formData.append("day", dayNumber);
                formData.append("title", prog.title);
                formData.append("description", prog.description);
                formData.append("detail", prog.day); // giữ nguyên nếu cần ghi detail
                formData.append("image", prog.image);

                console.log(`📤 Gửi chương trình ngày ${dayNumber}`);
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}:`, value);
                }

                const response = await createTourActivity(formData);
                submitted.push({ ...prog, imageUrl: response?.data?.image });
            }

            alert("Tạo chương trình tour thành công!");
            setSubmittedPrograms((prev) => [...prev, ...submitted]);
            setPrograms([{ day: "", title: "", description: "", image: null, preview: null }]);
            onAddTravelTour(submitted);
        } catch (error) {
            console.error("🔥 Lỗi từ backend:", error.response?.data || error);
            alert(error.response?.data?.message || "Tạo chương trình tour thất bại.");
        }
    };


    const handleWrapperClick = () => {
        onClose();
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[9999]"
            onClick={handleWrapperClick}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[1000px] max-h-[90vh] overflow-y-auto"
                onClick={handleModalClick}
            >
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-lg font-semibold">Thêm chương trình</h2>
                            <p className="text-sm text-gray-600">
                                Cho Tour: <span className="text-red-700 font-medium">{tour?.name_tour || "Chưa chọn tour"}</span>
                            </p>
                        </div>
                        <button
                            type="button"
                            className="bg-red-700 text-white px-4 py-2 rounded-md"
                            onClick={handleAddProgram}
                        >
                            ➕ Thêm chương trình
                        </button>
                    </div>

                    <div className="mt-4 mb-4">
                        <table className="w-full border-collapse border rounded-lg shadow bg-white">
                            <thead className="bg-gray-100 text-sm text-gray-600">
                            <tr>
                                <th className="p-2">Ngày</th>
                                <th className="p-2">Tiêu đề</th>
                                <th className="p-2">Mô tả chi tiết</th>
                                <th className="p-2">Ảnh</th>
                                <th className="p-2">Xóa</th>
                            </tr>
                            </thead>
                            <tbody>
                            {programs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center">
                                        <div className="flex flex-col items-center h-[160px]">
                                            <div className="p-4 bg-gray-100 rounded-full mb-2">
                                                <HiOutlineInbox className="text-4xl text-gray-600" />
                                            </div>
                                            <p className="text-gray-600 text-md">
                                                Chưa có hành trình nào
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                programs.map((prog, idx) => (
                                    <tr key={idx} className="border-t text-center align-top">
                                        <td className="p-2">
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="VD: 1"
                                                value={prog.day}
                                                onChange={(e) => handleChange(idx, "day", e.target.value)}
                                                className="w-full px-2 py-1 border rounded"
                                                required
                                            />

                                        </td>
                                        <td className="p-2">
                                            <input
                                                type="text"
                                                placeholder="Nhập tiêu đề"
                                                value={prog.title}
                                                onChange={(e) =>
                                                    handleChange(idx, "title", e.target.value)
                                                }
                                                className="w-full px-2 py-1 border rounded"
                                                required
                                            />
                                        </td>
                                        <td className="p-2">
                        <textarea
                            placeholder="Mô tả chi tiết"
                            value={prog.description}
                            onChange={(e) =>
                                handleChange(idx, "description", e.target.value)
                            }
                            rows={2}
                            className="w-full px-2 py-1 border rounded"
                            required
                        />
                                        </td>
                                        <td className="p-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleImageChange(idx, e.target.files[0])
                                                }
                                                className="w-full text-sm"
                                            />
                                            {prog.preview && (
                                                <div className="relative mt-1">
                                                    <img
                                                        src={prog.preview}
                                                        alt="preview"
                                                        className="w-28 h-20 object-cover rounded shadow"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(idx)}
                                                        className="absolute top-0 right-0 bg-white rounded-full shadow p-[2px]"
                                                    >
                                                        <HiOutlineX className="text-red-500" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProgram(idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <HiOutlineTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                        {submittedPrograms.length > 0 && (
                            <div className="mt-6 border-t pt-4">
                                <h3 className="text-md font-semibold text-gray-700 mb-2">Chương trình đã tạo</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    {submittedPrograms.map((p, idx) => (
                                        <li key={idx}>
                                            <strong>Ngày {p.day}</strong>: {p.title} – {p.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                    <div className="flex justify-end gap-4">
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
                            Lưu & Đóng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
