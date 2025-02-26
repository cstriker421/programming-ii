import { loadStoredFacts, saveFacts } from "../src/storeFact.js";
import fs from "fs";

jest.mock("fs");

/**
 * Tests storeFact.js for storing and retrieving facts.
 */
describe("storeFact", () => {
    test("loads existing facts", () => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify({ cat: ["Cats are fluffy"], dog: ["Dogs bark"] }));

        const data = loadStoredFacts();
        expect(data.cat).toContain("Cats are fluffy");
        expect(data.dog).toContain("Dogs bark");
    });

    test("saves new facts", () => {
        fs.existsSync.mockReturnValue(false);
        fs.writeFileSync.mockImplementation(() => {});

        saveFacts("cat", ["New cat fact"]);
        expect(fs.writeFileSync).toHaveBeenCalledWith("facts.json", JSON.stringify({ cat: ["New cat fact"], dog: [] }, null, 2));
    });
});