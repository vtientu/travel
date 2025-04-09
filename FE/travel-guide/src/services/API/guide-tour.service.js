import restClient from "../restClient";
import { clearParams } from "../../utils";
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

// Lấy danh sách travel tour có thể nhận
export const getTravelTourCanAccept = async (params) => {
  try {
    const response = await restClient({
      url: `travel-tour/guide`,
      method: "GET",
      params: clearParams(params),
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy tour:", error);
    throw error;
  }
};

// Lấy danh sách travel tour theo user id
export const getGuideTourByUserId = async (userId, params) => {
  try {
    const response = await restClient({
      url: `guide-tour/user/${userId}`,
      method: "GET",
      params: clearParams(params),
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

// Hủy yêu cầu tour
export const cancelGuideTour = async (tourId) => {
  try {
    const response = await restClient({
      url: `guide-tour/reject/${tourId}`,
      method: "PUT",
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy yêu cầu tour:", error);
    throw error;
  }
};

// Xác nhận tour
export const approveGuideTour = async (tourId) => {
  try {
    const response = await restClient({
      url: `guide-tour/approve/${tourId}`,
      method: "PUT",
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xác nhận tour:", error);
    throw error;
  }
};

// Gửi yêu cầu tour
export const sendRequestTour = async (data) => {
  try {
    const response = await restClient({
      url: `guide-tour/create`,
      method: "POST",
      data,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu tour:", error);
    throw error;
  }
};
