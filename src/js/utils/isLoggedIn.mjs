/**
 * Checks if the user is logged in by verifying the presence of an access token in the localStorage.
 * @returns {boolean} True if the user is logged in (access token exists in localStorage), otherwise false.
 */
export function isLoggedIn() {
    return localStorage.getItem("accessToken") !== null;
}