import assert from 'assert';
import fs from 'fs';
import { saveFacts, loadStoredFacts } from '../src/storeFact.js';

// Mock fs
const originalExistsSync = fs.existsSync;
const originalReadFileSync = fs.readFileSync;
const originalWriteFileSync = fs.writeFileSync;

function mockFs(data) {
    fs.existsSync = () => true;
    fs.readFileSync = () => JSON.stringify(data);
    fs.writeFileSync = () => {};
}

function resetFs() {
    fs.existsSync = originalExistsSync;
    fs.readFileSync = originalReadFileSync;
    fs.writeFileSync = originalWriteFileSync;
}

// Test 1: Save new cat facts
function testSaveCatFacts() {
    mockFs({ cat: [] });

    saveFacts('cat', ["Cats are cute!"]);
    assert.strictEqual(fs.writeFileSync.called, true);
    assert.deepStrictEqual(JSON.parse(fs.writeFileSync.calls[0][1]), { cat: ["Cats are cute!"] });
    console.log('Test 1: Passed');
    resetFs();
}

// Test 2: Load stored facts
function testLoadStoredFacts() {
    mockFs({ cat: ["Cats are cute!"] });

    const result = loadStoredFacts();
    assert.deepStrictEqual(result, { cat: ["Cats are cute!"] });
    console.log('Test 2: Passed');
    resetFs();
}

// Run all tests
try {
    testSaveCatFacts();
    testLoadStoredFacts();
    console.log('All storeFact tests passed!');
} catch (error) {
    console.error('Test failed:', error.message);
}