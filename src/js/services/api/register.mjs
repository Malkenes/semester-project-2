import { login } from "./login.mjs";
import { API_BASE } from "../../constants.mjs";
export async function register(data) {
  const options = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${API_BASE}auth/register`,options);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors[0].message);
  } else {
    const { email, password} = data;
    login({ email, password});
  }
}
