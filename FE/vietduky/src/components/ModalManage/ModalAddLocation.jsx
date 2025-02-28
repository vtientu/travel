import { useState } from "react";

export default function ModalAddLocation({ onClose }) {
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(""); // Lưu lỗi nếu có

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!locationName.trim()) {
      setError("Tên địa điểm không được để trống!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/location/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: locationName.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Thêm địa điểm thành công!");
        setLocationName("");
        setDescription("");
        onClose();
        window.location.reload();
      } else {
        setError(data.message || "Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (err) {
      setError("Không thể kết nối đến API!");
    } finally {
      setLoading(false);
    }
  };
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-1/4 p-6">
          <form onSubmit={handleSubmit}>
            <div className="relative pb-3">
              <h2 className="text-lg font-semibold">Thêm địa điểm</h2>
              <p className="text-gray-500 mb-4">Quản trị viên thêm địa điểm cho Tour</p>
              <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div>
              {/* Tên địa điểm */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Tên địa điểm</label>
                <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="Nhập tên địa điểm"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    required
                />
              </div>

              {/* Mô tả */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Mô tả</label>
                <textarea
                    className="w-full border rounded p-2"
                    rows="3"
                    placeholder="Nhập mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
              </div>
            </div>

            {/* Button Actions */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                  type="button"
                  className="hover:bg-gray-300 hover:text-white border border-solid border-gray-300 px-4 py-2 rounded-md"
                  onClick={onClose}
                  disabled={loading}
              >
                Hủy
              </button>
              <button
                  type="submit"
                  className="bg-red-700 text-white px-4 py-2 rounded-md"
                  disabled={loading}
              >
                {loading ? "Đang gửi..." : "Tạo mới"}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
