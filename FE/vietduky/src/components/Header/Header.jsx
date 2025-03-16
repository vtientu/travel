import ModalLogin from "../LoginForm/ModalLogin";
import { StorageService } from "@/services/storage/StorageService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [avatar, setAvatar] = useState("/Image/avatar.png"); // Ảnh mặc định
  const [user, setUser] = useState(null);

  // Lấy thông tin user khi component mount
  useEffect(() => {
    const storedUser = StorageService.getUser();
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.avatar) setAvatar(storedUser.avatar);
    }
  }, []);

  // Xử lý đăng xuất
  const handleSignout = () => {
    StorageService.signout(navigate);
    setUser(null);
    setAvatar("/Image/avatar.png");
    setIsOpenMenu(false);
  };

  return (
    <header className="bg-red-700 text-white py-4 px-6 flex items-center justify-between relative">
      <img
        src="/Image/Logo.png"
        alt="Viet Du Ky"
        width={150}
        height={100}
        onClick={() => navigate("/")}
      />
      <div className="flex items-center space-x-6">
        <nav className="flex space-x-16">
          <a href="/" className="hover:underline text-white">
            Trang Chủ
          </a>
          <a href="#" className="hover:underline text-white">
            Du lịch trọn gói
          </a>
          <a href="#" className="hover:underline text-white">
            Hợp tác với chúng tôi
          </a>
          <a href="#" className="hover:underline text-white">
            Hỗ Trợ
          </a>
        </nav>

        {/* Ảnh Avatar mở menu */}
        <div className="relative">
          <img
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            src={avatar}
            alt="Avatar"
            width={50}
            height={50}
            className="rounded-full cursor-pointer border-2 border-transparent hover:border-white transition"
          />

          {/* Dropdown menu */}
          {isOpenMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-50">
              {user ? (
                <>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => navigate("/profile")}
                  >
                    Trang cá nhân
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleSignout}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setIsOpenLogin(true);
                    setIsOpenMenu(false);
                  }}
                >
                  Đăng nhập
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal đăng nhập */}
        {isOpenLogin && <ModalLogin onClose={() => setIsOpenLogin(false)} />}
      </div>
    </header>
  );
}
