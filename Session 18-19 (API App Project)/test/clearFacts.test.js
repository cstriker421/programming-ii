import fs from 'fs';
import assert from 'assert';
import { clearFacts } from '../src/clearFacts.js';

const STORAGE_FILE = "facts.json";

// Helper function to reset the test file
function resetTestFile() {
    const initialData = { cat: ["Cats are cute"], dog: ["Dogs are loyal"] };
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(initialData, null, 2));
}

// Test 1: Clears facts for "cat"
function testClearCatFacts() {
    resetTestFile(); // Resets the file to initial state
    clearFacts('cat'); // Clears facts for "cat"

    const data = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf-8'));
    assert.deepStrictEqual(data.cat, [], 'Facts for "cat" should be cleared');
    assert.deepStrictEqual(data.dog, ["Dogs are loyal"], 'Facts for "dog" should remain unchanged');
    console.log('Test 1: Passed');
}

// Test 2: Clears facts for "dog"
function testClearDogFacts() {
    resetTestFile(); // Resets the file to initial state
    clearFacts('dog'); // Clears facts for "dog"

    const data = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf-8'));
    assert.deepStrictEqual(data.dog, [], 'Facts for "dog" should be cleared');
    assert.deepStrictEqual(data.cat, ["Cats are cute"], 'Facts for "cat" should remain unchanged');
    console.log('Test 2: Passed');
}

// Test 3: Do nothing if the file does not exist
function testFileDoesNotExist() {
    if (fs.existsSync(STORAGE_FILE)) {
        fs.unlinkSync(STORAGE_FILE); // Deletes the file if it exists
    }

    clearFacts('cat'); // Attempts to clear facts for "cat"

    assert.ok(!fs.existsSync(STORAGE_FILE), 'File should not exist after attempting to clear facts');
    console.log('Test 3: Passed');
}

// Run all tests
try {
    testClearCatFacts();
    testClearDogFacts();
    testFileDoesNotExist();
    console.log('All tests passed!');
} catch (error) {
    console.error('Test failed:', error.message);
}