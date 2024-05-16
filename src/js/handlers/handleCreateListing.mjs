import { tab } from "../components/tabs/tabController.mjs";
import { listingListener } from "../services/createAuction.mjs";
export function handleCreateListing(isLoggedIn) {
    if (!isLoggedIn) {
        window.location.href = "/login.html";
      } else {
        const createListingForm = document.querySelector("#create-listing-form");
        tab(createListingForm);
        createListingForm.addEventListener("submit", listingListener);      
      }

}