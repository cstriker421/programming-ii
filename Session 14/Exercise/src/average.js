/**
 * Calculates the average (mean) of an array of numbers.
 * @param {number[]} numbers - Array of numbers.
 * @returns {number} The average of the numbers.
 */
export function average(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error("Input must be a non-empty array of numbers.");
    }
    return sum(numbers) / numbers.length;
}