import restClient from "../restClient";
import { StorageService } from "../storage/StorageService";

export const PassengerService = {
    getPassenger: () => {
        return restClient({
            url: "passenger",
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    getPassengerById: (id) => {
        return restClient({
            url: `passenger/${id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    createPassenger: (data) => {
        return restClient({
            url: "passenger/create",
            method: "POST",
            data,
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
                "Content-Type": "application/json",
            },
        });
    },
    updatePassenger: (data) => {
        return restClient({
            url: "passenger",
            method: "PUT",
            data,
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    deletePassenger: (id) => {
        return restClient({
            url: `passenger/${id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    getLatestPassenger: () => {
        return restClient({
            url: "passenger/latest",
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    getPassengerByBookingId: (id) => {
        return restClient({
            url: `passenger/booking/${id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    getPassengerByTravelTourId: (id) => {
        return restClient({
            url: `passenger/travel-tour/${id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    getPassengerByTourId: (id) => {
        return restClient({
            url: `passenger/tour/${id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    getPassengerByUserId: (id) => {
        return restClient({
            url: `passenger/user/${id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    getPassengerByTourCode: (code) => {
        return restClient({
            url: `passenger/tour-code/${code}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },
    getPassengerByBookingCode: (code) => {
        return restClient({
            url: `passenger/booking-code/${code}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${StorageService.getToken()}`,
            },
        });
    },

}