function containsDuplicate(nums) {
    let seen = new Set();
    for (let num of nums) {
        if (seen.has(num)) {
            return true; // Found duplicate
        }
        seen.add(num); // Store unique numbers
    }
    return false; // No duplicates found
}

/*  seen = new Set(); => Uses a Set to store unique numbers (O(1) insert/search).
    If num is in seen, it returns true (O(1) lookup).
    Otherwise, it adds num to seen.
    It returns false if no duplicates are found.

    It is an O(n) function because we loop through nums once, and because we store up to n elements.
*/