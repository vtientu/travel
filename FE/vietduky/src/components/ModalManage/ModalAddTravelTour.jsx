import { useState } from "react";
import TextEditor from "../../lib/TextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowRight } from "react-icons/fa";

export default function ModalAddTravelTour({ onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form>
          <div className="flex gap-6">
            {/* Cột trái */}
            <div>
              <h2 className="text-lg font-semibold">Thêm Travel Tour</h2>
              <h6 className="text-sm mb-4">
                Quản trị viên thêm Travel Tour trong Tour
              </h6>
              <div className="flex items-center gap-4">
                {/* Ngày khởi hành */}
                <div>
                  <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                    Ngày khởi hành
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn ngày khởi hành"
                    className="w-[230px] p-2 border rounded text-gray-500"
                  />
                </div>

                {/* Mũi tên */}
                <FaArrowRight className="text-gray-400 text-lg" />

                {/* Ngày về */}
                <div>
                  <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                    Ngày về
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn ngày về"
                    className="w-[230px] p-2 border rounded text-gray-500"
                  />
                </div>
              </div>

              {/* Số ngày */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                Số lượng người
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded mb-4"
                placeholder="Nhập số lượng người"
                required
              />

              {/* Giá tour */}
              <label className="block mb-2 font-medium before:content-['*'] before:text-red-500 before:mr-1">
                Giá Travel Tour
              </label>
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
