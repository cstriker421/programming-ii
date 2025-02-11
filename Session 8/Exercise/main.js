const knapsack = (items, capacity) => {
    const cache = new Map();

    const dp = (index, remainingCapacity) => {
        if (index === items.length || remainingCapacity === 0) return { maxValue: 0, selectedItems: [] };

        const key = `${index}-${remainingCapacity}`;
        if (cache.has(key)) return cache.get(key);

        const resultWithoutItem = dp(index + 1, remainingCapacity);

        let bestResult = resultWithoutItem;

        if (items[index].weight <= remainingCapacity) {
            const resultWithItem = dp(index + 1, remainingCapacity - items[index].weight);

            resultWithItem.maxValue += items[index].value;
            resultWithItem.selectedItems = [...resultWithItem.selectedItems, items[index]];

            if (resultWithItem.maxValue > resultWithoutItem.maxValue) {
                bestResult = resultWithItem;
            }
        }

        cache.set(key, bestResult);
        return bestResult;
    };

    return dp(0, capacity);
};

const items = [
    { id: 0, weight: 2, value: 10 },
    { id: 1, weight: 3, value: 15 },
    { id: 2, weight: 5, value: 40 }
];
const capacity = 7;

const result = knapsack(items, capacity);
console.log("Max Value:", result.maxValue);
console.log("Selected Items:", result.selectedItems);


// sample inputs from Chat GPT (100, 500, and 1000 items)
// const items100 = Array.from({ length: 100 }, (_, i) => ({
//     id: i,
//     weight: Math.floor(Math.random() * 10) + 1,  // weights 1-10
//     value: Math.floor(Math.random() * 100) + 1, // values 1-100
// }));
// const capacity100 = 500;
// console.log(knapsack(items100, capacity100)); // 181437

// const items500 = Array.from({ length: 500 }, (_, i) => ({
//     id: i,
//     weight: Math.floor(Math.random() * 15) + 1,  // weights: 1-15
//     value: Math.floor(Math.random() * 200) + 1, // values: 1-200
// }));
// const capacity500 = 2000;
// console.log(knapsack(items500, capacity500)); // 6950075

const items1000 = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    weight: Math.floor(Math.random() * 20) + 1,  // weights: 1-20
    value: Math.floor(Math.random() * 500) + 1, // values: 1-500
}));
const capacity1000 = 5000;

console.time("Knapsack 1000"); // 115284859
console.log(knapsack(items1000, capacity1000)); 
console.timeEnd("Knapsack 1000"); // 7:52.992 (m:ss.mmm) I AM SPEED/s