import restClient from "../restClient";
import { StorageService } from "../storage/StorageService";

// Hàm lấy token
function getAuthHeaders() {
  const token = StorageService.getToken(); // Giả sử bạn có hàm này
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Lấy danh sách tour (có xác thực)
export function getTours(page = 1, limit = 10) {
  return restClient({
    url: "tour",
    method: "GET",
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${StorageService.getToken()}`, // Đảm bảo có token
    },
  })
    .then(response => {
      console.log("API response:", response.data); // Debug
      return response.data.data || []; // Lấy danh sách tours từ data.data
    })
    .catch(error => {
      console.error("Lỗi API:", error);
      return [];
    });
}
// Tạo tour mới (có xác thực)
export function createTour(data) {
  return restClient({
    url: "tour/create",
    method: "POST",
    data,
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error("Lỗi API:", error);
      throw error;
    });
}

// Xóa tour (có xác thực)
export function deleteTour(id) {
  return restClient({
    url: `tour/delete/${id}`,
    method: "DELETE",
    headers: getAuthHeaders(),
  })
    .then(response => response.data)
    .catch(error => {
      console.error("Lỗi API:", error);
      throw error;
    });
}
