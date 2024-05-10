import { API_BASE, API_KEY } from "../../constants.mjs";
import { fetchRemainingData } from "./fetchRemainingData.mjs";
const URL = API_BASE + "auction/listings";
/**
 * Retrieves listings by a specific tag from a given URL.
 * @param {string} value - The tag value to search for.
 * @param {boolean} active - Flag indicating whether the listings are active.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of listings.
 * @throws {Error} If there is a failure in fetching data.
 */
export async function getSearchByTag(value, active) {
    const tagURL = `${URL}?_tag=${value}&_bids=true&_active=${active}`;

    let response = await fetch(tagURL);
    if (!response.ok) {
        throw new Error("failed to fetch data");
    }
    let result = await response.json();
    const listings = [];
    listings.push(...result.data);
    if (!result.meta.isLastPage) {
        await fetchRemainingData(tagURL,listings);
    }
    return listings;
}

/**
 * Retrieves listings by a specific search query from a given URL.
 * @param {string} value - The search query value.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of listings.
 * @throws {Error} If there is a failure in fetching data.
 */
export async function getSearchByListing(value) {
    const listingURL = `${URL}/search?q=${value}&_bids=true`;
    let response = await fetch(listingURL);
    if (!response.ok) {
        throw new Error("failed to fetch data");
    }
    let result = await response.json();
    const listings = [];
    listings.push(...result.data);
    if (!result.meta.isLastPage) {
        await fetchRemainingData(listingURL,listings);
    }
    return listings;
}

/**
 * Retrieves profiles by a specific search query from a given URL.
 * @param {string} value - The search query value.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of profiles.
 * @throws {Error} If there is a failure in fetching data or if the response indicates an error.
 */
export async function getSearchByProfile(value) {
    const options = {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json"
        },
    }  
    const profileURL = API_BASE + "auction/profiles/search?q=" + value;
    let response = await fetch(profileURL,options);
    let result = await response.json();
    if (!response.ok) {
        throw new Error(result.errors[0].message);
    }
    const profiles = [];
    profiles.push(...result.data);
    
    if (!result.meta.isLastPage) {
        await fetchRemainingData(profileURL,profiles,options);
    }
    return profiles;
}