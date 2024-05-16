import { loginListener } from "../services/auth/loginListener.mjs";

export function handleLogin(isLoggedIn) {
    if (isLoggedIn) {
        window.location.href = "/";
      } else {
        const loginForm = document.querySelector("#login-form");
        loginForm.addEventListener("submit", loginListener);      
      }
}