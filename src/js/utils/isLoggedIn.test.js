import { isLoggedIn } from "./isLoggedIn.mjs";

global.localStorage = {
  getItem: jest.fn(),
};

describe("is logged in", () => {
  beforeEach(() => {
    localStorage.getItem.mockClear();
  });
  it("should return true if accessToken exist in localstorage", () => {
    localStorage.getItem.mockReturnValue("accessTokenValue");
    const result = isLoggedIn();
    expect(result).toBe(true);
  });

  it("should return false if accessToken does not exist in localstorage", () => {
    localStorage.getItem.mockReturnValue(null);
    const result = isLoggedIn();
    expect(result).toBe(false);
  });
});
