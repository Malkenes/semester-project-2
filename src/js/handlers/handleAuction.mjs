import { getAuction } from "../services/api/listings.mjs";
import { clearLoadingIndicator, displayErrorMessage, displayLoadingIndicator } from "../utils/displayLoadingIndicator.mjs";
import { displayAuction } from "../components/auction/auctionLogic.mjs";
export async function handleAuction(isLoggedIn) {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const postParam = params.get("id");
    try {
        displayLoadingIndicator();

        const auctionData = await getAuction(postParam);
        displayAuction(auctionData,isLoggedIn);
        clearLoadingIndicator();
    } catch (error) {
        displayErrorMessage(error);
        console.log(error);
    }
}