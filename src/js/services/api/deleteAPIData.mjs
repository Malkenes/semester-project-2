import { API_BASE, API_KEY} from "../../constants.mjs";
export async function deleteApiData(id) {
    const options = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json"
      },
    };
    try {
      const response = await fetch(API_BASE + "auction/listings/" + id ,options);
      if (response.status === 204) {
        window.location.href = "/";
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
}  