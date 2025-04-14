import restClient from "../restClient";

export async function login(email, password) {
  return restClient({
    url: "auth/login",
    method: "POST",
    data: {
      email,
      password,
    },
  });
}
