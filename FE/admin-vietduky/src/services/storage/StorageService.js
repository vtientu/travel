const TOKEN_KEY = "access_token";

// Lưu token vào localStorage
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Xóa token khi logout
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};