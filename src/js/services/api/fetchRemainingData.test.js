import { fetchRemainingData } from "./fetchRemainingData.mjs";

global.fetch = jest.fn();

describe("fetch remaining data", () => {
  it("fetches remaing data from paginated API", async () => {
    const url = "https://example.com/api/data";
    const data = [];
    const options = {};

    const mockResponse = (page, data, isLastPage) => ({
      ok: true,
      json: async () => ({
        data,
        meta: { isLastPage },
      }),
    });

    global.fetch.mockImplementation((url) => {
      const page = parseInt(url.match(/page=(\d+)/)[1]);
      const responseData = page === 2 ? [1, 2, 3] : [4, 5, 6];
      const isLastPage = page === 3;
      return mockResponse(page, responseData, isLastPage);
    });

    await fetchRemainingData(url, data, options);

    expect(data).toEqual([1, 2, 3, 4, 5, 6]);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/api/data&page=2",
      options,
    );
  });
  it("throws an error if fetch fails", async () => {
    const url = "https://example.com/api/data";
    const data = [];
    const options = {};

    global.fetch.mockRejectedValue(new Error("Failed to fetch"));

    await expect(fetchRemainingData(url, data, options)).rejects.toThrow(
      "Failed to fetch",
    );
  });
});
