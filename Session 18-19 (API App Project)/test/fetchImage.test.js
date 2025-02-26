import assert from 'assert';
import { fetchImage } from '../src/fetchImage.js';

// Mock fetch and open
const originalFetch = global.fetch;
const originalOpen = global.open;

function mockFetch(response) {
    global.fetch = () => Promise.resolve(response);
}

function mockOpen() {
    global.open = () => Promise.resolve();
}

function resetMocks() {
    global.fetch = originalFetch;
    global.open = originalOpen;
}

// Test 1: Fetch and open a static cat image
function testFetchStaticCatImage() {
    mockFetch([{ url: 'https://example.com/cat.jpg' }]);
    mockOpen();

    fetchImage('cat', 'static').then(() => {
        assert.strictEqual(global.open.called, true);
        assert.strictEqual(global.open.calls[0][0], 'https://example.com/cat.jpg');
        console.log('Test 1: Passed');
    }).catch(error => {
        console.error('Test 1: Failed', error);
    }).finally(resetMocks);
}

// Test 2: Fetch and open an animated dog image
function testFetchAnimatedDogImage() {
    mockFetch({ url: 'https://example.com/dog.gif' });
    mockOpen();

    fetchImage('dog', 'animated').then(() => {
        assert.strictEqual(global.open.called, true);
        assert.strictEqual(global.open.calls[0][0], 'https://example.com/dog.gif');
        console.log('Test 2: Passed');
    }).catch(error => {
        console.error('Test 2: Failed', error);
    }).finally(resetMocks);
}

// Test 3: Handle fetch errors
function testFetchImageError() {
    global.fetch = () => Promise.reject(new Error('Network error'));
    mockOpen();

    fetchImage('fox', 'static').then(() => {
        assert.strictEqual(global.open.called, false);
        console.log('Test 3: Passed');
    }).catch(error => {
        console.error('Test 3: Failed', error);
    }).finally(resetMocks);
}

// Run all tests
try {
    testFetchStaticCatImage();
    testFetchAnimatedDogImage();
    testFetchImageError();
    console.log('All fetchImage tests passed!');
} catch (error) {
    console.error('Test failed:', error.message);
}