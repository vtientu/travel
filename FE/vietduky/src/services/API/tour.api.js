import restClient from "../restClient";
// import { StorageService } from "./storage";

export function getTours(page = 1, limit = 10) {
    return restClient({
      url: "tour",
      method: "GET",
      params: { page, limit },
    })
    .then(response => {
    //   console.log("Dữ liệu API trả về:", response.data); 
      return response.data;
    })
    .catch(error => {
      console.error("Lỗi API:", error);
      throw error;
    });
  }
  

// export function getTourDetail(id) {
//   return restClient({
//     url: `tours/${id}`,
//     method: "GET"
//   });
// }

// export function createTour(data) {
//   const token = StorageService.getToken()?.replace(/['"]+/g, "") || "";
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   return restClient({
//     url: "tours",
//     method: "POST",
//     data,
//     headers
//   });
// }

// export function updateTour(id, data) {
//   const token = StorageService.getToken()?.replace(/['"]+/g, "") || "";
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   return restClient({
//     url: `tours/${id}`,
//     method: "PUT",
//     data,
//     headers
//   });
// }

// export function deleteTour(id) {
//   const token = StorageService.getToken()?.replace(/['"]+/g, "") || "";
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   return restClient({
//     url: `tours/${id}`,
//     method: "DELETE",
//     headers
//   });
// }
