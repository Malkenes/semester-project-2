import { createMediaElement } from "../components/forms/addMedia.mjs";
import { createTagElement } from "../components/forms/addTag.mjs";
import { clearLoadingIndicator, displayErrorMessage, displayLoadingIndicator } from "../utils/displayLoadingIndicator.mjs";
import { editListing, getAuction } from "./api/listings.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postParam = params.get("id");

export async function fillEditForm(form) {
    try {
        displayLoadingIndicator();
        const auctionData = await getAuction(postParam);
        if (auctionData.seller.name !== localStorage.getItem("name")) {
            throw new Error("Not your listing");
        }
        form.querySelector("input[name=title]").value = auctionData.title;
        form.querySelector("textarea").value = auctionData.description;
        const media = document.querySelector("#media-added");
        console.log(form);
        auctionData.media.forEach(image => {
            const mediaElement = createMediaElement(image.url,image.alt);
            media.append(mediaElement);
        })
        const tags = document.querySelector("#tags-added");
        auctionData.tags.forEach(tag => {
            const tagElement = createTagElement(tag);
            tags.append(tagElement);
        })
        clearLoadingIndicator();
    } catch (error) {
        console.log(error);
        displayErrorMessage(error);
    }
}
export async function editListingListener(e) {
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
    try {
        displayLoadingIndicator();
        editListing({title,description,media,tags},postParam);
        clearLoadingIndicator();
    } catch (error) {
        displayErrorMessage(error);
    }

}