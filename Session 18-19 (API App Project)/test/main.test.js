import { getStoredFacts } from "./src/retrieveFact.js";
import { saveFacts } from "./src/storeFact.js";
import { clearFacts } from "./src/clearFacts.js";
import { fetchFact } from "./src/fetchFact.js";

jest.mock("./src/fetchFact.js");

describe("CLI Functionality", () => {
  const mockFacts = ["Fact 1", "Fact 2"];

  beforeEach(() => {
    jest.clearAllMocks();
    clearFacts("cat");
    clearFacts("dog");
  });

  test("Fetches and saves a random cat fact", async () => {
    fetchFact.mockResolvedValue(mockFacts);
    await saveFacts("cat", mockFacts);
    
    const facts = getStoredFacts("cat");
    expect(facts).toEqual(mockFacts);
  });

  test("Clears stored dog facts", () => {
    saveFacts("dog", mockFacts);
    clearFacts("dog");

    const facts = getStoredFacts("dog");
    expect(facts).toEqual([]);
  });

  test("Handles an invalid animal option", () => {
    const invalidAnimal = "elephant";
    expect(() => getStoredFacts(invalidAnimal)).toThrow();
  });
});