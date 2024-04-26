import { loginListener } from "./services/auth/index.js";
import { tab } from "./components/tabComponent.mjs";
tab();
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", loginListener);
}
if (localStorage["accessToken"]) {
  updateLoggedInUserUI();
}
function updateLoggedInUserUI() {
  const loggedIn = document.querySelector("#logged-in");

  const logoutButton = document.createElement("button");
  logoutButton.onclick = function () {
    localStorage.clear();
    window.location.href = "/";
  };
  logoutButton.classList.add("custom-btn-danger");
  logoutButton.innerHTML = `LOG OUT <div></div>`;
  loggedIn.replaceWith(logoutButton);
}
