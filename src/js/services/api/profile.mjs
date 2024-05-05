import { API_BASE,API_KEY } from "../../constants.mjs";
export async function getProfile(name) {
    try {
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
      return result.data;
    } catch (error) {
      console.log(error);
    } 
}

export async function profileListings(name) {
  try {
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
    return result.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await fetch(API_BASE + "auction/profiles/" + name,options);
    if (response.ok) {
      window.location.href = "/profile.html?name=" + name;
    }
  } catch (error) {
    console.log(error);
  }
}