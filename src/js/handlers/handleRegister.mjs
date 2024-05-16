import { registerListener } from "../services/auth/registerListener.mjs";
import { tab } from "../components/tabs/tabController.mjs";
export function handleRegister(isLoggedIn) {
    if (isLoggedIn) {
        window.location.href = "/";
      } else {
        const registerForm = document.querySelector("#register-form");
        tab(registerForm);
        registerForm.addEventListener("submit", registerListener);      
      }
}