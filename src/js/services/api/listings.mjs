import { API_BASE, API_KEY } from "../../constants.mjs";
const URL = API_BASE + "auction/listings";
export async function getAllActiveListings() {
    const activeURL = URL + "?_active=true&_bids=true";
    try {
      let response = await fetch(activeURL);
      let result = await response.json();
      const listings = [];
      listings.push(...result.data);
      while (!result.meta.isLastPage) {
        response = await fetch(activeURL + "&page=" + (result.meta.currentPage + 1));
        result = await response.json();
        listings.push(...result.data);
      }
      return listings;
    } catch (error) {
      console.log(error);
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
    try {
      const response = await fetch(
        URL,
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
  try {
    const response = await fetch("https://v2.api.noroff.dev/auction/listings/" + id + "?_seller=true&_bids=true");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
  