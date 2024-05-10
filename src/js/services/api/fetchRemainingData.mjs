/**
 * Fetches remaining data from a paginated API endpoint.
 *
 * This function fetches data from a paginated API endpoint until all pages are retrieved.
 * It iterates through pages, appending data to the provided array until the last page is reached.
 *
 * @param {string} url - The base URL of the API endpoint.
 * @param {Array} data - The array to which fetched data will be appended.
 * @param {Object} options - Additional options to be passed to the fetch function.
 * @returns {Promise<void>} - A Promise that resolves when all data is fetched and appended.
 * @throws {Error} - Throws an error if the fetch request fails.
 *
 */
export async function fetchRemainingData(url, data, options) {
    let page = 1;
    let response;
    let result;
    while (true) {
        response = await fetch(`${url}&page=${page + 1}`,options);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        result = await response.json();
        data.push(...result.data);
        if (result.meta.isLastPage) {
            break;
        }
        page++;
    }
}