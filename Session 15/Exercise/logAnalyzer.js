import fs from "fs";
import readline from "readline";
import { saveToJsonFile } from "./saveJson.js";

export function analyzeLog(csvFilePath) {
    const counts = {};

    const fileStream = fs.createReadStream(csvFilePath, { encoding: "utf8" });
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    rl.on("line", (line) => {
        const values = line.split(",");
        values.forEach((value) => {
            const trimmedValue = value.trim();
            counts[trimmedValue] = (counts[trimmedValue] || 0) + 1;
        });
    });

    rl.on("close", () => {
        console.log("Processed CSV Data:", JSON.stringify(counts, null, 2));
        saveToJsonFile(counts);
    });
}