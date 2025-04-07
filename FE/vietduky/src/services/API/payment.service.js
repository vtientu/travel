import restClient from "../restClient";

export const PaymentService = {
    checkPayemnt: (data) => {
        return restClient({
            url: "payment",
            method: "POST",
            data,
        });
    },
    getPayment: (id) => {
        return restClient({
            url: `payment/${id}`,
            method: "GET",
        });
    },
};