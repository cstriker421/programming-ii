import { program } from "commander";
import { fetchFact } from "./src/fetchFact.js";
import { saveFacts } from "./src/storeFact.js";
import { getStoredFacts } from "./src/retrieveFact.js";
import { clearFacts } from "./src/clearFacts.js";

// CLI setup
program
  .option("--animal <type>", "Specify animal: cat or dog")
  .option("--random", "Fetch a single random fact")
  .option("--count <number>", "Fetch multiple facts (max: 3)", (value) => {
    const parsed = parseFloat(value); // Allows detection of decimal numbers
    if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1) {
      console.error("❌  Invalid --count value. Please enter a whole number greater than 0.");
      process.exit(1);
    }
    return parsed;
  })
  .option("--list", "List stored facts")
  .option("--clear", "Clear stored facts")
  .parse(process.argv);

const options = program.opts();

// Normalises the animal input
const animal = options.animal?.trim().toLowerCase();

// Validates the animal argument
if (!animal || !["cat", "dog"].includes(animal)) {
  console.error("❌  Invalid or missing --animal option. Use --animal <cat|dog>");
  process.exit(1);
}

const { random, count, list, clear } = options;

// Handles commands
if (list) {
  console.log(getStoredFacts(animal));
} else if (clear) {
  clearFacts(animal);
  console.log(`✔️  Cleared all stored ${animal} facts.`);
} else if (random || count) {
  const fetchCount = Math.min(count || 1, 3); // limits to max three facts

  fetchFact(animal, fetchCount).then(({ rawFacts, formattedFacts }) => {
    if (formattedFacts.length) {
      console.log(formattedFacts.join("\n")); // Shows formatted facts with emoji & numbering
      saveFacts(animal, rawFacts); // Saves only raw facts
    }
  }).catch(err => {
    console.error("❌  Error fetching facts:", err.message);
  });
} else {
  console.error("❌  Invalid option. Use --help for available commands.");
}