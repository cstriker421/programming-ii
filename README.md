# Programming II

JavaScript | [Mozilla JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## **Session 1: Review of Programming I Basics**  
**Content**:
- JavaScript syntax refresher: `let` vs `const`, arrow functions, template literals.
- Data structures: Arrays, objects, `Map`, `Set`.
- Control flow: `for`, `while`, `switch`, ternary operators.
- Problem-solving techniques: Writing pseudoscript, creating flowcharts.

**Objective**:
- Strengthen foundational JavaScript skills.
- Translate real-world problems into structured logic.

**Exercises**:
1. Write a function `findDuplicates(arr)` that returns an array of duplicate elements.
2. Create a flowchart for a thermostat system that adjusts temperature based on user input.
3. Solve [Two Sum](https://leetcode.com/problems/two-sum/) using nested loops (O(n²)) and then optimize it using a `Map` (O(n)).
4. Implement a `Student` class with properties (name, grades) and methods to calculate final grade.

**Resources**:
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) 
- [Pseudoscript](https://github.com/jorgealves/pseudoscript)

---

## **Session 2: Algorithm Complexity & Big O Notation**
**Content**:
- Time vs. space complexity: Definitions and trade-offs.
- Big O rules: Drop constants, dominant terms, worst-case analysis.
- Analyzing loops: Single loops, nested loops, sequential operations.
- Common complexities: O(1), O(n), O(n²), O(log n).

**Objective**:
- Quantify algorithm efficiency using Big O.
- Compare solutions based on scalability.

**Exercises**:  
1. Calculate the time complexity of this code:
```javascript
const n = 1_000_000;
for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
   console.log(i + j);
  }
}
```
2. Write a function to find the maximum product of two numbers in an array. Compare the complexity of a brute-force approach vs. a sorted array approach.
3. Solve [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) with O(n) time and O(n) space.
4. Explain why O(2n + 5) simplifies to O(n).

**Resources:**
[Big O Cheat Sheet](https://www.bigocheatsheet.com/)

## Session 3: Recursion & Complexity Analysis

**Content:**

- Recursion basics: Base case, recursive case, call stack.
- Recursion vs. iteration: When to use each.
- Tail recursion and stack overflow prevention.
- Recurrence relations for complexity (e.g., Fibonacci: T(n) = T(n-1) + T(n-2) + O(1)).

**Objective:**
- Solve problems recursively and analyze recursive complexity.

**Exercises:**

- Write a recursive `power(x, n)` function (calculate x^n).
- Solve [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) using recursion, then memoization.
- Print all permutations of a string using backtracking.
- Explain why the recursive Fibonacci has O(2^n) time complexity.

**Resources:**

- [MDN Recursion Guide](https://developer.mozilla.org/en-US/docs/Glossary/Recursion)

## Session 4: Arrays, Strings & File I/O

**Goal**: Learn to manipulate files and structured data using Node.js.

**Definitions**
- File I/O: Reading/writing files using Node.js’s fs module.
- CSV/JSON Parsing: Converting structured text (e.g., CSV rows) into JavaScript objects.
- Array/String Methods: Tools like split(), map(), and filter() to transform data.

**MDN Reference:**

- [Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [String Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Node.js fs Module](https://nodejs.org/api/fs.html)

### Tutorial

#### Step 1: Read a File

- Use `fs.readFileSync()` to read a CSV file:

```javascript
const fs = require('fs');
const csvData = fs.readFileSync('Session4_data.csv', 'utf-8');
``` 

#### Step 2: Parse CSV Data

- Split rows by newlines `(\n)` and columns by commas:

```javascript
const rows = csvData.split('\n');
const headers = rows[0].split(','); // ["name", "email", "age"]
const data = rows.slice(1).map(row => {
  const values = row.split(',');
  return {
    name: values[0],
    email: values[1],
    age: parseInt(values[2])
  };
});
```

#### Step 3: Write to JSON

- Convert the array to JSON and save it:

```javascript
fs.writeFileSync('session4_data.json', JSON.stringify(data, null, 2));  
```

#### Step 4: Handle Errors

- Wrap code in a try/catch block:

```javascript
try {
  // ... file operations ...
} catch (error) {
  console.error('Error:', error.message);
}
```

### Exercise: CSV to JSON Converter

- Build a script that converts a CSV file to a JSON file.
Requirements

- Read input.csv with columns: name,email,age.

- Skip invalid rows (e.g., missing fields, non-numeric age).

- Save the cleaned data as output.json.

**Sample Input (input.csv):**

```csv
name,email,age  
Alice,alice@example.com,30  
Bob,bob@example.com,25  
Charlie,charlie@example.com,invalid  
```

**Expected Output (output.json):**

```json
[  
  { "name": "Alice", "email": "alice@example.com", "age": 30 },  
  { "name": "Bob", "email": "bob@example.com", "age": 25 }  
]  
```

**Hints**

- Use `Array.filter()` to remove invalid rows.
- Validate age with `isNaN()`.
- Use fs.existsSync() to check if the input file exists.

#### Challenge (Optional)

- Modify the script to accept input/output filenames as command-line arguments.

- Add a --verbose flag to log skipped rows and reasons.

## Session 5: Advanced Objects, Maps & Data Structures

**Goal:** Master complex data structures and solve problems involving nested data.

### Definitions

- Map: A collection of key-value pairs (unlike objects, keys can be any type).

- Deep Comparison: Checking if two objects have identical nested properties.

**MDN Reference:**

- [Map Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Object Comparison](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

### Tutorial

#### Step 1: Using Map

```javascript
const userMap = new Map();  
userMap.set('alice', { age: 30 });  
console.log(userMap.get('alice')); // { age: 30 }  
```

#### Step 2: Deep Object Comparison

- Recursively compare objects:

```javascript
function deepEqual(obj1, obj2) {  
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {  
    return obj1 === obj2;  
  }  
  const keys1 = Object.keys(obj1);  
  const keys2 = Object.keys(obj2);  
  if (keys1.length !== keys2.length) return false;  
  return keys1.every(key => deepEqual(obj1[key], obj2[key]));  
}  
```

### Exercise: Group Users by City

- Given an array of users, group them by their city using a Map.

**Sample Input:**

```javascript

const users = [  
  { id: 1, name: 'Alice', city: 'Paris' },  
  { id: 2, name: 'Bob', city: 'London' },  
  { id: 3, name: 'Charlie', city: 'Paris' }  
];
```  

**Expected Output:**

```javascript
Map {  
  'Paris' => [  
    { id: 1, name: 'Alice', city: 'Paris' },  
    { id: 3, name: 'Charlie', city: 'Paris' }  
  ],  
  'London' => [ { id: 2, name: 'Bob', city: 'London' } ]  
}  
```

**Hints**
- Initialize a Map.
- Iterate through users and add them to the appropriate city array.

## Session 6: Recursion & Algorithm Optimization

**Goal:** Solve problems recursively and optimize solutions using memoization.

### Definitions

- Memoization: Caching results of expensive function calls to avoid redundant work.

- Tail-Call Optimization: A technique to optimize recursive calls to prevent stack overflow (limited support in JS).

**MDN Reference:**

[Functions and Recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion)
[Closures (for memoization)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

### Tutorial

#### Step 1: Basic Recursion

- Calculate the factorial of a number:

```javascript
function factorial(n) {  
  if (n === 0) return 1; // Base case  
  return n * factorial(n - 1);  
}  
console.log(factorial(5)); // 120  
```

#### Step 2: Memoization

- Cache results for Fibonacci:

```javascript
const memo = new Map();  
function fib(n) {  
  if (n <= 1) return n;  
  if (memo.has(n)) return memo.get(n);  
  const result = fib(n - 1) + fib(n - 2);  
  memo.set(n, result);  
  return result;  
}  
console.log(fib(10)); // 55 (avoids redundant calculations)  
```

#### Step 3: Recursive Directory Traversal

- Traverse a nested object structure (simulating directories):

```javascript
function traverse(obj, path = []) {  
  if (typeof obj !== 'object') {  
    console.log(path.join('/'), '->', obj);  
    return;  
  }  
  for (const key in obj) {  
    traverse(obj[key], [...path, key]);  
  }  
}  

const directories = {  
  src: { utils: { 'math.js': 'content' }, app: 'index.js' },  
  public: 'assets'  
};  
traverse(directories);  
```

### Exercise: Memoized Fibonacci & Directory Flattening
#### Problem 1: Optimize Fibonacci

- Refactor the Fibonacci function to use memoization without a global Map.

  - Requirements:
    - Use a closure to encapsulate the cache.
    - Handle n ≤ 0 gracefully.

**Sample Input:**
```javascript
console.log(fibMemo(10)); // 55  
console.log(fibMemo(50)); // 12586269025 (efficient!)  
```

#### Problem 2: Flatten Nested Object

- Write a recursive function to flatten a deeply nested object into key-value pairs.

**Sample Input:**

```javascript
const nested = {  
  a: 1,  
  b: { c: 2, d: { e: 3 } },  
  f: [4, 5]  
};  
```

**Expected Output:**
```javascript
{  
  'a': 1,  
  'b.c': 2,  
  'b.d.e': 3,  
  'f.0': 4,  
  'f.1': 5  
}  
```

**Hints**

- For Fibonacci, initialize the cache inside the closure.
- For flattening, pass the current path as an argument in recursion.

#### Challenge (Optional)

- Implement a recursive deepClone function to copy nested objects/arrays.
- Solve the Tower of Hanoi problem recursively.

## Session 7: Asynchronous JS & External APIs

**Goal:** Fetch and process data from REST APIs using async/await.

### Definitions

- Promise: An object representing eventual completion/failure of an async operation.
- async/await: Syntactic sugar for writing asynchronous code in a synchronous style.

**MDN Reference:**

- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### Tutorial

#### Step 1: Fetch Data with node-fetch
```bash
npm install node-fetch  
```
```javascript
import fetch from 'node-fetch';  

async function fetchUser(id) {  
  try {  
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);  
    if (!response.ok) throw new Error('Failed to fetch');  
    return await response.json();  
  } catch (error) {  
    console.error(error.message);  
  }  
}  
```

#### Step 2: Parallel Requests

- Use Promise.all to fetch multiple users:
```javascript
async function fetchUsers() {  
  const ids = [1, 2, 3];  
  const promises = ids.map(id => fetchUser(id));  
  const users = await Promise.all(promises);  
  console.log(users);  
}  
```

### Exercise: Weather Data Aggregator

- Fetch weather data from OpenWeatherMap API for 3 cities and save the results to a JSON file.

**Requirements:**

- Use node-fetch and async/await.
- Handle API errors (e.g., invalid API key, city not found).
- Save output to weather.json with structure:
  ```json
  [  
    { "city": "London", "temp": 15, "humidity": 80 },  
    ...  
  ]  
  ```
**Sample Code**
```javascript
const API_KEY = 'your_api_key'; // Replace with a valid key  
const CITIES = ['London', 'Paris', 'Tokyo'];  
```

**Hints**

- API endpoint: https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}.
- Extract temp and humidity from the response.



## Session 8: Problem-Solving Patterns (Advanced)

**Goal:** Solve complex problems using dynamic programming and greedy algorithms.

### Definitions

- Dynamic Programming (DP): Breaking problems into overlapping subproblems and storing their solutions.
- Greedy Algorithm: Making locally optimal choices at each step to find a global optimum.
- Backtracking: Systematically exploring all potential solutions and abandoning invalid paths early.

**Reference:**

- [Greedy Algorithm](https://fanzhongzeng78.medium.com/greedy-algorithm-in-javascript-88f2d71edf5d)
- [Bag it Up - Greedy Algorithms in Javascript](https://dev.to/albertywu/bag-it-up--greedy-algorithms-in-javascript-3gac)
- [Backtracking Algorithms](https://dev.to/jcorley44/backtracking-algorithms-40p6)
- [Backtracking Algorithm](https://medium.com/geekculture/backtracking-algorithm-95622dcb6ac8)
- [JS Best Practices](https://dev.to/codewithshahmeer/best-practices-for-writing-efficient-javascript-code-160p)

### Tutorial
#### Step 1: Dynamic Programming (Fibonacci with Memoization)
```javascript
function createFib() {  
  const memo = new Map();  
  return function fib(n) {  
    if (n <= 1) return n;  
    if (memo.has(n)) return memo.get(n);  
    const result = fib(n - 1) + fib(n - 2);  
    memo.set(n, result);  
    return result;  
  };  
}  
const fibMemo = createFib();  
console.log(fibMemo(50)); // 12586269025 (efficient!)  
```

#### Step 2: Greedy Algorithm (Coin Change)

- Find the minimum coins needed for a target amount (assuming infinite supply):
```javascript
function coinChange(coins, target) {  
  coins.sort((a, b) => b - a); // Sort descending  
  let count = 0;  
  for (const coin of coins) {  
    while (target >= coin) {  
      target -= coin;  
      count++;  
    }  
  }  
  return target === 0 ? count : -1;  
}  
console.log(coinChange([1, 5, 10], 28)); // 10 + 10 + 5 + 1 + 1 + 1 → 6 coins  
```

### Exercise: 0/1 Knapsack Problem
- Given items with weights and values, maximize the value in a knapsack of capacity W.

**Sample Input:**
```javascript
const items = [  
  { weight: 2, value: 10 },  
  { weight: 3, value: 15 },  
  { weight: 5, value: 40 }  
];  
const capacity = 7;  
```

**Expected Output:** 50 (Items 0 and 2 -> 10 + 40 = 50 with total weight 7.

**Requirements:**

- Use memoization or a DP table.
- Handle up to 1000 items (optimize for time).

**Hints:**

- Define a recursive function knapsack(index, remainingCapacity).
- Memoize results based on index and remainingCapacity.

### Challenge (Optional)

- Solve the "Unbounded Knapsack" (items can be reused).
- Implement the "Longest Common Subsequence" problem with DP.

## Session 9: Error Handling & Debugging in Node

**Goal:** Write resilient code and debug Node.js applications effectively.

### Definitions

- Stack Trace: A report of active stack frames at a specific execution point.
- Custom Errors: User-defined error types extending Error.
- Logging: Recording application events for auditing and debugging (e.g., winston).

**MDN Reference:**

- [Error Object](https://dev.to/codewithshahmeer/best-practices-for-writing-efficient-javascript-code-160p)
- [try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

### Tutorial
#### Step 1: Custom Error Class
```javascript
class ValidationError extends Error {  
  constructor(message) {  
    super(message);  
    this.name = 'ValidationError';  
  }  
}  

function validateUser(user) {  
  if (!user.email) throw new ValidationError('Email is required');  
}
```

#### Step 2: Logging with Winston
```bash
npm install winston  
```
```javascript
import winston from 'winston';  

const logger = winston.createLogger({  
  level: 'debug',  
  transports: [new winston.transports.Console()],  
});  

logger.info('Server started');  
logger.error('Failed to connect to DB');  
```

### Exercise: Debugging a File Processor
- Debug and fix the following buggy code. It should read a file, count words, and log the result.

**Buggy Code:**
```javascript
const fs = require('fs');  

function countWords(filename) {  
  const data = fs.readFileSync(filename);  
  const words = data.split(' ');  
  return words.length;  
}  

console.log(countWords('poem.txt'));  
```

**Errors to Fix:**

- Missing encoding in readFileSync (returns a buffer).
- No error handling for missing files.
- Incorrect word splitting (punctuation not removed).

**Sample Input (poem.txt):**

```txt
Roses are red, violets are blue.  
```
**Expected Output:** 6 (after removing punctuation).

**Hints:**

- Use utf-8 encoding.
- Remove punctuation with replace(/[^\w\s]/g, '').

### Challenge (Optional)
- Add a logger to track file processing time.
- Write a test with Jest to verify error handling.
