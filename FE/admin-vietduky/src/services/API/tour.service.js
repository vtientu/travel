import { data } from "react-router-dom";
import restClient from "../restClient";
import { StorageService } from "../storage/StorageService";

export const TourService = {
    getTours: () => {
        return restClient({
            url: "tour",
            method: "GET",
        });
    },
    getTour: (id) => {
        return restClient({
            url: `tour/${id}`,
            method: "GET",
        });
    },
    createTour: (data) => {
        return restClient({
            url: "tour/create",
            method: "POST",
            data,
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
                "Content-Type": "application/json",
            },
        });
    },
    updateTour: (data) => {
        return restClient({
            url: "tour",
            method: "PUT",
            data,
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    deleteTour: (id) => {
        return restClient({
            url: `tour/${id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
};