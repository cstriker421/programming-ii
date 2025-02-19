/**
 * Calculates the sum of an array of numbers.
 * @param {number[]} numbers - Array of numbers to sum.
 * @returns {number} The total sum of the numbers.
 */
export function sum(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error("Input must be a non-empty array of numbers.");
    }
    return numbers.reduce((acc, num) => acc + num, 0);
}