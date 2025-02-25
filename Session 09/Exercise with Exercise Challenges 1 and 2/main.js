const fs = require('fs');

function countWords(filename) {
    try {
        console.time('Processing Time');

        const data = fs.readFileSync(filename, 'utf-8').trim();

        if (!data) {
            console.timeEnd('Processing Time');
            return 0;
        }

        const cleanedData = data.replace(/[^\w\s]|_/g, ' ').replace(/\s+/g, ' ').trim();
        const words = cleanedData.split(' ');

        console.timeEnd('Processing Time');
        return words.length;
    } catch (error) {
        console.error(`Error reading file "${filename}":`, error.message);
        return 0;
    }
}

module.exports = countWords;