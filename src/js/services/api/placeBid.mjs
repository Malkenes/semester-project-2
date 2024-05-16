import { API_BASE, API_KEY } from "../../constants.mjs";

export async function placeBid(amount,id) {
    const options = {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(amount)
    };
    try {
        const response = await fetch(API_BASE + "auction/listings/" + id + "/bids", options);
        const results = await response.json();
        if (response.ok) {
            return results;
        } else {console.log(error);}
    } catch (error) {
        console.log(error);
    }
  
}