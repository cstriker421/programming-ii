import assert from 'assert';
import { getStoredFacts } from '../src/retrieveFact.js';
import { loadStoredFacts } from '../src/storeFact.js';

// Mock loadStoredFacts
const originalLoadStoredFacts = loadStoredFacts;

function mockLoadStoredFacts(data) {
    loadStoredFacts = () => data;
}

function resetLoadStoredFacts() {
    loadStoredFacts = originalLoadStoredFacts;
}

// Test 1: Retrieve formatted cat facts
function testRetrieveCatFacts() {
    mockLoadStoredFacts({ cat: ["Cats are cute!"] });

    const result = getStoredFacts('cat');
    assert.strictEqual(result, "🐱 CAT FACTS:\n1. Cats are cute!");
    console.log('Test 1: Passed');
    resetLoadStoredFacts();
}

// Test 2: Handle no stored facts
function testNoStoredFacts() {
    mockLoadStoredFacts({ cat: [] });

    const result = getStoredFacts('cat');
    assert.strictEqual(result, "No stored cat facts found.");
    console.log('Test 2: Passed');
    resetLoadStoredFacts();
}

// Run all tests
try {
    testRetrieveCatFacts();
    testNoStoredFacts();
    console.log('All retrieveFact tests passed!');
} catch (error) {
    console.error('Test failed:', error.message);
}