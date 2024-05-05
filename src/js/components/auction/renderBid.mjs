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
        <div class="p-3 border-bottom border-primary">
            <a class="float-end" data-bs-toggle="collapse" href="#all-bids-collapse" aria-expanded="false" aria-controls="all-bids-collapse">View all bids</a>
            <h2 class="fs-5">Highest bid</h2>
            ${string}
            <div class="collapse" id="all-bids-collapse">
                ${allBids}
            </div>
        </div>
        <div class="p-3 border-bottom border-primary">
            <label for="input-bid" class="h5">Place bid</label>
            <form id="bid-form">
                <div class="d-flex">
                    <div class="input-group" style="max-width: 200px">
                        <input class="form-control" type="text" id="input-bid" name="bid" value="${highestBid + 10}">
                        <img class="input-group-text" src="/images/credit.png" height="40px">
                    </div>
                    <button class="custom-btn">Bid</button>
                </div>
                <div class="form-text">
                    Bids must be at least 10 credit higher than the current highest bid to be considered valid
                </div>
            </form>
        </div>
    `;
}
