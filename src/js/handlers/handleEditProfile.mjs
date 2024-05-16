import { tab } from "../components/tabs/tabController.mjs";
import { fillProfileEditForm, editProfileListener } from "../services/editProfile.mjs";
export function handleEditProfile(isLoggedIn) {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const postParam = params.get("name");

    if (!isLoggedIn) {
        window.location.href = "/login.html";
    } else if (postParam !== localStorage.getItem("name")) {
        window.location.href = "/index.html";
    } else {
        const editProfileForm = document.querySelector("#edit-profile-form");
        tab(editProfileForm);
        fillProfileEditForm(editProfileForm);
        editProfileForm.addEventListener("submit", editProfileListener);      
    }
}