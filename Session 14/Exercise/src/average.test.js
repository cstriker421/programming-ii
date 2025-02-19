import { average } from "./average.js";
import assert from "node:assert";

assert.strictEqual(average([2, 4, 6, 8]), 5);
assert.strictEqual(average([-2, -4, -6, -8]), -5);
assert.strictEqual(average([]), null);  // edge case: empty array
assert.strictEqual(average([10]), 10);  // edge case: single-element array

console.log("average.test.mjs passed!");