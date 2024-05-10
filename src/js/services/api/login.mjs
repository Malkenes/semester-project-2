import { clearLoadingIndicator, displayLoadingIndicator } from "../../utils/displayLoadingIndicator.mjs";

export async function login(data) {
  const options = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    displayLoadingIndicator();
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/login",
      options,
    );

    const result = await response.json();
    clearLoadingIndicator();
    if (!response.ok) {
      const authError = document.querySelector("#auth-error");
      authError.textContent = result.errors[0].message;
      authError.style.display = "block";
    } else {
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("name", result.data.name);
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}
