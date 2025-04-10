import restClient from "../restClient";

export const FeedbackService = {
    getAllFeedback: () => {
        return restClient({
            url: "feedback",
            method: "GET",
        });
    },
    getFeedbackById: (id) => {
        return restClient({
            url: `feedback/${id}`,
            method: "GET",
        });
    },
    createFeedbackTour: (data) => {
        return restClient({
            url: "feedback/create/tour",
            method: "POST",
            data,
        });
    },
    createFeedbackGuide: (data) => {
        return restClient({
            url: "feedback/create/travel-guide",
            method: "POST",
            data,
        });
    },
    updateFeedback: (id, data) => {
        return restClient({
            url: `feedback/${id}`,
            method: "PUT",
            data,
        });
    },
    deleteFeedback: (id) => {
        return restClient({
            url: `feedback/${id}`,
            method: "DELETE",
        });
    },
}