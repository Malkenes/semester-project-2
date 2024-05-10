import { renderCards, renderProfileCards } from "../components/cards/renderCards.mjs";
import { clearLoadingIndicator, displayErrorMessage, displayLoadingIndicator } from "../utils/displayLoadingIndicator.mjs";
import { getAllActiveListings } from "./api/listings.mjs";
import { getSearchByTag, getSearchByListing, getSearchByProfile } from "./api/search.mjs";
import { isDateValid } from "../utils/isDateValid.mjs";
import { setPagination } from "../components/search/pagination.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const searchType = params.get("search");
const searchValue = params.get("value");
let data = [];
let currentPage = 1;
let totalPages = 1;
if (searchType && searchType !== "Profile") {
    const showExpired = document.querySelector("#show-expired");
    showExpired.classList.add("m-3");
    const showExpiredInput = document.createElement("input");
    showExpiredInput.type = "checkbox";
    showExpiredInput.id = "show-expired_input";
    showExpiredInput.classList.add("form-check-input");
    showExpiredInput.addEventListener("change", (e) => {
        if (e.target.checked) {
            displaySearch(false);
        } else {
            displaySearch();
        }   
    });
    const showExpiredLabel = document.createElement("label");
    showExpiredLabel.for = "show-expired_input";
    showExpiredLabel.textContent = "show expired";
    showExpired.append(showExpiredLabel);
    showExpired.append(showExpiredInput);
}

export async function displaySearch(active = true) {
    if (searchType) {
        document.querySelector(`option[value="${searchType}"]`).setAttribute("selected","selected");
    }    
    try {
        displayLoadingIndicator();
        switch (searchType) {
            case "Listing":
                data = await getSearchByListing(searchValue);
                if (active) {
                    data = data.filter((dataItem) => isDateValid(dataItem.endsAt));
                }
                break;
            case "Tag":
                data = await getSearchByTag(searchValue,active);
                break;  
            case "Profile":
                data = await getSearchByProfile(searchValue);
                break;
            default:
                data = await getAllActiveListings();
                break;
        }
        setSearchHeader();
        totalPages = Math.ceil(data.length/12);
        goToPage();    
        clearLoadingIndicator();
    } catch (error) {
        console.log(error);
        displayErrorMessage(error);
    }
    const sortOptions = document.querySelector("#sort-options");
    sortOptions.addEventListener("change", sortSearches);
}

function setSearchHeader() {
    if (searchValue === null) {
        document.querySelector("h1").textContent = "All listings";
    } else {
        document.querySelector("h1").textContent = searchType + ": " + searchValue;  
    }
    document.querySelector("#search-amount").textContent = data.length + " Matchs";
    const sortOptions = document.querySelector("#sort-options");

    if (searchType === "Profile") {
        sortOptions.innerHTML = `
        <option value="name-z-a">name Z - A</option>
        <option value"name-a-z">name A - Z</option>
        <option value="credits-l-m">credits (least to most)</option>
        <option value="credits-m-l">credits (most to least)</option>
        `
    } else {
        sortOptions.innerHTML = ` 
        <option value="default">default</option>
        <option value="about-to-expire">about to expire</option>
        <option value="highest-bid">highest bid</option>
        `
    }
}
export function goToPage(page = 1) {
        currentPage = page;
        setPagination(currentPage,totalPages);
        const perPage = 12;
        const startIndex = perPage*(page-1);
        const endIndex = (perPage*(page-1)) + perPage;
        const newData = data.slice(startIndex, endIndex);
        displaySearchResult(newData);   
}

function displaySearchResult(data) {
    const container = document.querySelector("#search-body");
    if (searchType === "Profile") {
        const cardsHTML = renderProfileCards(data);
        container.innerHTML = cardsHTML;
    } else {
        const cardsHTML = renderCards(data);
        container.innerHTML =  cardsHTML;
    }
}

function sortSearches(e) {
    switch (e.target.value) {
        case "about-to-expire":
            data.sort((a, b) => {
                const aDate = new Date(a.endsAt).getTime();
                const bDate = new Date(b.endsAt).getTime();
                return aDate - bDate;
              });
            break;
        case "highest-bid":
            data.sort((a,b) => {
                const bidA = (a.bids && a.bids.length > 0 ) ? (a.bids[a.bids.length - 1].amount || 0): 0;
                const bidB = (b.bids && b.bids.length > 0 ) ? (b.bids[b.bids.length - 1].amount || 0): 0;
                return bidB - bidA;
            });    
            break;
        case "name-z-a":
            data.sort((a,b) => b.name.localeCompare(a.name));
            break;
        case "name-a-z":
            data.sort((a,b) => a.name.localeCompare(b.name));
        case "credits-l-m":
            data.sort((a,b) => a.credits - b.credits);
            break;
        case "credits-m-l":
            data.sort((a,b) => b.credits - a.credits);
            break;
        default:
            break;
    }
    goToPage();
}