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

export function createTour(data) {
  return restClient({
    url: "tour/create",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

export function deleteTour(id) {
  return restClient({
    url: `tour/delete/${id}`,
    method: "DELETE",
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