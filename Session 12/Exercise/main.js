// method 1 uses simple for loop; easy and logical, works great when you have full data and is memory efficient, but it is hardcoded and would require modifications for more numbers
function* evenNumbers1() {
    let num1 = 2;
    for (let i = 0; i < 3; i++) {
        yield num1
        num1 += 2;
    }
}

const iterator1 = evenNumbers1();
console.log("evenNumbers1:");
for (let result = iterator1.next(); !result.done; result = iterator1.next()) {
    console.log(result);
}
console.log("\n");


// method 2 uses while loop with a limit; fully dynamic, memory efficient and flexible, but requires a defined parameter to function
function* evenNumbers2(limit) {
    let num2 = 2;
    let count = 0; 
  
    while (count < limit) {
        yield num2;
        num2 += 2;
        count++;
    }
}
  
const iterator2 = evenNumbers2(3);
console.log("evenNumbers2:");
for (let result = iterator2.next(); !result.done; result = iterator2.next()) {
    console.log(result);
}
console.log(iterator2.next()); // to log final return value and show what happens afterwards
console.log("\n");


// method 3 uses an array with a for/of loop; easy to read and simple, works well with a predefined list, but is memory hungry and not dynamic
function* evenNumbers3() {
    const numbers = [2, 4, 6];
    for (const num2 of numbers) {
        yield num2;
    }
}
 
const iterator3 = evenNumbers3();
console.log("evenNumbers3:");
for (let result = iterator3.next(); !result.done; result = iterator3.next()) {
    console.log(result);
}
console.log("\n");

// method 4 uses yield* to delegate to an array; it's more concise than previous method, as it directly delegates to an array, making the code cleaner
// still very memory hungry and inflexible
function* evenNumbers4() {
    yield* [2, 4, 6];
}

const iterator4 = evenNumbers4();
console.log("evenNumbers4:");
for (let result = iterator4.next(); !result.done; result = iterator4.next()) {
    console.log(result);
}
console.log("\n");