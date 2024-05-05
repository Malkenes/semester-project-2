import { renderAuctionHeader } from "./renderAuctionHeader.mjs";
import { renderBid } from "./renderBid.mjs";
import { renderCountDown, renderExpiration } from "./renderExpiration.mjs";
import { renderMedia } from "./renderMedia.mjs";
import { renderSeller } from "./renderSeller.mjs";
import { deleteApiData } from "../../services/api/deleteAPIData.mjs";
import { placeBid } from "../../services/api/placeBid.mjs";
import { updateLoggedInUserUI } from "../profile/headerProfile.mjs";
import { getAuction } from "../../services/api/listings.mjs";

export async function singleAuction(id) {
    try {
        const auctionData = await getAuction(id);
        displayAuction(auctionData.data);
        auctionListeners(auctionData.data);
    } catch (error) {
        console.log(error)
    }
}

function displayAuction(data) {
    const header = document.querySelector("#auction-header");
    header.innerHTML = renderAuctionHeader(data.title,data.tags);
    const media = document.querySelector("#auction-media");
    media.innerHTML = renderMedia(data.media);
    const description = document.querySelector("#auction-description");
    description.innerHTML = data.description;

    const expiration = new Date(data.endsAt);
    const expirationDate = document.querySelector("#auction-expiration_date");
    expirationDate.innerHTML = expiration.toLocaleString();
    const expirationCountdown = document.querySelector("#auction-expiration_countdown");
    expirationCountdown.innerHTML = renderExpiration(expiration);

    const bid = document.querySelector("#auction-bid");
    bid.innerHTML = renderBid(data.bids);
    const seller = document.querySelector("#auction-seller");
    seller.innerHTML = renderSeller(data.seller);
}

function auctionListeners(data) {
    const bidForm = document.querySelector("#bid-form");
    bidForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const bidData = new FormData(e.target);
      const bidInput = e.target.querySelector("input");
      const bid = bidData.get("bid");
      const bidAmount = Number(bid);
      const highestBid = data.bids.length > 0 ? data.bids[0].amount : 0;
      if ((bidAmount - highestBid) >= 10) {
        const test = await placeBid({amount: bidAmount},data.id);
        const dataTest = await getAuction(test.data.id);
        updateBids(dataTest.data);
      } else {
        bidInput.classList.add("is-invalid");
      }
    });  
    const editBtn = document.querySelector("#edit-btn");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            window.location.href ="edit_listing.html?id=" + data.id;
        })
    }
    const delBtn = document.querySelector("#del-btn");
    if (delBtn) {
      delBtn.addEventListener("click", () => {
        deleteApiData(data.id);
      });
    }

    if (document.querySelector("#imageCarousel")) {
        const carousel = new bootstrap.Carousel("#imageCarousel");
        document.querySelector(".carousel-item").classList.add("active");
        const prevBtn = document.querySelector(".carousel-control-prev");
        prevBtn.addEventListener("click", () => {
          carousel.prev();
        });
        document.querySelector(".carousel-control-next").addEventListener("click", () => {
          carousel.next();
        });  
    };
    console.log(data);
    const date = new Date(data.endsAt);
    const currentDate = new Date(); 
    const diff = (date.getTime() - currentDate.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log(days);

    if (days === 0) {
        setInterval( () =>updateCountdown(date),1000);
    }
}
function updateCountdown(endsAt) {
    const expirationCountdown = document.querySelector("#auction-expiration_countdown");
    expirationCountdown.innerHTML = renderCountDown(endsAt);
}
function updateBids(data) {
    const bid = document.querySelector("#auction-bid");
    bid.innerHTML = renderBid(data.bids);
    updateLoggedInUserUI();
    auctionListeners(data);
}