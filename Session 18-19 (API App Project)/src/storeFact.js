import fs from "fs";

const STORAGE_FILE = "facts.json";

/**
 * Loads stored facts from JSON file.
 * @returns {object} - { cat: [], dog: [] }
 */
export function loadStoredFacts() {
    if (fs.existsSync(STORAGE_FILE)) {
        return JSON.parse(fs.readFileSync(STORAGE_FILE, "utf-8"));
    }
    return { cat: [], dog: [] };
}

/**
 * Saves new facts to storage.
 * @param {string} animal - "cat" or "dog"
 * @param {string[]} facts - Facts to store
 */
export function saveFacts(animal, facts) {
    const data = loadStoredFacts();
    data[animal] = [...data[animal], ...facts];
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
}
