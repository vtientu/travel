import { XIcon } from "lucide-react";
import { useState } from "react";

const AddCustomerInfoModal = ({ open, onClose, onSubmit }) => {
  const [singleRoom, setSingleRoom] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 overflow-hidden shadow-xl flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Thêm thông tin khách hàng</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 flex flex-col gap-1">
            <label className="text-md font-medium">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="col-span-4 flex flex-col gap-1">
            <label className="text-md font-medium">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 rounded-md p-2"
              defaultValue="Nam"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="col-span-6 flex flex-col gap-1">
            <label className="text-md font-medium">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="col-span-6 flex flex-col gap-1">
            <label className="text-md font-medium">
              Độ tuổi <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 rounded-md p-2"
              defaultValue="18"
            >
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="col-span-12 flex flex-col gap-1">
            <label className="text-md font-medium">Số điện thoại</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="col-span-12 flex flex-col gap-1">
            <label className="text-md font-medium">CCCD/ Passport</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="col-span-12 flex flex-row gap-2">
            <button
              onClick={() => setSingleRoom(!singleRoom)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                singleRoom ? "bg-[#A80F21]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  singleRoom ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <label className="text-md">Phòng đơn</label>
          </div>
          <div className="col-span-12 flex flex-row gap-2 justify-end">
            <button className="border border-gray-300 px-4 py-2 rounded-md">
              Hủy
            </button>
            <button className="border border-[#A80F21] text-[#A80F21] px-4 py-2 rounded-md">
              Lưu
            </button>
            <button className="bg-[#A80F21] text-white px-4 py-2 rounded-md">
              Lưu và tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerInfoModal;
