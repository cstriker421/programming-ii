export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // return primitives as-is
    }
  
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item)); // clone arrays recursively
    }
  
    const clonedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]); // clone object properties recursively
        }
    }
  
    return clonedObj;
}
// example 1 (ChatGPT)
const original = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5, { g: 6 }],
};

// output = { a: 1, b: { c: 2, d: { e: 3 } }, f: [ 4, 5, { g: 6 } ] }
  
const clone = deepClone(original);
  
console.log(clone); 
console.log(clone === original);            // false (ensures a deep copy)
console.log(clone.b === original.b);        // false (nested object is different)
console.log(clone.f === original.f);        // false (nested array is different)
console.log(clone.f[2] === original.f[2]);  // false (object inside array is different)

// example 2 (ChatGPT complex object)

const complexObject = {
    x: 42,
    y: {
        z: [1, { a: 'hello', b: ['world', { c: true }] }],
        w: new Date(),
    },
    arr: [{ num: 10 }, { num: 20 }],
    bool: false,
    nestedObj: {
        key: 'value',
        deep: {
            deeper: {
                deepest: 'found me!',
            },
        },
    },
};

// output:
//  {
//      x: 42,
//      y: { z: [ 1, [Object] ], w: {} },
//      arr: [ { num: 10 }, { num: 20 } ],
//      bool: false,
//      nestedObj: { key: 'value', deep: { deeper: [Object] } }
//  }

const clonedObject = deepClone(complexObject);
  
console.log(clonedObject);

console.log(clonedObject === complexObject);                                                // false
console.log(clonedObject.y === complexObject.y);                                            // false
console.log(clonedObject.y.z === complexObject.y.z);                                        // false
console.log(clonedObject.arr[0] === complexObject.arr[0]);                                  // false
console.log(clonedObject.nestedObj.deep.deeper === complexObject.nestedObj.deep.deeper);    // false
console.log(clonedObject.y.w instanceof Date);                                              // false