import { profileListings, getProfile } from "../services/api/profile.mjs";
import { displayProfileBanner } from "../components/profile/profileLogic.mjs";
import { renderCards } from "../components/cards/renderCards.mjs";
import { renderProfile } from "../components/profile/renderProfile.mjs";
import { displayProfileListings } from "../components/cards/cardLogic.mjs";
import { clearLoadingIndicator, displayErrorMessage, displayLoadingIndicator } from "../utils/displayLoadingIndicator.mjs";
import { isDateValid } from "../utils/isDateValid.mjs";

export async function handleProfile(isLoggedIn) {    
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const profileParam = params.get("name");
    if (!isLoggedIn) {
        window.location.href = "/login.html";
    }
    try {
        displayLoadingIndicator();
        const profileData = await getProfile(profileParam);
        const profileHTML = renderProfile(profileData);
        displayProfileBanner(profileHTML);
        const container = document.querySelector("#profile-listings");
        if (profileData._count.listings > 0) {
            const cardsData = await profileListings(profileParam);
            const activeListings = cardsData.slice().filter((listing) => isDateValid(listing.endsAt));
            const expiredListings = cardsData.slice().filter((listing) => !isDateValid(listing.endsAt));
            const activeCardsHTML = renderCards(activeListings);
            const expiredCardsHTML = renderCards(expiredListings);
            if (activeListings.length > 0) {
                container.innerHTML += `
                <div>
                    <h2 class="fs-4 mb-3">Active listings</h2>
                    <div class="row">${activeCardsHTML}</div>
                </div>
                `
            }
            if (expiredListings.length > 0) {
                container.innerHTML += `
                <div>
                    <h2 class="fs-4 mb-3">Expired listings</h2>
                    <div class="row">${expiredCardsHTML}</div>
                </div>
                `
            }
        } else {
            container.textContent = "This user has no listings";
            container.classList.add("text-center", "mt-5");
        }
        clearLoadingIndicator();
    } catch (error) {
        console.log(error);
        displayErrorMessage(error);
    }
}