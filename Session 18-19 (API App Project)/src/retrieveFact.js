import { loadStoredFacts } from "./storeFact.js";

/**
 * Gets stored facts for an animal.
 * @param {string} animal - "cat" or "dog"
 * @returns {string[]} - List of stored facts
 */
export function getStoredFacts(animal) {
    const data = loadStoredFacts();
    return data[animal];
}