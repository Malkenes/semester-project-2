import { displayLoadingIndicator, clearLoadingIndicator } from "../../utils/displayLoadingIndicator.mjs";
import { register } from "../api/register.mjs";
import { verifyURL } from "../api/verifyUrl.mjs";

export async function registerListener(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const bio = data.get("bio");
    const avatarUrl = data.get("avatar_url");
    const avatarAlt = data.get("avatar_alt");
    const bannerUrl = data.get("banner_url");
    const bannerAlt = data.get("banner_alt");
    const dataObject = { name, email, password, bio };
    if (avatarUrl.trim() !== "" && (await verifyURL(avatarUrl))) {
      dataObject.avatar = { url: avatarUrl, alt: avatarAlt };
    }
    if (bannerUrl.trim() !== "" && (await verifyURL(bannerUrl))) {
      dataObject.banner = { url: bannerUrl, alt: bannerAlt };
    }
    try {
      displayLoadingIndicator();
      await register(dataObject);
    } catch (error) {
      clearLoadingIndicator();
      const authError = document.querySelector("#auth-error");
      authError.textContent = error;
      authError.style.display = "block";  
    }
  }
  