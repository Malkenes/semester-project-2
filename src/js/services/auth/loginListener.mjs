import { login } from "../api/login.mjs";
export function loginListener(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    login({ email, password });
}  