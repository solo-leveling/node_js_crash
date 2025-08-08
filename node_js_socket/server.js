// Import required modules
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Create an Express app
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = socketIo(server);

// Serve static files from the "public" folder (e.g., HTML, CSS, JS for frontend)
app.use(express.static("public"));

// Store connected user names in a Set to ensure uniqueness
const users = new Set();

// Handle new client connections
io.on("connection", (socket) => {
  console.log("A user is connected.");

  // When a user joins and sends their username
  socket.on("join", (userName) => {
    // Add the username to the set of users
    users.add(userName);
    socket.userName = userName;

    // Notify all clients that a new user has joined
    io.emit("userJoined", userName);

    // Send the updated list of users to all connected clients
    io.emit("userList", Array.from(users));
  });

  //handle incoming messages
  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });

  //disconnect user
  socket.on("disconnect", () => {
    console.log("An user is disconnected");

    users.forEach((user) => {
      if (user === socket.userName) {
        users.delete(user);

        io.emit("userLeft", user);
        io.emit("userList", Array.from(users));
      }
    });
  });
});

// Define the server port
const PORT = 3000;

// Start the server and listen for connections
server.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
