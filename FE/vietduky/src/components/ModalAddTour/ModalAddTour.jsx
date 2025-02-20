export default function ModalAddTour({ onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">Thêm Tour du lịch</h2>
          <form>
            <label className="block mb-2">Tên Tour</label>
            <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Nhập tên tour" />
  
            <label className="block mb-2">Điểm khởi hành</label>
            <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Chọn điểm khởi hành" />
  
            <label className="block mb-2">Điểm đến</label>
            <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Chọn điểm đến" />
  
            <div className="flex justify-end gap-4">
              <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Hủy</button>
              <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded">Tạo Tour mới</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  