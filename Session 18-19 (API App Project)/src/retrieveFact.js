import { loadStoredFacts } from "./storeFact.js";

/**
 * Retrieves stored facts for a given animal.
 * @param {string} animal - "cat" or "dog"
 * @returns {string} - Formatted facts list or a message if empty.
 */
export function getStoredFacts(animal) {
    const data = loadStoredFacts(); // Load full storage object
    const facts = data[animal] || []; // Get relevant facts array

    if (!facts.length) {
        return `No stored ${animal} facts found.`;
    }

    const emoji = animal === "cat" ? "🐱" : "🐶";
    return `${emoji} ${animal.toUpperCase()} FACTS:\n` + 
           facts.map((fact, index) => `${index + 1}. ${fact}`).join("\n");
}