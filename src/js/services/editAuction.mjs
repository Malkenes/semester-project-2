import { createMediaElement } from "../components/forms/addMedia.mjs";
import { createTagElement } from "../components/forms/addTag.mjs";
import { editListing, getAuction } from "./api/listings.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postParam = params.get("id");

export async function fillEditForm(form) {
    const auctionData = await getAuction(postParam);
    form.querySelector("input[name=title]").value = auctionData.data.title;
    form.querySelector("textarea").value = auctionData.data.description;
    const media = document.querySelector("#added-media");
    auctionData.data.media.forEach(image => {
        const mediaElement = createMediaElement(image.url,image.alt);
        media.append(mediaElement);
    })
    const tags = document.querySelector("#added-tags");
    auctionData.data.tags.forEach(tag => {
        const tagElement = createTagElement(tag);
        tags.append(tagElement);
    })
}
export function editListingListener(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const title = data.get("title");
    const description = data.get("description");
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
    editListing({title,description,media,tags},postParam);
    //createListing({title,description,media,tags,endsAt});

}