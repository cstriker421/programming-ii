const range = {
    create(start, end) {
        return {
            [Symbol.iterator]() {
                let current = start;
                return {
                    next() {
                        if (current <= end) {
                            return { value: current++, done: false };
                        } else {
                            return { done: true };
                        }
                    }
                };
            }
        };
    }
};

// examples -- all functional
for (let num of range.create(3, 6)) {
    console.log(num);
}

for (let num of range.create(-1, 2)) {
    console.log(num);
}

for (let num of range.create(1, 22)) {
    console.log(num);
}

for (let num of range.create(-50, 50)) {
    console.log(num);
}