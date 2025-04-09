import restClient from "../restClient";
import { StorageService } from "../storage/StorageService";

// Lấy danh sách tour theo user id
export const getToursByUserId = async (userId) => {
  try {
    const response = await restClient({
      url: `guide-tour/user/${userId}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy tour:", error);
    throw error;
  }
};

// Lấy danh sách travel tour theo user id
export const getGuideTourByUserId = async (userId) => {
  try {
    const response = await restClient({
      url: `guide-tour/user/${userId}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy tour:", error);
    throw error;
  }
};

// Lấy danh sách tour hdv có thể nhận
export const getGuideTourCanAccept = async () => {
  try {
    const response = await restClient({
      url: `tour/`,
      method: "GET",
      params: {
        status: 0,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy tour:", error);
    throw error;
  }
};
