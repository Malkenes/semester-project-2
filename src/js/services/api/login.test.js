import { login } from "./login.mjs";

global.localStorage = {
  setItem: jest.fn(),
};

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest
    .fn()
    .mockResolvedValue({ data: { accessToken: "mockAccessToken" } }),
});

describe("login function", () => {
  it("should login sucessfully and set accessToken in localStorage", async () => {
    const data = { email: "example@stud.noroff.no", password: "password" };
    await login(data);
    expect(fetch).toHaveBeenCalledWith("https://v2.api.noroff.dev/auth/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      "mockAccessToken",
    );
  });

  it("should handle authentication error", async () => {
    global.fetch.mockImplementationOnce(() => {
      return {
        ok: false,
        json: () =>
          Promise.resolve({ errors: [{ message: "Mock error message" }] }),
      };
    });
    await expect(login({})).rejects.toThrow("Mock error message");
  });
});
