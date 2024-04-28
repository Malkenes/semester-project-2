import { login, register } from "../api/index.js";
import { verifyURL } from "../api/verifyUrl.mjs";
export function loginListener(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const email = data.get("email");
  const password = data.get("password");
  console.log(email, password);
  login({ email, password });
}

export function registerListener(event) {
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
  if (avatarUrl.trim() !== "" && verifyURL(avatarUrl)) {
    dataObject.avatar = { url: avatarUrl, alt: avatarAlt };
  }
  if (bannerUrl.trim() !== "" && verifyURL(bannerUrl)) {
    dataObject.banner = { url: bannerUrl, alt: bannerAlt };
  }
  console.log(dataObject);
  register(dataObject);
}
