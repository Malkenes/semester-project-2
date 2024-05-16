import { profileListings, getProfile } from "./api/profile.mjs";
import { renderProfile } from "../components/profile/renderProfile.mjs";
import { renderCards } from "../components/cards/renderCards.mjs";
import { displayProfileBanner } from "../components/profile/profileLogic.mjs";
import { displayProfileListings } from "../components/cards/cardLogic.mjs";

export async function displayProfile(name) {
    try {
      const cardsData = await profileListings(name);
      const profileData = await getProfile(name);
      console.log(profileData);
      const cardsHTML = renderCards(cardsData);
      const profileHTML = renderProfile(profileData);
      displayProfileBanner(profileHTML);
      displayProfileListings(cardsHTML);
    } catch (error) {
      console.log(error)
    }
}
  