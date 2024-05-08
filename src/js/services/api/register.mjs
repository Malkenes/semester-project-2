import { login } from "./login.mjs";
export async function register(data) {
  const options = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/register",
      options,
    );
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      const authError = document.querySelector("#auth-error");
      authError.textContent = result.errors[0].message;
      authError.style.display = "block";
    } else {
      const { email, password } = data;
      login({ email, password });
    }
  } catch (error) {
    console.log(error);
  }
}
