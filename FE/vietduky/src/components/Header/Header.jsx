import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalLogin from "../LoginForm/ModalLogin";

export default function Header() {
  const navigate = useNavigate();
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  return (
    <header className="bg-red-700 text-white py-4 px-6 flex items-center justify-between">
      <img
        src="/Image/Logo.png"
        alt="Viet Du Ky"
        width={150}
        height={100}
        onClick={() => navigate("/")}
      />
      <div className="flex items-center space-x-6">
        <nav className="flex space-x-16">
          <a href="/" className="hover:underline text-white">Trang Chủ</a>
          <a href="#" className="hover:underline text-white">Du lịch trọn gói</a>
          <a href="#" className="hover:underline text-white">Hợp tác với chúng tôi</a>
          <a href="#" className="hover:underline text-white">Hỗ Trợ</a>
        </nav>
        
        {/* Ảnh Avatar mở modal */}
        <img
          onClick={() => setIsOpenLogin(true)}
          src="/Image/avatar.png"
          alt="Avatar"
          width={50}
          height={50}
          className="rounded-full cursor-pointer border-2 border-transparent hover:border-white transition"
        />
        
        {/* Modal đăng nhập */}
        {isOpenLogin && <ModalLogin onClose={() => setIsOpenLogin(false)} />}
      </div>
    </header>
  );
}
