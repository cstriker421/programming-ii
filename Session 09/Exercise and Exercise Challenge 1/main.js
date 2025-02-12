const fs = require('fs');

function countWords(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf-8');

        const words = data.replace(/[^\w\s]/g, '').split(/\s+/);

        return words.length;
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        return 0;
    }
}

module.exports = countWords;

console.log(countWords('poem.txt')); // 6
console.log(countWords('test1.txt')); // 6
console.log(countWords('test2.txt')); // 5
console.log(countWords('test3.txt')); // 1