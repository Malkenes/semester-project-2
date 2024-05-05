const API_KEY = "b3fbab00-01a2-4a17-8c27-b7ef4796f389";
export async function getApiData(endpoint) {
  const options = {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
