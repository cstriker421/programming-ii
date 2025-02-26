import { loadStoredFacts } from "./storeFact.js";
import chalk from "chalk";

/**
 * Retrieves stored facts for a given animal.
 * @param {string} animal - "cat" or "dog"
 * @returns {string} - Formatted facts list or a message if empty.
 */
export function getStoredFacts(animal) {
    const data = loadStoredFacts(); // Loads full storage object
    const facts = data[animal] || []; // Gets relevant facts array

    if (!facts.length) {
        return chalk.yellow(`No stored ${animal} facts found.`);
    }

    const emoji = animal === "cat" ? "🐱" : "🐶";
    return chalk.blue(`${emoji} ${animal.toUpperCase()} FACTS:\n`) + 
           facts.map((fact, index) => `${index + 1}. ${fact}`).join("\n");
}