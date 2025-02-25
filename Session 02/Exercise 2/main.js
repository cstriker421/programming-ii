// Brute force approach (O(n^2))
function maxProductBruteForce(arr) {
    let maxProduct = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            maxProduct = Math.max(maxProduct, arr[i] * arr[j]);
        }
    }
    return maxProduct;
}

/*  This approach uses two nested loops to check all possible pairs.
    The time complexity is O(n^2) since we are comparing every pair.
*/

// Sorted array approach (O(n log n))
function maxProductSorted(arr) {
    arr.sort((a, b) => a - b);
    let n = arr.length;
    return Math.max(arr[0] * arr[1], arr[n - 1] * arr[n - 2]);
}

/*  Sorting takes O(n log n). Finding the two largest or smallest values is O(1).
    The total complexity is O(n log n), which is more efficient than O(n^2).
*/

// Optimised approach (O(n))
function maxProductOptimised(arr) {
    let max1 = -Infinity, max2 = -Infinity;
    let min1 = Infinity, min2 = Infinity;
  
    for (let num of arr) {
        if (num > max1) {
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max2 = num;
        }
  
        if (num < min1) {
            min2 = min1;
            min1 = num;
        } else if (num < min2) {
            min2 = num;
        }
    }
  
    return Math.max(max1 * max2, min1 * min2);
}

/*  This scans the array once, so it's O(n).
    The optimal solution is O(n), thus it is faster than sorting.
*/