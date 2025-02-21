import TextEditor from "../../lib/TextEditor";
import { FaArrowRight } from "react-icons/fa";

export default function ModalAddTravelTour({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg  ">
        <form>
          <div className="flex gap-6">
            {/* Cột trái */}
            <div>
              <h2 className="text-lg font-semibold">Thêm Travel Tour</h2>
              <h6 className="text-sm mb-4">
                Quản trị viên thêm Travel Tour trong Tour
              </h6>
              {/* Tên Tour */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Tour</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nhập tên tour"
                required
              />
              <div className="flex items-center gap-4">
                {/* Điểm khởi hành */}
                <div>
                  <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1 ">
                    Ngày khởi hành
                  </label>
                  <select className="w-[230px] p-2 border rounded text-gray-500">
                    <option value="" disabled selected>
                      Chọn ngày khởi hành
                    </option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                </div>

                {/* Mũi tên */}
                <FaArrowRight className="text-gray-400 text-lg" />

                {/* Điểm đến */}
                <div>
                  <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Ngày về</label>
                  <select className="w-[230px] p-2 border rounded text-gray-500">
                    <option value="" disabled selected>
                      Chọn ngày về
                    </option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                </div>
              </div>

            {/* Số ngày */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Số lượng người</label>
              <input
                type="number"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nhập số lượng người"
                required
              />

            {/* Giá tour */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Giá Travel Tour</label>
              <input
                type="number"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nhập giá Travel Tour"
                required
              />
            </div>
          </div>

          {/* Button Actions */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded"
            >
              Tạo Tour mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
