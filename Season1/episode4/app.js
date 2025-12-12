require ("./xyz.js");
const {calculate }= require("./sum.js");
const wishes = require("./message.js");

var name = "Shraddha";
var a = 10;
var b = 20;

console.log("add ", calculate.add(a, b));
console.log("subtract ", calculate.subtract(a,b));
console.log("multiply ", calculate.multiply(a, b));
console.log("division ", calculate.division(a,b));
console.log("Your warm message is: ", wishes.birthdayWish);
// console.log("Value of x ", x);
const x = 8;
console.log("now x is ", x);
console.log(globalThis === global);