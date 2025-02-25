import { saveFacts, loadStoredFacts } from "../src/storeFact.js";

test("saveFacts stores data correctly", () => {
    saveFacts("cat", ["Test cat fact"]);
    const data = loadStoredFacts();
    expect(data.cat.includes("Test cat fact")).toBe(true);
});