import TextEditor from "../../lib/TextEditor";
import { FaArrowRight } from "react-icons/fa";

export default function ModalAddTour({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 ">
        <form>
          <div className="flex gap-6">
            {/* Cột trái */}
            <div className="w-2/5 ">
              <h2 className="text-lg font-semibold">Thêm Tour du lịch</h2>
              <h6 className="text-sm mb-4">
                Quản trị viên thêm Tour du lịch mới
              </h6>
              {/* Tên Tour */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Tên Tour</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nhập tên tour"
                required
              />
              <div className="flex items-center gap-4">
                {/* Điểm khởi hành */}
                <div>
                  <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                    Điểm khởi hành
                  </label>
                  <select className="w-[230px] p-2 border rounded text-gray-500">
                    <option value="" disabled selected>
                      Chọn điểm khởi hành
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
                  <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Điểm đến</label>
                  <select className="w-[230px] p-2 border rounded text-gray-500">
                    <option value="" disabled selected>
                      Chọn điểm đến
                    </option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                </div>
              </div>

            {/* Số ngày */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Số ngày</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nhập số ngày"
                required
              />

            {/* Giá tour */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Giá tour</label>
              <input
                type="number"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nhập giá tour"
                required
              />

            {/* Số lượng người */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Số lượng người</label>
              <input
                type="number"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nhập số lượng người"
                required
              />
            
            {/* Ảnh minh họa */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Ảnh minh họa</label>
              <label className="w-full h-[75px] p-2 border rounded mb-4 bg-gray-300 cursor-pointer flex flex-col items-center justify-center border-dashed">
                <span>Kéo & thả ảnh Tour tại đây (.png; .jpg; .pdf)</span>
                <input type="file" className="hidden" required />
              </label>
            </div>

            {/* Cột phải */}
            <div className="w-3/5">
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">Mô tả hành trình</label>
              <span className="bg-red-700 text-white font-medium text-sm w-full p-2 rounded block mb-4">
                | Vui lòng điền tiêu đề
              </span>
              <TextEditor />

              <button className="bg-gray-100 text-black mt-7 px-3 py-1.5 rounded ">
                Thêm mô tả
              </button>
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
