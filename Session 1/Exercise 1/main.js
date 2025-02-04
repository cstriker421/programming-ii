function findDuplicates(arr) {
    let seen = new Map();
    let duplicates = new Set();

    for (let num of arr) {
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            seen.set(num, true);
        }
    }

    return Array.from(duplicates);
}

// Example usage:
console.log(findDuplicates([1, 2, 3, 4, 5, 2, 3, 6, 7, 8, 1])); // [ 2, 3, 1 ]
console.log(findDuplicates([10, 20, 30, 40, 50, 10, 20]));  // [ 10, 20 ]
console.log(findDuplicates([5, 5, 5, 5, 5]));   // [ 5 ]
console.log(findDuplicates([1, 2, 3, 4]));  // []