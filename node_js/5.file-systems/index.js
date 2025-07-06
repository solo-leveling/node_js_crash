const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");

// ------------------------------------------------------------
// const data = fs.readFileSync("file.txt", "utf8");
// console.log(data); // This waits until reading is finished.
// ------------------------------------------------------------

// Check if the "data" folder exists. If not, create it.
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("Data folder created");
}

// Create a new file and write initial content to it (synchronous way)
const filePath = path.join(dataFolder, "example.txt");
fs.writeFileSync(filePath, "Hello from node");
console.log("File created");

// Read the file content (synchronous)
const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log("File Content:", readContentFromFile);

// Append a new line to the file (synchronous)
fs.appendFileSync(filePath, "\nThis is a new line.");

// --- Asynchronous way to create and modify a file ---

// ------------------------------------------------------------------------------
// fs.readFile("file.txt", "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data); // This runs later when the file is read.
//   });

//   console.log("Reading file..."); // This runs immediately without waiting.
// ------------------------------------------------------------------------------

const asyncFilePath = path.join(dataFolder, "async-example.txt");

// Create the file asynchronously
fs.writeFile(asyncFilePath, "This is an async file", (err) => {
  if (err) throw err;
  console.log("Async file created successfully");

  // Read the file content asynchronously
  fs.readFile(asyncFilePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log("Async file content:", data);

    // Append a new line asynchronously
    fs.appendFile(asyncFilePath, "\nNew line added", (err) => {
      if (err) throw err;
      console.log("New line added to async file");

      // Read the updated file content again
      fs.readFile(asyncFilePath, "utf8", (err, updatedData) => {
        if (err) throw err;
        console.log("Updated data:", updatedData);
      });
    });
  });
});
