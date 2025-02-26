import fetch from "node-fetch";
import chalk from "chalk";

const CAT_FACTS_URL = "https://meowfacts.herokuapp.com/";
const DOG_FACTS_URL = "https://dog-api.kinduff.com/api/facts";

/**
 * Fetches a random fact about cats or dogs.
 * @param {string} animal - "cat" or "dog"
 * @param {number} count - Number of facts to fetch (max 3)
 * @returns {Promise<string[]>} - Array of facts
 */
export async function fetchFact(animal, count = 1) {
    const url = animal === "cat" ? CAT_FACTS_URL : DOG_FACTS_URL;

    try {
        let facts = [];
        while (facts.length < count) {
            const response = await fetch(url);
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error(chalk.red(`❌  Error fetching ${animal} facts: Received non-JSON response.`));
                return { rawFacts: [], formattedFacts: [] };
            }
            const data = await response.json();
            const newFacts = animal === "cat" ? data.data : data.facts;
            facts = [...facts, ...newFacts].slice(0, count);
        }

        // Returns facts as an object: raw for saving, formatted for display
        return {
            rawFacts: facts, // For saving
            formattedFacts: facts.map((fact, index) => `${animal === "cat" ? "🐱" : "🐶"} ${index + 1}. ${fact}`) // For display
        };
    } catch (error) {
        console.error(chalk.red(`❌  Error fetching ${animal} facts:`, error.message));
        return { rawFacts: [], formattedFacts: [] };
    }
}