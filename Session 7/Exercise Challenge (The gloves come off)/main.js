import fs from "fs";
import https from "https";
import zlib from "zlib";

const URL = "https://bulk.openweathermap.org/sample/weather_14.json.gz";
const GZ_FILE = "weather_14.json.gz";
const JSON_FILE = "weather_14.json";
const FIXED_JSON = "fixed_weather.json";
const kToC = (kelvin) => (kelvin - 273.15).toFixed(1);

const getOrdinal = (num) => {
    if (num === 1) return "1st";
    if (num === 2) return "2nd";
    if (num === 3) return "3rd";
    return `${num}th`;
};

// check if file exists and is less than 1 hour old
const isFresh = (file) => {
    if (!fs.existsSync(file)) return false;
    const stats = fs.statSync(file);
    return (Date.now() - stats.mtimeMs) < 3600000; // 1 hour in ms
};

const downloadFile = (url, dest, callback) => {
    console.log("Downloading latest weather data...");
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
            file.close(callback);
        });
    }).on("error", (err) => {
        fs.unlink(dest, () => {}); // deletes partial file
        console.error("Download error:", err.message);
    });
};

const extractGzip = (input, output, callback) => {
    console.log("Extracting weather data...");
    const readStream = fs.createReadStream(input);
    const writeStream = fs.createWriteStream(output);
    const gunzip = zlib.createGunzip();

    readStream.pipe(gunzip).pipe(writeStream).on("finish", callback).on("error", (err) => {
        console.error("Extraction error:", err.message);
    });
};

const fixJson = (input, output) => {
    console.log("🛠 Fixing JSON format...");
    try {
        const rawData = fs.readFileSync(input, "utf-8");
        const fixedJson = rawData
            .trim()
            .split("\n")
            .map(line => JSON.parse(line));
        fs.writeFileSync(output, JSON.stringify(fixedJson, null, 2));
        console.log("JSON successfully fixed.");
    } catch (error) {
        console.error("JSON Fixing Error:", error.message);
    }
};

const getTop3Cities = (category) => {
    if (!fs.existsSync(FIXED_JSON)) {
        console.error("No valid weather data found. Run the script to download first.");
        return;
    }
    
    const data = JSON.parse(fs.readFileSync(FIXED_JSON, "utf-8"));

    let key, ascending;
    switch (category) {
        case "coldest": key = "temp"; ascending = true; break;
        case "warmest": key = "temp"; ascending = false; break;
        case "wettest": key = "humidity"; ascending = false; break;
        case "driest": key = "humidity"; ascending = true; break;
        default:
            console.error("Invalid category. Choose: coldest, warmest, wettest, driest.");
            return;
    }

    // sort data
    const top3 = data.map(entry => ({
        rank: "", // placeholder for ranking
        city: entry.city.name,
        temp: kToC(entry.main.temp),
        humidity: entry.main.humidity
    }))
    .sort((a, b) => ascending ? a[key] - b[key] : b[key] - a[key])
    .slice(0, 3)
    .reverse(); // reverse so 1st is at the bottom for proper ranking

    // assign ranks dynamically
    top3.forEach((entry, index) => {
        entry.rank = getOrdinal(top3.length - index);
    });

    console.log(`Top 3 ${category} cities:`);
    console.table(top3, ["rank", "city", "temp", "humidity"]);
};

//
if (!isFresh(FIXED_JSON)) {
    console.log("Data is outdated or missing. Fetching new data...");
    downloadFile(URL, GZ_FILE, () => {
        extractGzip(GZ_FILE, JSON_FILE, () => {
            fixJson(JSON_FILE, FIXED_JSON);
            runUserQuery(); //
        });
    });
} else {
    console.log("Data is fresh. No need to redownload.");
    runUserQuery();
}

function runUserQuery() {
    const category = process.argv[2]; //
    if (!category) {
        console.error("No category specified. Usage: node script.js <coldest|warmest|wettest|driest>");
        return;
    }
    getTop3Cities(category);
}