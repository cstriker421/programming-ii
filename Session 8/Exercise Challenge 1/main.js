function unboundedKnapsack(capacity, items) {
    const memo = new Map();

    function knapsack(remainingCapacity) {
        if (remainingCapacity <= 0) return { maxValue: 0, chosenItems: {} };
        if (memo.has(remainingCapacity)) return memo.get(remainingCapacity);

        let best = { maxValue: 0, chosenItems: {} };

        for (let item of items) {
            if (item.weight <= remainingCapacity) {
                const result = knapsack(remainingCapacity - item.weight);
                const newValue = item.value + result.maxValue;

                if (newValue > best.maxValue) {
                    best = {
                        maxValue: newValue,
                        chosenItems: { ...result.chosenItems }
                    };
                    best.chosenItems[item.id] = (best.chosenItems[item.id] || 0) + 1;
                }
            }
        }

        memo.set(remainingCapacity, best);
        return best;
    }

    return knapsack(capacity);
}

// sample input from Chat GPT
const items = [
    { id: 0, weight: 3, value: 10 },
    { id: 1, weight: 2, value: 7 },
    { id: 2, weight: 5, value: 15 }
];
const capacity = 10;

const result = unboundedKnapsack(capacity, items);
console.log(result); // { maxValue: 35, chosenItems: { '1': 5 } }