import { renderAuctionHeader } from "./renderAuctionHeader.mjs";
import { displayBid } from "./renderBid.mjs";
import { displayExpiration} from "./renderExpiration.mjs";
import { displayMedia} from "./renderMedia.mjs";
import { displaySeller} from "./renderSeller.mjs";
import { isDateValid } from "../../utils/isDateValid.mjs";

export function displayAuction(data,isLoggedIn) {
    const header = document.querySelector("#auction-header");
    header.innerHTML = renderAuctionHeader(data.title,data.tags);
    displayMedia(data.media);
    const description = document.querySelector("#auction-description");
    description.innerHTML = data.description;

    const expiration = new Date(data.endsAt);
    const expirationDate = document.querySelector("#auction-expiration_date");
    expirationDate.innerHTML = expiration.toLocaleString();
    displayExpiration(expiration);
    displayBid(data,isLoggedIn,isDateValid(expiration));
    displaySeller(data.seller);
}
