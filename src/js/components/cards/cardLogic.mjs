export function displayHotAuctions(cardsHTML) {
    const container = document.querySelector("#hot-auctions");
    container.innerHTML = `<h2 class="fs-4 mb-3">Hot Auctions</h2><div class=row>${cardsHTML}</div>`;
}

export function displayAboutToExpireAuctions(cardsHTML) {
    const container = document.querySelector("#about-to-expire");
    container.innerHTML = `<h2 class="fs-4 mb-3">Expiring Soon</h2><div class=row>${cardsHTML}</div>`;
}

export function displayProfileListings(cardsHTML) {
    const container = document.querySelector("#active-listings");
    container.innerHTML = cardsHTML;
}

export function displayBrowseByTags(HTML) {
    const container = document.querySelector("#browse-by-tags");
    container.innerHTML = `
    <div class="row bg-primary bg-opacity-25 p-3">
        <h2 class="fs-4 mb-3">Browse by Tags</h2>
        ${HTML}
    </div>`;  
}