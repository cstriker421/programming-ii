import { program } from "commander";
import { fetchFact } from "./src/fetchFact.js";
import { saveFacts } from "./src/storeFact.js";
import { getStoredFacts } from "./src/retrieveFact.js";
import { clearFacts } from "./src/clearFacts.js";

// CLI setup
program
  .option("--animal <type>", "Specify animal: cat or dog")
  .option("--random", "Fetch a single random fact")
  .option("--count <number>", "Fetch multiple facts (max: 3)", parseInt)
  .option("--list", "List stored facts")
  .option("--clear", "Clear stored facts")
  .parse(process.argv);

const options = program.opts();

// Normalize the animal input
const animal = options.animal?.trim().toLowerCase();

// Validate the animal argument
if (!animal || !["cat", "dog"].includes(animal)) {
  console.error("❌ Invalid or missing --animal option. Use --animal <cat|dog>");
  process.exit(1);
}

const { random, count, list, clear } = options;

// Handle commands
if (list) {
  console.log(getStoredFacts(animal));
} else if (clear) {
  clearFacts(animal);
  console.log(`✔️ Cleared all stored ${animal} facts.`);
} else if (random || count) {
  const fetchCount = Math.min(count || 1, 3); // limit to max three facts

  fetchFact(animal, fetchCount).then(facts => {
    if (facts.length) {
      console.log(facts.join("\n"));
      saveFacts(animal, facts);
    }
  }).catch(err => {
    console.error("❌ Error fetching facts:", err.message);
  });
} else {
  console.error("❌ Invalid option. Use --help for available commands.");
}
