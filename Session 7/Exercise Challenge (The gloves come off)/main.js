import https from 'https';
import fs from 'fs';
import zlib from 'zlib';
import readline from 'readline';

const URL = 'https://bulk.openweathermap.org/snapshot/weather_14.json.gz?appid=387320aba377a04228f1963886c713f4';
const ZIP_FILE = 'weather_data.json.gz';
const JSON_FILE = 'weather_data.json';

function downloadFile(url, outputPath) {
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP Error: ${response.statusCode}`));
                return;
            }
            if (response.headers['content-type'] !== 'application/gzip') {
                reject(new Error('Invalid file format (not gzip)'));
                return;
            }
            const file = fs.createWriteStream(outputPath);
            response.pipe(file);
            file.on('finish', () => file.close(resolve));
        }).on('error', reject);
    });
}

function extractGzip(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        const unzip = zlib.createGunzip();
        const input = fs.createReadStream(inputPath);
        const output = fs.createWriteStream(outputPath);
        input.pipe(unzip).pipe(output);
        output.on('finish', resolve);
        output.on('error', reject);
    });
}

function processWeatherData(criteria) {
    const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
    const cities = data.map(entry => ({
        name: entry.city.name,
        temp: entry.main.temp,
        humidity: entry.main.humidity
    }));

    let sortedCities;
    switch (criteria) {
        case 'coldest':
            sortedCities = cities.sort((a, b) => a.temp - b.temp);
            break;
        case 'warmest':
            sortedCities = cities.sort((a, b) => b.temp - a.temp);
            break;
        case 'wettest':
            sortedCities = cities.sort((a, b) => b.humidity - a.humidity);
            break;
        case 'driest':
            sortedCities = cities.sort((a, b) => a.humidity - b.humidity);
            break;
        default:
            console.log('Invalid criteria. Please enter: coldest, warmest, wettest, or driest.');
            return;
    }

    console.log(`Top 3 ${criteria} cities:`);
    console.log(sortedCities.slice(0, 3));
}

async function main() {
    if (!fs.existsSync(JSON_FILE)) {
        console.log('Downloading weather data...');
        await downloadFile(URL, ZIP_FILE);
        console.log('Extracting data...');
        await extractGzip(ZIP_FILE, JSON_FILE);
        console.log('Data ready.');
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter query (coldest, warmest, wettest, driest): ', criteria => {
        processWeatherData(criteria.trim().toLowerCase());
        rl.close();
    });
}

main().catch(err => console.error('Error:', err));