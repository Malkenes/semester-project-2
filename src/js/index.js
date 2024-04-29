import { loginListener, registerListener } from "./services/auth/index.js";
import { tab } from "./components/tabs/tabController.mjs";
import { createLogoutButton } from "./components/buttons.mjs";
//tab();
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", loginListener);
}
const registerForm = document.querySelector("#register-form");
if (registerForm) {
  tab(registerForm);
  registerForm.addEventListener("submit", registerListener);
}
if (localStorage["accessToken"]) {
  updateLoggedInUserUI();
}
function updateLoggedInUserUI() {
  const loggedIn = document.querySelector("#logged-in");
  const logoutButton = createLogoutButton();
  loggedIn.replaceWith(logoutButton);
}
