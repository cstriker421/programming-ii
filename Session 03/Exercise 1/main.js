function power(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / power(x, -n);
    return x * power(x, n - 1);
}

// Sample inputs provided by Chat GPT
console.log(power(2, 5));  // 32
console.log(power(3, -2)); // 0.1111...