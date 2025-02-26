import { fetchFact } from "../src/fetchFact.js";
import fetch from "node-fetch";

jest.mock("node-fetch");

/**
 * Tests fetchFact.js for retrieving facts.
 */
describe("fetchFact", () => {
    const mockCatResponse = { data: ["Cats have whiskers!", "Cats love sleeping."] };
    const mockDogResponse = { facts: ["Dogs wag tails!", "Dogs love bones."] };

    test("fetches cat facts successfully", async () => {
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockCatResponse) });
        const result = await fetchFact("cat", 2);
        expect(result.rawFacts.length).toBe(2);
        expect(result.rawFacts).toEqual(mockCatResponse.data);
    });

    test("fetches dog facts successfully", async () => {
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockDogResponse) });
        const result = await fetchFact("dog", 2);
        expect(result.rawFacts.length).toBe(2);
        expect(result.rawFacts).toEqual(mockDogResponse.facts);
    });

    test("handles API errors", async () => {
        fetch.mockRejectedValue(new Error("API Failure"));
        const result = await fetchFact("cat");
        expect(result.rawFacts).toEqual([]);
        expect(result.formattedFacts).toEqual([]);
    });
});