/**
 * Displays a loading indicator on the page.
 * This function creates a loading indicator element and appends it to the main element of the document.
 * @returns {void}
 */
export function displayLoadingIndicator() {
    const main = document.querySelector("main");
    main.classList.add("position-relative");
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.classList.add("position-absolute","bg-white", "h-100", "w-100", "top-0", "z-3");
    const textContainer = document.createElement("div");
    textContainer.id = "inside-loader";
    textContainer.classList.add("position-fixed", "top-50", "start-50", "translate-middle");
    const spinner = document.createElement("span");
    spinner.id = "spinner";
    textContainer.append(spinner);
    loader.append(textContainer);
    main.append(loader);
}

/**
 * Removes the loading indicator from the page.
 * This function removes the loading indicator element from the document.
 * @returns {void}
 */
export function clearLoadingIndicator() {
    const loader = document.querySelector("#loader");
    loader.remove();
}

/**
 * Displays an error message inside the loading indicator.
 * This function updates the content of the loading indicator element with the provided error message text,
 * and applies styling to indicate an error state.
 * @param {string} text - The error message text to display.
 * @returns {void}
 */
export function displayErrorMessage(text) {
    const loader = document.querySelector("#inside-loader");
    loader.classList.add("bg-danger-subtle", "p-3", "border", "border-danger");
    loader.textContent = text;
}