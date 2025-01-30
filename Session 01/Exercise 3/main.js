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

console.log(twoSumOptimised([2,7,11,15], 9));
console.log(twoSumOptimised([3,2,4], 6));
console.log(twoSumOptimised([3,3], 6));