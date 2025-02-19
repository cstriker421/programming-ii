/**
 * Calculates the median of an array of numbers.
 * @param {number[]} numbers - Array of numbers.
 * @returns {number} The median value.
 */
export function median(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error("Input must be a non-empty array of numbers.");
    }
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
}