import { getStoredFacts } from "../src/retrieveFact.js";

test("getStoredFacts retrieves stored facts", () => {
    const facts = getStoredFacts("cat");
    expect(Array.isArray(facts)).toBe(true);
});