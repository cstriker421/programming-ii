const assert = require('assert');
const countWords = require('./main');
const fs = require('fs');

const logFile = 'testResults.txt';

if (fs.existsSync(logFile)) {
    fs.unlinkSync(logFile);
}

function logResult(message) {
    console.log(message);
    fs.appendFileSync(logFile, message + '\n');
}

logResult('=== Word Counter Test Results ===');

const tests = [
    { file: 'poem.txt', content: 'Roses are red, violets are blue.', expected: 6 }, // 6
    { file: 'test1.txt', content: 'Hello world! This is a test.', expected: 5 },    // it finds 6, and I don't have a clue why
    { file: 'test2.txt', content: '  Hello   world    again!  ', expected: 3 },     // 3
    { file: 'test3.txt', content: '', expected: 0 }                                 // 0
];

for (const { file, content, expected } of tests) {
    fs.writeFileSync(file, content);
    const wordCount = countWords(file);
    const result = wordCount === expected ? 'Passed' : `Failed (Expected ${expected}, got ${wordCount})`;
    logResult(result);
}

const missingFileTest = countWords('missing.txt') === 0 ? 'Passed' : 'Failed';
logResult(missingFileTest);

logResult('=== All tests completed! ===');