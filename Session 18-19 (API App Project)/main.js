import { program } from "commander";
import { fetchFact } from "./src/fetchFact.js";
import { saveFacts } from "./src/storeFact.js";
import { getStoredFacts } from "./src/retrieveFact.js";
import { clearFacts } from "./src/clearFacts.js";
import { fetchImage } from "./src/fetchImage.js";
import chalk from "chalk";

// CLI setup
program
  .option("--animal <type>", "Specify animal: cat, dog, or fox (fox only for images)")
  .option("--anim", "Allow animated images (GIFs & MP4s)")
  .option("--clear", "Clear stored facts (not available for foxes)")
  .option("--count <number>", "Fetch multiple facts (max: 3, not available for foxes)", (value) => {
    const parsed = parseFloat(value);
    if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1) {
      console.error(chalk.red("❌  Invalid --count value. Please enter a whole number greater than 0."));
      process.exit(1);
    }
    return parsed;
  })
  .option("--image", "Fetch and open a random image")
  .option("--list", "List stored facts (not available for foxes)")
  .option("--random", "Fetch a single random fact (not available for foxes)")
  .parse(process.argv);

const options = program.opts();

// Normalises the animal input
const animal = options.animal?.trim().toLowerCase();

// Restricts foxes from facts-related commands
if (!animal || !["cat", "dog", "fox"].includes(animal)) {
  console.error(chalk.red("❌  Invalid or missing --animal option. Use --animal <cat|dog|fox>"));
  process.exit(1);
}

// Shows error if the user selects fox for anything other than --image.
if (animal === "fox" && (options.random || options.count || options.list || options.clear)) {
  console.error(chalk.red("❌  Fox facts are not available. You can only use --image with --animal fox."));
  process.exit(1);
}

const { random, count, list, clear, image, anim } = options;

// Handles image fetching (for cat, dog, fox)
if (image) {
  fetchImage(animal, anim ? "animated" : "static");
}

// Handles fact retrieval & management (cat & dog only)
else if (list) {
  console.log(getStoredFacts(animal));
} else if (clear) {
  clearFacts(animal);
  console.log(chalk.green(`✔️  Cleared all stored ${animal} facts.`));
} else if (random || count) {
  let fetchCount = count || 1; // Defaults to 1 if no count is specified

  // Checks count limit before fetching
  if (fetchCount > 3) {
    console.warn(chalk.yellow(`⚠️  You requested ${fetchCount} facts, but the maximum allowed is 3. Only 3 facts will be fetched.\n`));
    fetchCount = 3;
  }

  fetchFact(animal, fetchCount).then(({ rawFacts, formattedFacts }) => {
    if (formattedFacts.length) {
      console.log(chalk.cyan(formattedFacts.join("\n"))); // Shows formatted facts with emoji & numbering
      saveFacts(animal, rawFacts); // Saves only raw facts
    }
  }).catch(err => {
    console.error(chalk.red("❌  Error fetching facts:", err.message));
  });
} else {
  console.error(chalk.red("❌  Invalid option. Use --help for available commands."));
}