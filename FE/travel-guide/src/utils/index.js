import { STATUS_PENDING_TOUR } from "../constants/app.constant";

export const clearParams = (params) => {
    return Object.keys(params).reduce((acc, key) => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
            acc[key] = params[key];
        }
        return acc;
    }, {});
};

export const getStatusPendingTour = (status) => {
    switch (status) {
        case STATUS_PENDING_TOUR.PENDING:
            return "Chờ duyệt";
        case STATUS_PENDING_TOUR.ACCEPTED:
            return "Đã duyệt";
        case STATUS_PENDING_TOUR.REJECTED:
            return "Đã từ chối";
        default:
            return "";
    }
};

