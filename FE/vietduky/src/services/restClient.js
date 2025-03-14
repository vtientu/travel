import axios from "axios";
// import { StorageService } from "./storage";
import { BASE_API } from "../environments/Environment";


export default function restClient(options) {
    const { url, method = "GET", params, data, headers } = options;

    return axios({
        url: `${BASE_API}/${url}`,
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
