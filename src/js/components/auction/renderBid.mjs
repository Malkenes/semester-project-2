import { placeBidListener } from "../../listeners/auctionListeners.mjs";

export function displayBid(data,isLoggedIn, active = true) {
    const bids = data.bids;
    const container = document.querySelector("#auction-bid");
    container.innerHTML = "";
    const bidContainer = document.createElement("div");
    bidContainer.classList.add("p-3","border-bottom", "border-primary");
    if (bids.length > 1) {
        bidContainer.innerHTML = `<a class="float-end" data-bs-toggle="collapse" href="#all-bids-collapse" aria-expanded="false" aria-controls="all-bids-collapse">View all bids</a>`;
    }
    if (active) {
        bidContainer.innerHTML += `<h2 class="fs-5">Highest bid</h2>`;
    } else {
        bidContainer.innerHTML += `<h2 class="fs-5">Winning bid</h2>`;
    }
    bidContainer.innerHTML += renderBid(bids);

    const bidInput = document.createElement("div");
    bidInput.classList.add("p-3", "border-bottom", "border-primary");
    if (!active) {
        bidInput.innerHTML = `<h2 class="fs-5">No more bids are being accepted</h2>`;
    } else {
       if (!isLoggedIn) {
        bidInput.innerHTML = `
            <h2 class="fs-5 mb-3">Login to place bid</h2>
            <a href ="/login.html" class="custom-btn">
                Login
            </a>
            `;
       } else {
        if (data.seller.name === localStorage.getItem("name")) {
            bidInput.innerHTML = `<h2 class="fs-5">Place bid</h2><p>can not place bid on your own auction</p>`
        } else {
            bidInput.innerHTML = `<label for="input-bid" class="h5">Place bid</label>`;
            const highestBid = bids.length > 0 ? bids[0].amount : 0;
            const bidInputTest = createBidForm(highestBid);
            bidInput.append(bidInputTest);    
        }
       }
    }
    container.append(bidContainer,bidInput);
}
export function renderBid(bids) {
    let string = "no bids yet";
    let allBids = "";
    let highestBid = 0;
    bids.reverse();
    if (bids.length > 0) {
        highestBid = bids[0].amount;
        string = `      
        <div class="py-2">
            <div class="bid">
                ${bids[0].amount}
            </div>
            <div>
                placed by:
                <a class="ms-1" href="/profile.html?name=${bids[0].bidder.name}">
                    ${bids[0].bidder.name}
                </a>
            </div>
        </div>`;

        for (let i = 1; i < bids.length; i++) {
            allBids += `
            <div class="py-2 border-top border-primary">
                <div class="bid">
                    ${bids[i].amount}
                </div>
                <div>
                    placed by:
                    <a class="ms-1" href="/profile.html?name=${bids[i].bidder.name}">
                        ${bids[i].bidder.name}
                    </a>
                </div>
            </div>`;
        }
    }
    return `
    ${string}
    <div class="collapse" id="all-bids-collapse">
     ${allBids}
    </div>
    `
}
function createBidForm(highestBid) {
    const bidForm = document.createElement("form");
    bidForm.dataset.bid = highestBid;
    bidForm.innerHTML = `
    <div class="d-flex">
        <div class="input-group" style="max-width: 200px">
            <input class="form-control" type="text" id="input-bid" name="bid" value="${highestBid + 10}">
            <img class="input-group-text" src="/images/credit.png" alt="credit" height="40px">
        </div>
        <button class="custom-btn">Bid</button>
    </div>
    <div class="form-text">
        Bids must be at least 10 credit higher than the current highest bid to be considered valid
    </div>
    `
    bidForm.addEventListener("submit", placeBidListener)
    return bidForm;
}