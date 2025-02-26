import fetch from "node-fetch";

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
    count = Math.min(count, 3); // Ensure max count is 3

    try {
        let facts = [];
        while (facts.length < count) {
            const response = await fetch(url);
            const data = await response.json();
            const newFacts = animal === "cat" ? data.data : data.facts;
            facts = [...facts, ...newFacts].slice(0, count);
        }
        return facts;
    } catch (error) {
        console.error(`Error fetching ${animal} facts:`, error.message);
        return [];
    }
}