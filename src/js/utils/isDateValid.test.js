import { isDateValid } from "./isDateValid.mjs";

describe("is date Valid function", () => {
  it("should return true if date is after current date", () => {
    const date = new Date();
    date.setTime(date.getTime() + 10000);
    date.toISOString();
    const result = isDateValid(date);
    expect(result).toBe(true);
  });

  it("should return false if date is after current date", () => {
    const date = new Date();
    date.setTime(date.getTime() - 10000);
    date.toISOString();
    const result = isDateValid(date);
    expect(result).toBe(false);
  });
});
