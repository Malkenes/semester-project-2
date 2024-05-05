export function renderSeller(seller) {
    if (localStorage.getItem("name") === seller.name) {
        return `
        <button class="btn btn-outline-warning" id="edit-btn">edit</button>
        <button class="btn btn-outline-danger" id="del-btn">delete</button>
        `;
    } else {
        return `
        <h2 class="fs-5">Seller info</h2>
        <div style="background-image: url(${seller.banner.url});">
            <a href="/profile.html?name=${seller.name}" class="d-flex align-items-center gap-3 p-3 text-black text-decoration-none">
                <img class="rounded-circle border border-primary" src="${seller.avatar.url}" alt="${seller.avatar.alt}" height="64px" width="64px">
                <div class="bg-white border border-primary bg-opacity-75 p-3 rounded">
                    <b class="text-break">${seller.name}</b>
                </div>
            </a>
        </div>
        `;
    }
}
