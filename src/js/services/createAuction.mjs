import { createListing } from "./api/listings.mjs";
export function listingListener(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const title = data.get("title");
    const description = data.get("description");
    const endsAt = new Date(data.get("datetime")).toISOString();
    let tags = [];
    const tagContainer = document.querySelector("#tags-added");
    const currentTags = Array.from(tagContainer.querySelectorAll("span")).map(currentTag => currentTag.textContent);
    if (currentTags.length > 0) {
      tags = currentTags;
    };
    let media = [];
    const mediaContainer = document.querySelector("#media-added");
    const currentMedia = mediaContainer.querySelectorAll("img");
    currentMedia.forEach(med => {
        media.push({url: med.src, alt: med.alt});
    })
    createListing({title,description,media,tags,endsAt});
  }
  