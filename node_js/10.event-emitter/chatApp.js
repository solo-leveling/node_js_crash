const EventEmitter = require("events");
const readline = require("readline");

class Chat extends EventEmitter {
  constructor(username) {
    super();
    this.username = username;

    // Handle received messages from others
    this.on("message", (from, msg) => {
      if (from !== this.username) {
        console.log(`\n${from}: ${msg}`);
        process.stdout.write(`${this.username}> `);
      }
    });
  }

  send(to, msg) {
    // Send message to another Chat instance
    to.emit("message", this.username, msg);
  }
}

// Create two users
const user1 = new Chat("Heintet");
const user2 = new Chat("Alice");

// Setup readline for user1 input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Heintet> ",
});

console.log("Start chatting (type 'exit' to quit):");
rl.prompt();

rl.on("line", (line) => {
  const trimmed = line.trim();
  if (trimmed === "exit") {
    rl.close();
    return;
  }

  // Heintet sends to Alice
  user1.send(user2, trimmed);

  // Alice auto replies after 1 second
  setTimeout(() => {
    user2.send(user1, `(auto-reply to "${trimmed}")`);
  }, 1000);

  rl.prompt();
});
