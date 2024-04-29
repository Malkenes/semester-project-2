import { login } from ".";

global.localStorage = {
  setItem: jest.fn(),
};

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest
    .fn()
    .mockResolvedValue({ data: { accessToken: "mockAccessToken" } }),
});

global.document = {
  querySelector: jest.fn((selector) => {
    if (selector === "#auth-error") {
      return { style: { display: "block" } };
    }
  }),
};

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
      };
    });
    await login({});
    expect(document.querySelector("#auth-error").style.display).toBe("block");
  });
});
