import Icons from "../Icons/Icon";
import ModalLogin from "../ModalLogin/ModalLogin";
import { StorageService } from "@/services/storage/StorageService";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  const navigate = useNavigate();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [avatar, setAvatar] = useState(Icons.User);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null); // Tạo ref cho menu

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
    setAvatar(Icons.User);
    setIsOpenMenu(false);
  };

  // Hàm xử lý click vào avatar
  const handleAvatarClick = () => {
    if (user) {
      setIsOpenMenu(!isOpenMenu);
    } else {
      setIsOpenLogin(true);
    }
  };

  // Đóng menu khi click ra ngoài
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-red-700 text-white py-4 px-6 flex items-center justify-between relative">
      <img
        src="/Image/Logo.png"
        alt="Viet Du Ky"
        width={150}
        height={100}
        onClick={() => navigate("/")}
        className="cursor-pointer transition duration-300 hover:scale-105"
      />
      <div className="flex items-center">
        <nav className="flex space-x-16">
          <a href="/" className="hover:underline text-white">
            Trang Chủ
          </a>
          <a href="/listTour" className="hover:underline text-white">
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
        <div className="relative ml-16" ref={menuRef}> {/* Gán ref vào div này */}
          <img
            onClick={handleAvatarClick}
            src={avatar}
            alt="Avatar"
            width={user ? 45 : 30}
            height={user ? 45 : 30}
            className={`rounded-full cursor-pointer transition duration-300 ${
              user
                ? ""
                : "hover:filter hover:invert hover:sepia hover:saturate hover:hue-rotate-180"
            }`}
          />

          {/* Dropdown menu */}
          {isOpenMenu && (
            <div className="absolute right-0 mt-2 w-96 bg-white text-black rounded-md border border-gray-300 shadow-lg z-50">
              {user ? (
                <HeaderMenu user={user} handleSignout={handleSignout}/>
              ) : (
                <></>
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