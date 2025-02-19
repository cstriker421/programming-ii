import { sum } from "./sum.js";
import assert from "node:assert";

assert.strictEqual(sum([1, 2, 3, 4]), 10);
assert.strictEqual(sum([-1, -2, -3, -4]), -10);
assert.strictEqual(sum([]), 0);         // edge case: empty array
assert.strictEqual(sum([100]), 100);    // edge case: single-element array

console.log("sum.test.mjs passed!");