import { fetchFact } from "../src/fetchFact.js";

test("fetchFact returns an array of cat facts", async () => {
    const facts = await fetchFact("cat", 2);
    expect(Array.isArray(facts)).toBe(true);
    expect(facts.length).toBe(2);
});