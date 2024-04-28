const API_KEY = "b3fbab00-01a2-4a17-8c27-b7ef4796f389";
export async function login(data) {
  const options = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/login",
      options,
    );
    if (!response.ok) {
      const authError = document.querySelector("#auth-error");
      authError.style.display = "block";
    } else {
      const result = await response.json();
      localStorage.setItem("accessToken", result.data.accessToken);
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}
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
    if (!response.ok) {
      //const authError = document.querySelector("#auth-error");
      //authError.style.display = "block";
      console.log(response);
    } else {
      const { email, password } = data;
      login({ email, password });
    }
  } catch (error) {
    console.log(error);
  }
}

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
