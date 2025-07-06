const path = require("path");

console.log("Directory name:", path.dirname(__dirname));
console.log("File name:", path.dirname(__filename));
console.log("Path name:", path.basename(__filename));
console.log("Path Extension", path.extname(__filename));

const joinPath = path.join("/user", "documents", "node", "projects");
console.log("Joined path:", joinPath);
