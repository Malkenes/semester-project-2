export function displayHotAuctions(cardsHTML) {
    const container = document.querySelector("#hot-auctions");
    container.innerHTML = "<div class=row>" + cardsHTML + "</div>";
}

export function displayAboutToExpireAuctions(cardsHTML) {
    const container = document.querySelector("#about-to-expire");
    container.innerHTML = "<div class=row>" + cardsHTML + "</div>";
}

export function displayProfileListings(cardsHTML) {
    const container = document.querySelector("#active-listings");
    container.innerHTML = cardsHTML;
}