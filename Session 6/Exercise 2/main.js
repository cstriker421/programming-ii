export function flattenObject(obj, prefix = '') {
    let result = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
  
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result = { ...result, ...flattenObject(obj[key], newKey) };
                } else {
                result[newKey] = obj[key];
            }
        }
    }
  
    return result;
}
  
// test case given by ChatGPT
const nested = {  
    x: 10,
    y: {
      z: {
        w: 20,
        v: [30, { u: 40 }]
      }
    },
    m: [{ n: 50 }, 60]
  }; 
  
console.log(flattenObject(nested));

// outcome:
//  {
//      x: 10,
//      'y.z.w': 20,
//      'y.z.v.0': 30,
//      'y.z.v.1.u': 40,
//      'm.0.n': 50,
//      'm.1': 60
//  }