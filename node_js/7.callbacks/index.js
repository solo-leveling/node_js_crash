const fs = require("fs");

function person(name, callbackFunc) {
  console.log(`Hello, ${name}`);
  callbackFunc();
}

function address() {
  console.log("Hein Htet");
}

person("Hein", address);

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  console.log(data);
});
