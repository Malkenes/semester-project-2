export function createLogoutButton() {
    const logoutButton = document.createElement("button");
    logoutButton.onclick = function () {
      localStorage.clear();
      window.location.href = "/";
    };
    logoutButton.classList.add("custom-btn-danger");
    logoutButton.textContent = "LOG OUT";
    return logoutButton;
}