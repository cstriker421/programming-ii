// Basic recursive Fibonacci
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
  
/*
    Each call branches into two more calls.
    Forms a binary recursion tree of height n.
    Total calls = O(2^n), which is exponential.
*/
  
// Optimised Fibonacci with memoisation
  function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 0) return 0;
    if (n === 1) return 1;
  
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}
  
/*
    Each Fibonacci number is computed only once and stored.
    Results in O(n) complexity due to memoisation.
*/
  
// Sample inputs provided by Chat GPT
console.log(fibonacci(10));      // 55 (Slow, O(2^n))
console.log(fibonacciMemo(50));  // 12586269025 (Fast, O(n))