import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("GoogleSuccess Mounted"); // 🔥 Kiểm tra xem component có chạy lại không

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      console.log("Token received:", token);
      localStorage.setItem("token", token);

      // Delay 100ms để đảm bảo token đã lưu trước khi redirect
      setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 100);
    } else {
      console.error("No token found, redirecting to login...");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <div>Đang xác thực, vui lòng đợi...</div>;
}
