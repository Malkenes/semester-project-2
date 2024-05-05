import { editProfile, getProfile } from "./api/profile.mjs";
import { verifyURL } from "./api/verifyUrl.mjs";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postParam = params.get("name");

export async function fillProfileEditForm(form) {
    const profileData = await getProfile(postParam);
    form.querySelector("#floating-name").value = profileData.name;
    form.querySelector("#bio").value = profileData.bio;
    form.querySelector("#avatar_img").src = profileData.avatar.url;
    form.querySelector("#floating-avatar_url").value = profileData.avatar.url;
    form.querySelector("#floating-avatar_alt").value = profileData.avatar.alt;
    form.querySelector("#banner_img").src = profileData.banner.url;
    form.querySelector("#floating-banner_url").value = profileData.banner.url;
    form.querySelector("#floating-banner_alt").value = profileData.banner.alt;
}

export async function editProfileListener(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const bio = data.get("bio");
    const avatarUrl = data.get("avatar_url");
    const avatarAlt = data.get("avatar_alt");
    const bannerUrl = data.get("banner_url");
    const bannerAlt = data.get("banner_alt");
    const dataObject = { bio };
    if (avatarUrl.trim() !== "" && (await verifyURL(avatarUrl))) {
      dataObject.avatar = { url: avatarUrl, alt: avatarAlt };
    }
    if (bannerUrl.trim() !== "" && (await verifyURL(bannerUrl))) {
      dataObject.banner = { url: bannerUrl, alt: bannerAlt };
    }
    editProfile(dataObject,postParam);
}