import { program } from "commander";
import { fetchFact } from "./src/fetchFact.js";
import { saveFacts, loadStoredFacts } from "./src/storeFact.js";
import { getStoredFacts } from "./src/retrieveFact.js";
import { clearFacts } from "./src/clearFacts.js";

// CLI setup
program
  .option("--animal <type>", "Specify animal: cat or dog")
  .option("--random", "Fetch a single random fact")
  .option("--count <number>", "Fetch multiple facts", parseInt)
  .option("--list", "List stored facts")
  .option("--clear", "Clear stored facts")
  .parse(process.argv);

const options = program.opts();

if (!options.animal || !["cat", "dog"].includes(options.animal)) {
  console.log("Invalid or missing --animal option. Use --animal <cat|dog>");
  process.exit(1);
}

const { animal, random, count, list, clear } = options;

// Handle commands
if (list) {
  const storedFacts = getStoredFacts(animal);
  console.log(`Stored ${animal} facts:`);
  console.log(storedFacts.length ? storedFacts.join("\n") : "No stored facts.");
} else if (clear) {
  clearFacts(animal);
  console.log(`Cleared all stored ${animal} facts.`);
} else if (random || count) {
  fetchFact(animal, count || 1).then(facts => {
    if (facts.length) {
      console.log(facts.join("\n"));
      saveFacts(animal, facts);
    }
  });
} else {
  console.log("Invalid option. Use --help for available commands.");
}