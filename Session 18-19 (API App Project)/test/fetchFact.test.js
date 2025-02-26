import assert from 'assert';
import { fetchFact } from '../src/fetchFact.js';

// Mock fetch
const originalFetch = global.fetch;

function mockFetch(response) {
    global.fetch = () => Promise.resolve({
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve(response)
    });
}

function resetFetch() {
    global.fetch = originalFetch;
}

// Test 1: Fetch a cat fact
function testFetchCatFact() {
    mockFetch({ data: ["Cats are cute!"] });

    fetchFact('cat', 1).then(result => {
        assert.deepStrictEqual(result.rawFacts, ["Cats are cute!"]);
        assert.deepStrictEqual(result.formattedFacts, ["🐱 1. Cats are cute!"]);
        console.log('Test 1: Passed');
    }).catch(error => {
        console.error('Test 1: Failed', error);
    }).finally(resetFetch);
}

// Test 2: Fetch a dog fact
function testFetchDogFact() {
    mockFetch({ facts: ["Dogs are loyal!"] });

    fetchFact('dog', 1).then(result => {
        assert.deepStrictEqual(result.rawFacts, ["Dogs are loyal!"]);
        assert.deepStrictEqual(result.formattedFacts, ["🐶 1. Dogs are loyal!"]);
        console.log('Test 2: Passed');
    }).catch(error => {
        console.error('Test 2: Failed', error);
    }).finally(resetFetch);
}

// Test 3: Handle fetch errors
function testFetchError() {
    global.fetch = () => Promise.reject(new Error('Network error'));

    fetchFact('cat', 1).then(result => {
        assert.deepStrictEqual(result.rawFacts, []);
        assert.deepStrictEqual(result.formattedFacts, []);
        console.log('Test 3: Passed');
    }).catch(error => {
        console.error('Test 3: Failed', error);
    }).finally(resetFetch);
}

// Run all tests
try {
    testFetchCatFact();
    testFetchDogFact();
    testFetchError();
    console.log('All fetchFact tests passed!');
} catch (error) {
    console.error('Test failed:', error.message);
}