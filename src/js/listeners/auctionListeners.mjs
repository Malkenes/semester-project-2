import { displayBid } from "../components/auction/renderBid.mjs";
import { updateLoggedInUserUI } from "../components/profile/headerProfile.mjs";
import { deleteApiData } from "../services/api/deleteAPIData.mjs";
import { getAuction } from "../services/api/listings.mjs";
import { placeBid } from "../services/api/placeBid.mjs";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postParam = params.get("id");

export function deleteAuction(e) {
    e.preventDefault();
    try {
        deleteApiData(postParam);
    } catch (error) {
        
    }
}

export function editAuction(e) {
    e.preventDefault();
    window.location.href =`edit_listing.html?id=${postParam}`;
}
export async function placeBidListener(e) {
  e.preventDefault();
  const highestBid = e.target.dataset.bid;
  const bidData = new FormData(e.target);
  const bidInput = e.target.querySelector("input");
  const bid = bidData.get("bid");
  const bidAmount = Number(bid);
  if ((bidAmount - highestBid) >= 10) {
    await placeBid({ amount: bidAmount }, postParam);
    const data = await getAuction(postParam);
    displayBid(data, true);
    updateLoggedInUserUI();
  } else {
    bidInput.classList.add("is-invalid");
  }
}
