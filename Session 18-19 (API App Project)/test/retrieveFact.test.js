import { getStoredFacts } from "../src/retrieveFact.js";
import { loadStoredFacts } from "../src/storeFact.js";

jest.mock("../src/storeFact.js");

/**
 * Tests retrieveFact.js for fetching stored facts.
 */
describe("getStoredFacts", () => {
    test("returns formatted stored facts", () => {
        loadStoredFacts.mockReturnValue({ cat: ["Cats purr"], dog: [] });
        const result = getStoredFacts("cat");
        expect(result).toContain("🐱");
    });

    test("handles empty fact storage", () => {
        loadStoredFacts.mockReturnValue({ cat: [], dog: [] });
        const result = getStoredFacts("dog");
        expect(result).toBe("No stored dog facts found.");
    });
});