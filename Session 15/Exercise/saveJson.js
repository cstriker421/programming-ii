import fs from "fs";

export function saveToJsonFile(newData) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outputJsonPath = `./output-${timestamp}.json`; 

    fs.writeFileSync(outputJsonPath, JSON.stringify(newData, null, 2), "utf8");
    console.log(`Saved output to ${outputJsonPath}`);
}