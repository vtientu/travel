import { AuthService } from "@/services/API/auth.service";
import { StorageService } from "@/services/storage/StorageService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getProfile()
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        StorageService.signout(); // Nếu lỗi, đăng xuất
        navigate("/login");
      });
  }, [navigate]);

  if (!user) {
    return <div>Đang tải thông tin...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Thông tin cá nhân</h1>
      <img
        src={user.avatar || "https://via.placeholder.com/150"}
        alt="Avatar"
        style={{ borderRadius: "50%", width: "150px", height: "150px" }}
      />
      <h2>{user.email}</h2>
      <p>Vai trò: {user.role_id === 1 ? "Người dùng" : "Quản trị viên"}</p>
      <button onClick={() => StorageService.signout()}>Đăng xuất</button>
    </div>
  );
}
