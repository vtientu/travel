import { X, Plane } from "lucide-react";

export default function ModalLogin({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        {/* Nút đóng modal */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Nội dung modal */}
        <div className="relative text-center">
          <Plane className="absolute -top-6 left-2 text-red-500" size={24} />
          <h2 className="text-lg font-semibold text-black">Chào mừng đến với VietDuKy</h2>
          <p className="text-sm text-gray-500">
            Đăng nhập bằng tài khoản Google của bạn
          </p>
        </div>

        {/* Các nút đăng nhập */}
        <div className="mt-4 space-y-3">
          <button className="w-full flex items-center gap-2 bg-white border border-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-100">
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
            Đăng nhập bằng Google
          </button>
          <button className="w-full flex items-center gap-2 bg-white border border-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-100">
            <img src="/icons/phone.svg" alt="Phone" className="w-5 h-5" />
            Đăng nhập bằng số điện thoại
          </button>
          <button className="w-full flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
            Đăng nhập bằng Facebook
          </button>
          <button className="w-full flex items-center gap-2 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900">
            <img src="/icons/apple.svg" alt="Apple" className="w-5 h-5" />
            Đăng nhập bằng Apple
          </button>
        </div>
      </div>
    </div>
  );
}
