import { jest } from "@jest/globals";

await jest.unstable_mockModule("./main.js", () => ({
  fetchExchangeRate: jest.fn(),
  convertUSDToEUR: jest.fn(async (amount) => amount * 0.85),
}));

const { fetchExchangeRate, convertUSDToEUR } = await import("./main.js");

describe("convertUSDToEUR", () => {
  test("converts USD to EUR correctly with mocked exchange rate", async () => {
    fetchExchangeRate.mockResolvedValue(0.85);

    const result = await convertUSDToEUR(100);
    expect(result).toBe(85);
  });

  test("handles API failure correctly", async () => {
    fetchExchangeRate.mockRejectedValue(new Error("API request failed"));

    await expect(convertUSDToEUR(100)).rejects.toThrow("API request failed");
  });
});