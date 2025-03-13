import axios from "axios";
// import { StorageService } from "./storage";

const BASE_URL = "http://localhost:3000/api";

export default function restClient(options) {
    const { url, method = "GET", params, data, headers } = options;

    return axios({
        url: `${BASE_URL}/${url}`,
        method,
        params,
        data,
        headers
    })
    //   .catch((err) => {
    //     if (StorageService.isExpired()) {
    //       StorageService.signout();
    //     }
    //   });
}
