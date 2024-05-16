import { API_BASE,API_KEY } from "../../constants.mjs";
export async function getProfile(name) {
  const options = {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(API_BASE + "auction/profiles/" + name,options);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors[0].message);
  } else {
    return result.data;
  }
}

export async function profileListings(name) {
  const options = {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(API_BASE + "auction/profiles/" + name + "/listings?_bids=true",options);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors[0].message);
  } else {
    return result.data;
  }
}
export async function editProfile(data,name) {
  const options = {
    method: "put",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(API_BASE + "auction/profiles/" + name,options);
  if (!response.ok) {
    throw new Error("something went wrong");
  } else {
    window.location.href = "/profile.html?name=" + name;
  }
}