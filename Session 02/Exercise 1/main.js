const n = 1_000_000;
for (let i = 0; i < n; i++) {       
    for (let j = i; j < n; j++) {     
        console.log(i + j);
    }
}

/*  1. The outer loop runs from i = 0 to i < n, executing n times.
    2. The inner loop runs from j = i to j < n, meaning it executes (n - i) times for each i.
    3. The total number of iterations is the sum of (n - i) for i = 0 to n - 1:

    Total Iterations:
    Σ (n - i)  for i = 0 to n - 1

    4. Expanding the summation:
    = (n - 0) + (n - 1) + (n - 2) + ... + 1
    = n + (n - 1) + (n - 2) + ... + 1

    5. This forms an arithmetic series like so:
    - First term (a) = 1
    - Last term (l) = n
    - Number of terms = n

    Using the formula for the sum of an arithmetic series:
    Sum = (n * (n + 1)) / 2

    6. Applying Big-O notation:
    - We drop the constants: (n^2 + n) / 2  => O(n^2)
    - We drop lower-order terms: O(n^2 + n) => O(n^2)

    The final complexity is O(n^2)
*/