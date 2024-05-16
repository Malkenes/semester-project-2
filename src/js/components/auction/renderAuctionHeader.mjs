export function renderAuctionHeader(title,tags) {
    if (tags.length === 0) {
        return `<h1>${title}</h1>`
    } else {
        let string = `<h1>${title}</h1><div class="d-flex gap-1">`;
        tags.forEach(tag => {
            string += `<span class="tag">${tag}</span>`;
        })
        string += "</div>";
        return string;
    }
}