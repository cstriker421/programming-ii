console.log(hoistedVar); // reference error: Cannot access 'hoistedVar' before initialization
let hoistedVar = "I'm hoisted!";

notHoistedFunc(); // reference error: Cannot access 'notHoistedFunc' before initialization
const notHoistedFunc = () => console.log("I won't work");

hoistedFunc(); // output: "I work!"
function hoistedFunc() {
  console.log("I work!");
}