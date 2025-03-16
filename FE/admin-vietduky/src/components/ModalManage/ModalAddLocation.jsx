import { useState } from "react";
import { createLocation } from "../../services/API/location.service";

export default function ModalAddLocation({ onClose, onSuccess }) {
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newLocation = {
        name: locationName,
      };
      const response = await createLocation(newLocation);
      alert("Thêm vị trí thành công");
      onSuccess(response);
      onClose();
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      console.log("Lỗi khi thêm vị trí", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/4 p-6">
        <form onSubmit={handleSubmit}>
          <div className="relative pb-3">
            {/* Tiêu đề và mô tả */}
            <div>
              <h2 className="text-lg font-semibold">Thêm vị trí</h2>
              <p className="text-gray-500 mb-4">
                Quản trị viên thêm vị trí cho Tour
              </p>
            </div>

            {/* Nút đóng ở góc trên cùng bên phải */}
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          <div>
            {/* Tên vị trí */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Tên vị trí</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Nhập tên vị trí"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
              />
            </div>

            {/* Mô tả */}
            {/* <div className="mb-4">
              <label className="block font-medium mb-1">Mô tả</label>
              <textarea
                className="w-full border rounded p-2"
                rows="3"
                placeholder="Nhập mô tả"
                value={description}
                // onChange={(e) => setDescription(e.target.value)}
              />
            </div> */}
          </div>
          {/* Button Actions */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="hover:bg-gray-300 hover:text-white border border-solid border-gray-300 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Tạo mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
