import { tab } from "../components/tabs/tabController.mjs";
import { fillEditForm, editListingListener } from "../services/editAuction.mjs";
export function handleEditListing(isLoggedIn) {
    if (!isLoggedIn) {
        window.location.href = "/login.html";
      } else {
        const editListingForm = document.querySelector("#edit-listing-form");
        tab(editListingForm);
        fillEditForm(editListingForm);
        editListingForm.addEventListener("submit", editListingListener);      
      }
}