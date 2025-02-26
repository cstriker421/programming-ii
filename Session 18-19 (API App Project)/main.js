import { program } from "commander";
import { fetchFact } from "./src/fetchFact.js";
import { saveFacts } from "./src/storeFact.js";
import { getStoredFacts } from "./src/retrieveFact.js";
import { clearFacts } from "./src/clearFacts.js";
import { fetchImage } from "./src/fetchImage.js";

// CLI setup
program
  .option("--animal <type>", "Specify animal: cat, dog, or fox (fox only for images)")
  .option("--random", "Fetch a single random fact (not available for foxes)")
  .option("--count <number>", "Fetch multiple facts (max: 3, not available for foxes)", (value) => {
    const parsed = parseFloat(value);
    if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1) {
      console.error("❌  Invalid --count value. Please enter a whole number greater than 0.");
      process.exit(1);
    }
    return parsed;
  })
  .option("--image", "Fetch and open a random image")
  .option("--anim", "Allow animated images (GIFs & MP4s)")
  .option("--list", "List stored facts (not available for foxes)")
  .option("--clear", "Clear stored facts (not available for foxes)")
  .parse(process.argv);

const options = program.opts();

// Normalize the animal input
const animal = options.animal?.trim().toLowerCase();

// **Restricts foxes from facts-related commands**
if (!animal || !["cat", "dog", "fox"].includes(animal)) {
  console.error("❌  Invalid or missing --animal option. Use --animal <cat|dog|fox>");
  process.exit(1);
}

// Shows error if the user selects fox for anything other than --image.
if (animal === "fox" && (options.random || options.count || options.list || options.clear)) {
  console.error("❌  Fox facts are not available. You can only use --image with --animal fox.");
  process.exit(1);
}

const { random, count, list, clear, image, anim } = options;

// **Handles Image Fetching (for cat, dog, fox)**
if (image) {
  fetchImage(animal, anim ? "animated" : "static");
}

// **Handles fact retrieval & management (cat & dog only)**
else if (list) {
  console.log(getStoredFacts(animal));
} else if (clear) {
  clearFacts(animal);
  console.log(`✔️  Cleared all stored ${animal} facts.`);
} else if (random || count) {
  let fetchCount = count || 1; // Defaults to 1 if no count is specified

  // **CHECK COUNT LIMIT HERE BEFORE FETCHING**
  if (fetchCount > 3) {
    console.warn(`⚠️  You requested ${fetchCount} facts, but the maximum allowed is 3. Only 3 facts will be fetched.\n`);
    fetchCount = 3;
  }

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