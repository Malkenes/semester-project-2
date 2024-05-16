import { API_BASE, API_KEY } from "../../constants.mjs";
import { fetchRemainingData } from "./fetchRemainingData.mjs";
const URL = API_BASE + "auction/listings";
export async function getAllActiveListings() {
    const activeURL = URL + "?_active=true&_bids=true";
    const response = await fetch(activeURL);
    if (!response.ok) {
      throw new Error("Failed to fetch Listings");
    } else {
      const result = await response.json();
      const listings = [];
      listings.push(...result.data);
      if (!result.meta.isLastPage) {
        await fetchRemainingData(activeURL,listings);
      }
      return listings;
    }
}

export async function createListing(data) {
    const options = {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Noroff-API-Key": API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(URL,options);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result);
    } else {
      window.location.href = `/auction.html?id=${result.data.id}`;
    }
}
export async function editListing(data, id) {
  const options = {
    method: "put",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-Noroff-API-Key": API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(URL + "/" + id, options);
    if (response.ok) {
      window.location.href = "/auction.html?id=" + id;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getAuction(id) {
  const response = await fetch(`${URL}/${id}?_seller=true&_bids=true`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors[0].message);
  } else {
    return result.data;
  }
}
  