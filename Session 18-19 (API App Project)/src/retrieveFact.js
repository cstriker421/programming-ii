import { loadStoredFacts } from "./storeFact.js";

export function getStoredFacts(animal) {
    const facts = loadStoredFacts(animal);
    if (!facts.length) {
        return "No stored facts.";
    }

    const emoji = animal === "cat" ? "🐱" : "🐶";
    return `${emoji} ${animal.toUpperCase()} FACTS:\n` + 
           facts.map((fact, index) => `${index + 1}. ${fact}`).join("\n");
}