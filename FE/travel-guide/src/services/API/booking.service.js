import restClient from "../restClient";

export const getBookingById = async (id) => {
    try {
        const response = await restClient({
            url: `booking/${id}`,
            method: "GET",
        });
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết đặt tour:", error);
        throw error;
    }
};
