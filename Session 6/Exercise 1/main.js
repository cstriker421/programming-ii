console.time("Run time");

export function createFibonacci() {
  const cache = new Map();

  return function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    if (cache.has(n)) return cache.get(n);

    const result = fibonacci(n - 1) + fibonacci(n - 2);
    cache.set(n, result);
    return result;
  };
}

const fibonacci = createFibonacci();
console.time("1st Fib")
console.log(fibonacci(0));  //0 (to be expected)
console.timeEnd("1st Fib")
console.time("2nd Fib")
console.log(fibonacci(1));  //1 (ditto)
console.timeEnd("2nd Fib")
console.time("3rd Fib")
console.log(fibonacci(10)); //55
console.timeEnd("3rd Fib")
console.time("4th Fib")
console.log(fibonacci(20)); //6765
console.timeEnd("4th Fib")
console.time("5th Fib")
console.log(fibonacci(30)); // 832040
console.timeEnd("5th Fib")
console.time("6th Fib")
console.log(fibonacci(50)); // 12586269025
console.timeEnd("6th Fib")

console.timeEnd("Run time");