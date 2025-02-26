import fs from "fs";

const STORAGE_FILE = "facts.json";

/**
 * Clears stored facts for a specific animal.
 * @param {string} animal - "cat" or "dog"
 */
export function clearFacts(animal) {
    if (fs.existsSync(STORAGE_FILE)) {
        const data = JSON.parse(fs.readFileSync(STORAGE_FILE, "utf-8"));
        data[animal] = [];
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
    }
}