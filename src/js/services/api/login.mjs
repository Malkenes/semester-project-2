import { API_BASE } from "../../constants.mjs";
/**
 * Performs a login request to the server.
 * This function sends a POST request to the server to authenticate the user with the provided data.
 * If successful, it stores the access token and user name in the local storage.
 * If unsuccessful, it throws an error with the error message received from the server.
 * @param {Object} data - The login data containing username and password.
 * @returns {Promise<void>} A promise that resolves when the login request is completed.
 * @throws {Error} Throws an error if the login request fails.
 */
export async function login(data) {
  const options = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${API_BASE}auth/login`,options);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors[0].message);
  } else {
    localStorage.setItem("accessToken", result.data.accessToken);
    localStorage.setItem("name", result.data.name);
  }
}
