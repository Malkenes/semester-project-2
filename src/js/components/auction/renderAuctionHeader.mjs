export function renderAuctionHeader(title,tags) {
    if (tags.length === 0) {
        return `<h1>${title}</h1>`
    } else {
        let string = `<h1>${title}</h1><div class="d-flex gap-1">`;
        tags.forEach(tag => {
            string += `<a href="/search.html?value=${tag}&search=Tag" class="tag">${tag}</a>`;
        })
        string += "</div>";
        return string;
    }
}