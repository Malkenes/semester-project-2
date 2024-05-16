import { clearLoadingIndicator, displayErrorMessage, displayLoadingIndicator } from "../utils/displayLoadingIndicator.mjs";
import { getAllActiveListings } from "../services/api/listings.mjs";
import { renderCards, renderTags } from "../components/cards/renderCards.mjs";
import { displayHotAuctions, displayAboutToExpireAuctions, displayBrowseByTags } from "../components/cards/cardLogic.mjs";
import { getTagCount } from "../utils/getTagCount.mjs";

export async function handleHome() {
    try {
        displayLoadingIndicator();
        const activeListings = await getAllActiveListings();
        
        const hotListings = activeListings.slice().sort((a, b) => b.bids.length - a.bids.length).slice(0,3);
        const expiringSoonListings = activeListings.slice().sort((a, b) => {
            const aDate = new Date(a.endsAt).getTime();
            const bDate = new Date(b.endsAt).getTime();
            return aDate - bDate;      
        }).slice(0,6);
        const tags = getTagCount(activeListings).slice(0,4);

        const hotListingsHTML = renderCards(hotListings);
        const expiringSoonHTML = renderCards(expiringSoonListings);
        const tagsHTML = renderTags(tags);

        displayHotAuctions(hotListingsHTML);
        displayAboutToExpireAuctions(expiringSoonHTML);
        displayBrowseByTags(tagsHTML);

        clearLoadingIndicator();
    } catch (error) {
        displayErrorMessage(error);
        console.log(error);
    }
}