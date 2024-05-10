import { goToPage } from "../../services/searchService.mjs";

/**
 * Sets up pagination controls based on the current page and total number of pages.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 */
export function setPagination(currentPage,totalPages) {
    if (totalPages > 1) {
        const paginationContainerTop = document.querySelector("#search-page_top");
        const paginationContainerBottom = document.querySelector("#search-page_bottom");
        paginationContainerTop.innerHTML = "";
        paginationContainerBottom.innerHTML = "";
        const paginationBarTop = createPaginationBar(currentPage,totalPages);
        const paginationBarBottom = createPaginationBar(currentPage,totalPages);
        paginationContainerBottom.append(paginationBarBottom);
        paginationContainerTop.append(paginationBarTop);
        updatePagination(currentPage);
    }
    
}

/**
 * Creates a pagination bar element based on the current page and total number of pages.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @returns {HTMLUListElement} The created pagination bar element.
 */
function createPaginationBar(currentPage,totalPages) {
    const container = document.createElement("ul");
    container.classList.add("custom-pagination");
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            const listItem = createPaginationItem(i);
            container.append(listItem);
        }
    } else {
        if (currentPage <= 3) {
            for (let i = 1; i <= 5; i++) {
                const listItem = createPaginationItem(i);
                container.append(listItem);    
            }
        } else {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                const listItem = createPaginationItem(i);
                container.append(listItem);
            }     
        }
    }
    return container;
}

/**
 * Creates a pagination item element with a link to the specified page number.
 * @param {number} number - The page number for the pagination item.
 * @returns {HTMLLIElement} The created pagination item element.
 */
function createPaginationItem(number) {
    const listItem = document.createElement("li");
    listItem.classList.add("page-item");
    const link = document.createElement("a");
    link.classList.add("page-link");
    link.href = "#";
    link.textContent = `${number}`;
    link.addEventListener("click", () => {goToPage(number)});
    listItem.append(link);
    return listItem;
}

/**
 * Updates the visual representation of pagination based on the current page.
 * @param {number} currentPage - The current page number.
 */
function updatePagination(currentPage) {
    const pageItems = document.querySelectorAll(".page-item");
    pageItems.forEach(item => {
        if (item.textContent === String(currentPage)) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    })
}
