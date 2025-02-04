import fs from "fs";
import path from "path";

function csvToJson(inputFile = "input.csv", outputFile = "output.json", verbose = false) {
  try {
    // checks if the input file exists
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: File '${inputFile}' not found.`);
      process.exit(1);
    }

    // reads the file synchronously
    const data = fs.readFileSync(inputFile, "utf8").trim();

    // splits into rows
    const rows = data.split("\n");

    // extracts headers
    const headers = rows[0].split(",");

    // validates expected headers
    if (headers.length !== 3 || headers[0] !== "name" || headers[1] !== "email" || headers[2] !== "age") {
      console.error("Error: Invalid CSV format. Expected columns: name, email, age.");
      process.exit(1);
    }

    // processes data rows
    const result = rows.slice(1).map((row, index) => {
      const values = row.split(",");
      if (values.length !== 3) {
        if (verbose) console.warn(`Skipping row ${index + 1}: Missing fields`);
        return null;
      }

      const [name, email, age] = values;
      const ageNumber = Number(age);

      if (isNaN(ageNumber)) {
        if (verbose) console.warn(`Skipping row ${index + 1}: Invalid age '${age}'`);
        return null;
      }

      return { name, email, age: ageNumber };
    });

    // filters invalid fields
    const cleanedData = result.filter((item) => item !== null);

    // writes the output json file
    fs.writeFileSync(outputFile, JSON.stringify(cleanedData, null, 2), "utf8");

    console.log(`Successfully written to ${outputFile}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// command-line arguments handles
const args = process.argv.slice(2);
const inputArg = args.find((arg, i) => args[i - 1] === "--input") || "input.csv";
const outputArg = args.find((arg, i) => args[i - 1] === "--output") || "output.json";
const verboseFlag = args.includes("--verbose");

// function execution
csvToJson(inputArg, outputArg, verboseFlag);