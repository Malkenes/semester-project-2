export function renderCards(data) {
    const cardsHTML = data.map(card => {
        return `
            <div class="col-md-6 col-lg-4 mb-3">
                <a href="/auction.html?id=${card.id}" class="card h-100 text-decoration-none">
                    <div class="position-relative">
                        <div class="position-absolute bottom-0 end-0 p-3">
                            <div class="bg-white">
                                <div class="bg-primary bg-opacity-25">
                                    hei
                                </div>
                            </div>
                        </div>
                        ${cardImage(card.media)}
                    </div>
                    <div class="card-body">
                        <h3 class="fs-6 card-title">${card.title}</h3>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <b>highest bid</b>
                        ${highestBid(card.bids)}
                    </div>
                </a>
            </div>
            `;
    }); 
    return cardsHTML.join("");
}

function cardImage(media) {
    if (media.length > 0) {
        return `<img class="card-img-top object-fit-cover" height="200px" src="${media[0].url}" alt="${media[0].alt}">`;
    } else {
        return `<img class="card-img-top object-fit-cover" height="200px" src="/images/logo.png" alt="no image">`;
    }
}
function highestBid(bids) {
    if (bids.length > 0) {
        bids.reverse();
        return `<div class="bid-sm">${bids[0].amount}</div>`
    } else {
        return "<div class=fs-4>no bids</div>";
    }
}

export function renderTags(data) {
    const tagsHTML = data.map(tag => {
        return `
        <div class="col-sm-6 col-lg-3 mb-3">
            <div class="position-relative">
                <div class="position-absolute p-3 bg-primary bg-opacity-75 rounded-end-5">
                    ${tag.tag}
                </div>
                <a href="/search.html?tag=${tag.tag}">
                    <img class="object-fit-cover w-100" height="200px" src="${tag.media.url}" alt="${tag.media.alt}">
                </a>
            </div>
        </div>
        `;
    });
    return tagsHTML.join("");
}