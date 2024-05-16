import { updateLoggedInUserUI } from "./components/profile/headerProfile.mjs";
import { isLoggedIn } from "./utils/isLoggedIn.mjs";
import { handleHome } from "./handlers/handleHome.mjs";
import { handleLogin } from "./handlers/handleLogin.mjs";
import { handleRegister } from "./handlers/handleRegister.mjs";
import { handleAuction } from "./handlers/handleAuction.mjs";
import { handleProfile } from "./handlers/handleProfile.mjs";
import { handleEditProfile } from "./handlers/handleEditProfile.mjs";
import { handleCreateListing } from "./handlers/handleCreateListing.mjs";
import { handleEditListing } from "./handlers/handleEditListing.mjs";
import { handleSearch } from "./handlers/handleSearch.mjs";

updateLoggedInUserUI();
function initializeFunctionsFromPath() {
  const pathName = window.location.pathname;
  const loggedIn = isLoggedIn();
  switch (pathName) {
    case "/login.html":
      handleLogin();
      break;
    case "/register.html":
      handleRegister();
      break;
    case "/":
      handleHome();
      break;
    case "/auction.html":
      handleAuction(loggedIn);
      break;
    case "/search.html":
      handleSearch();
      break;
    case "/profile.html":
      handleProfile(loggedIn);
      break;
    case "/edit_profile.html":
      handleEditProfile(loggedIn);
      break;
    case "/create_listing.html":
      handleCreateListing(loggedIn);
      break;
    case "/edit_listing.html":
      handleEditListing(loggedIn);
      break;
    default:
      break;
  }
}
initializeFunctionsFromPath();
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
  const data = new FormData(e.target);
  const search = data.get("search");
  const value = data.get("value");
  if (value === "") {
    window.location.href = "/search.html";
  } else {
    window.location.href = "/search.html?search=" + search + "&value=" + value;
  }
});
