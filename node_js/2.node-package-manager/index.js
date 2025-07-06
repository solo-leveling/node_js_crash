const lodash = require("lodash");

const names = ["hein", "htet", "banana"];
const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);
