import { verifyURL } from "../../services/api/verifyUrl.mjs";

export async function addMedia(e) {
    e.preventDefault();
    const url = document.querySelector("#floating-media_url");
    const urlValue = url.value;
    const alt = document.querySelector("#floating-media_alt");
    const altValue = alt.value
    const mediaContainer = document.querySelector("#media-added");
    const currentMedia = mediaContainer.querySelectorAll("img");
    const MediaByURL = Array.from(currentMedia).map((media) => {
        return media.src;
    })
    if (await verifyURL(urlValue) && !MediaByURL.includes(urlValue)) {
        const mediaElement = createMediaElement(urlValue,altValue);
        mediaContainer.append(mediaElement);
        url.value = "";
        alt.value = "";
        url.classList.remove("is-invalid");
    }
    else {
        url.classList.add("is-invalid");
    }
}

export function createMediaElement(url,alt) {
    const container = document.createElement("span");
    container.style.height = "40px";
    container.style.width = "40px";
    container.classList.add("tag");
    const mediaElement = document.createElement("img");
    mediaElement.src = url;
    mediaElement.alt = alt;
    mediaElement.height = 40;
    mediaElement.width = 40;
    const removeBtn = document.createElement("button");
    container.append(mediaElement,removeBtn);
    removeBtn.onclick = function() {
        container.remove();
    }

    return container;
}