const fs = require('fs');  

function countWords(filename) {  
  const data = fs.readFileSync(filename);  
  const words = data.split(' ');  
  return words.length;  
}  

console.log(countWords('poem.txt'));