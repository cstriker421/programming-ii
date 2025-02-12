function twoSumOptimised(nums, target) {
    let numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];

        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }

        numMap.set(nums[i], i);
    }
    return [];
}

// Example usage:
console.log(twoSumOptimised([2,7,11,15], 9));   // [ 0, 1 ]
console.log(twoSumOptimised([3,2,4], 6));       // [ 1, 2 ]
console.log(twoSumOptimised([3,3], 6));         // [ 0, 1 ]