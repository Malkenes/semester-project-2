import { loginListener } from "./services/auth/loginListener.mjs";
import { registerListener } from "./services/auth/registerListener.mjs";
import { tab } from "./components/tabs/tabController.mjs";
import { renderCards, renderTags } from "./components/cards/renderCards.mjs";
import {
  displayAboutToExpireAuctions,
  displayHotAuctions,
} from "./components/cards/cardLogic.mjs";
import { displayProfile } from "./services/profileService.mjs";
import { singleAuction } from "./components/auction/auctionLogic.mjs";
import { updateLoggedInUserUI } from "./components/profile/headerProfile.mjs";
import { getAllActiveListings } from "./services/api/listings.mjs";
import { listingListener } from "./services/createAuction.mjs";
import { editListingListener, fillEditForm } from "./services/editAuction.mjs";
import {
  editProfileListener,
  fillProfileEditForm,
} from "./services/editProfile.mjs";
import { displaySearch } from "./services/searchService.mjs";
import { isLoggedIn } from "./utils/isLoggedIn.mjs";

if (isLoggedIn()) {
  updateLoggedInUserUI();
}

const pathName = window.location.pathname;
if (pathName === "/auction.html") {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const postParam = params.get("id");
  singleAuction(postParam);
}

if (pathName === "/create_listing.html") {
  const createListingForm = document.querySelector("#create-listing-form");
  tab(createListingForm);
  createListingForm.addEventListener("submit", listingListener);
}

if (pathName === "/edit_listing.html") {
  const editListingForm = document.querySelector("#edit-listing-form");
  tab(editListingForm);
  fillEditForm(editListingForm);
  editListingForm.addEventListener("submit", editListingListener);
}
if (pathName === "/login.html") {
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", loginListener);
}
if (pathName === "/register.html") {
  const registerForm = document.querySelector("#register-form");
  tab(registerForm);
  registerForm.addEventListener("submit", registerListener);
}
if (pathName === "/") {
  initilizseHome();
}
if (pathName === "/profile.html") {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const profileParam = params.get("name");
  displayProfile(profileParam);
}
if (pathName === "/edit_profile.html") {
  const editProfileForm = document.querySelector("#edit-profile-form");
  tab(editProfileForm);
  fillProfileEditForm(editProfileForm);
  editProfileForm.addEventListener("submit", editProfileListener);
}
if (pathName === "/search.html") {
  displaySearch();
}
async function initilizseHome() {
  try {
    const cardsData = await getAllActiveListings();
    const cardsSorted = cardsData
      .slice()
      .sort((a, b) => b.bids.length - a.bids.length);
    const threeCards = cardsSorted.slice(0, 3);
    const aboutToExpire = cardsData.slice().sort((a, b) => {
      const aDate = new Date(a.endsAt).getTime();
      const bDate = new Date(b.endsAt).getTime();
      return aDate - bDate;
    });
    const threeNewCards = aboutToExpire.slice(0, 3);
    console.log(aboutToExpire);
    const cardsHTML = renderCards(threeCards);
    const aboutToExpireHTML = renderCards(threeNewCards);
    displayHotAuctions(cardsHTML);
    displayAboutToExpireAuctions(aboutToExpireHTML);

    const tags = getTagCount(cardsData);
    const fourTags = tags.slice(0, 4);
    const tagData = await getPopularMedia(fourTags);
    const tagsHTML = renderTags(tagData);
    displayBrowseByTags(tagsHTML);
  } catch (error) {
    console.log(error);
  }
}
function displayBrowseByTags(HTML) {
  const container = document.querySelector("#browse-by-tags");
  container.innerHTML = `
  <div class="row bg-primary bg-opacity-25 p-3">
  <h2>Browse by Tags</h2>
  ${HTML}
  </div>`;
}
function getTagCount(auctions) {
  const tagCount = {};
  auctions.forEach((auction) => {
    auction.tags.forEach((tag) => {
      if (tag.length > 1) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
    });
  });

  Object.keys(tagCount).forEach((tag) => {
    if (tagCount[tag] === 1) {
      delete tagCount[tag];
    }
  });

  const tagArray = Object.keys(tagCount).map((tag) => ({
    tag,
    count: tagCount[tag],
  }));

  tagArray.sort((a, b) => b.count - a.count);
  const sortedTags = tagArray.map((item) => item.tag);

  return sortedTags;
}
/*
function listingListener(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const title = data.get("title");
  const description = data.get("description");
  const url = data.get("media_url");
  const alt = data.get("media_alt");
  const endsAt = new Date(data.get("datetime")).toISOString();
  let tags = [];
  const tagContainer = document.querySelector("#tags-added");
  const currentTags = Array.from(tagContainer.querySelectorAll("span")).map(currentTag => currentTag.textContent);
  if (currentTags.length > 0) {
    tags = currentTags;
  };
  createListing({title,description,url,alt,tags,endsAt});
  console.log(title,description,url,alt,tags,endsAt);
}
/*
async function createListing(data) {
  const options = {
    method: "post",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-Noroff-API-Key": "b3fbab00-01a2-4a17-8c27-b7ef4796f389",
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auction/listings",
      options,
    );
    if (response.ok) {
      const result = await response.json();
      window.location.href = "/auction.html?id=" + result.data.id;
    }
  } catch (error) {
    console.log(error);
  }
}
/*
async function allActiveListings() {
  try {
    let response = await fetch("https://v2.api.noroff.dev/auction/listings?_active=true&_bids=true");
    let result = await response.json();
    const listings = [];
    listings.push(...result.data);
    while (!result.meta.isLastPage) {
      response = await fetch("https://v2.api.noroff.dev/auction/listings?_active=true&_bids=true&page=" + (result.meta.currentPage + 1));
      result = await response.json();
      listings.push(...result.data);
    }
    console.log(listings);
    return listings;
  } catch (error) {
    
  }
}*/
async function getPopularMedia(tags) {
  const mediaArray = [];
  for (const tag of tags) {
    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/auction/listings?_tag=" + tag,
      );
      const result = await response.json();
      const dataArray = result.data;
      const found = dataArray.find((data) => data.media.length > 0);
      mediaArray.push({ media: found.media[0], tag: tag });
    } catch (error) {
      console.log(error);
    }
  }
  return mediaArray;
}

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
