import fetch from "node-fetch";

const CAT_FACTS_URL = "https://meowfacts.herokuapp.com/";
const DOG_FACTS_URL = "https://dog-api.kinduff.com/api/facts";

/**
 * Fetches a random fact about cats or dogs.
 * @param {string} animal - "cat" or "dog"
 * @param {number} count - Number of facts to fetch
 * @returns {Promise<string[]>} - Array of facts
 */
export async function fetchFact(animal, count = 1) {
    const url = animal === "cat" ? CAT_FACTS_URL : DOG_FACTS_URL;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return animal === "cat" ? data.data.slice(0, count) : data.facts.slice(0, count);
    } catch (error) {
        console.error(`Error fetching ${animal} facts:`, error.message);
        return [];
    }
}