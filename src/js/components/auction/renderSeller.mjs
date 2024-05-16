import { deleteAuction, editAuction } from "../../listeners/auctionListeners.mjs";

export function displaySeller(seller) {
    const container = document.querySelector("#auction-seller");
    if (localStorage.getItem("name") === seller.name) {
        const editBtn = document.createElement("button");
        editBtn.classList.add("btn", "btn-outline-warning");
        editBtn.textContent = "edit";
        editBtn.addEventListener("click", editAuction);

        const delBtn = document.createElement("button");
        delBtn.classList.add("btn", "btn-outline-danger");
        delBtn.textContent = "delete";
        delBtn.addEventListener("click", deleteAuction);
        container.append(editBtn,delBtn);
    } else {
        container.innerHTML = `
        <h2 class="fs-5">Seller info</h2>
        <div style="background-image: url(${seller.banner.url});">
            <a href="/profile.html?name=${seller.name}" class="d-flex align-items-center gap-3 p-3 text-black text-decoration-none">
                <img class="rounded-circle border border-primary" src="${seller.avatar.url}" alt="${seller.avatar.alt}" height="64px" width="64px">
                <div class="bg-white border border-primary bg-opacity-75 p-3 rounded">
                    <b class="text-break">${seller.name}</b>
                </div>
            </a>
        </div>
        `
    }
}
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
