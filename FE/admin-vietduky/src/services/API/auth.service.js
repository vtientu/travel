import restClient from "../restClient";
import { StorageService } from "../storage/StorageService";

export async function login(email, password) {
  return restClient({
    url: "auth/login",
    method: "POST",
    data: {
      email,
      password
    }
  });
}