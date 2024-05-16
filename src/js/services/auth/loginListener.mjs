import { clearLoadingIndicator, displayLoadingIndicator } from "../../utils/displayLoadingIndicator.mjs";
import { login } from "../api/login.mjs";
export async function loginListener(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    try {
        displayLoadingIndicator();
        await login({ email, password });
        window.location.href = "/";
    } catch (error) {
        clearLoadingIndicator();
        const authError = document.querySelector("#auth-error");
        authError.textContent = error;
        authError.style.display = "block";  
    }
}  