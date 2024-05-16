export function addTag(e) {
    e.preventDefault();
    const tagInput = document.querySelector("#tag-input");
    const tag = tagInput.value.trim();
    const tagContainer = document.querySelector("#tags-added");
    const currentTags = tagContainer.querySelectorAll("span");
    const tagsByName = Array.from(currentTags).map((currentTag) => {
        return currentTag.textContent;
    })
    if (tag !== "" && !tagsByName.includes(tag)) {
        const tagElement = createTagElement(tag);
        tagContainer.append(tagElement);
    }
    tagInput.value = "";
}

export function createTagElement(tag) {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    tagElement.classList.add("tag");
    const removeTagButton = document.createElement("button");
    tagElement.append(removeTagButton);
    removeTagButton.onclick = function() {
        tagElement.remove();
    }
    return tagElement;
}