const firstModule = require("./first-module");

console.log(firstModule.subtract(1, 5));
// console.log(firstModule.divide(1, 0));

try {
  console.log("trying to divide by 0");
  let result = firstModule.divide(1, 0);
  console.log(result, "result");
} catch (error) {
  console.log("Caught a error", error.message);
}
