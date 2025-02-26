import { jest } from '@jest/globals'; // Import Jest globals
import fs from 'fs';
import { clearFacts } from '../src/clearFacts.js';

// Mocks the fs module
jest.mock('fs', () => ({
    existsSync: jest.fn(),
    readFileSync: jest.fn(),
    writeFileSync: jest.fn()
}));

/**
 * @jest-environment node
 */
describe('clearFacts', () => {
    const STORAGE_FILE = "facts.json";

    beforeEach(() => {
        jest.clearAllMocks(); // Clears all mocks before each test
    });

    it('should clear facts for a specific animal when the file exists', () => {
        const mockData = { cat: ["Cats are cute"], dog: ["Dogs are loyal"] };
        fs.existsSync.mockReturnValue(true); // Mocks existsSync to return true
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData)); // Mocks readFileSync to return mockData

        clearFacts('cat');

        expect(fs.existsSync).toHaveBeenCalledWith(STORAGE_FILE);
        expect(fs.readFileSync).toHaveBeenCalledWith(STORAGE_FILE, 'utf-8');
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            STORAGE_FILE,
            JSON.stringify({ cat: [], dog: ["Dogs are loyal"] }, null, 2)
        );
    });

    it('should do nothing if the file does not exist', () => {
        fs.existsSync.mockReturnValue(false); // Mocks existsSync to return false

        clearFacts('dog');

        expect(fs.existsSync).toHaveBeenCalledWith(STORAGE_FILE);
        expect(fs.readFileSync).not.toHaveBeenCalled();
        expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
});