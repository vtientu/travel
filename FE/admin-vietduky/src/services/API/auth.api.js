import restClient from "../restClient";

export async function login(username, password) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại!");
      }
  
      // Lưu token vào localStorage
      localStorage.setItem("access_token", data.access_token);
      return data; // Trả về data để xử lý tiếp
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw error;
    }
  }
  
  export async function loginWithGoogle() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/google", {
        method: "GET",
        credentials: "include", // Để gửi cookie session nếu có
      });
  
      if (!response.ok) {
        throw new Error("Google login failed!");
      }
      return response; // Điều hướng sẽ do backend xử lý
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
      throw error;
    }
  }