import { login } from "../api/index.js";
export function loginListener(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const email = data.get("email");
  const password = data.get("password");
  console.log(email, password);
  login({ email, password });
}
