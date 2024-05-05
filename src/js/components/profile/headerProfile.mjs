import { getProfile } from "../../services/api/profile.mjs";
export async function updateLoggedInUserUI() {
    const loggedIn = document.querySelector("#logged-in");
    const profile = await getProfile(localStorage.getItem("name"));
    loggedIn.innerHTML = 
    `
    <div class="d-flex justify-content-center rounded-3">
      <a class="btn btn-light" href="/profile.html?name=${profile.name}">
        <img class="rounded-circle border border-primary" height="32px" width="32px" src="${profile.avatar.url}">
        <div class="bid-xs">
          ${profile.credits}
        </div>
      </a>
      <a class="btn btn-light" href="/create_listing.html">
        <i class="fas fa-plus fs-3"></i>
        <div class="text-nowrap">Create Listing</div>
      </a>
      <button class="btn btn-light text-danger" id="logout-btn">    
        <i class="fas fa-right-from-bracket fs-3"></i>
        <div>logout</div>
      </button>
    </div>
    `;
    document.querySelector("#logout-btn").addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/";
    });
  };