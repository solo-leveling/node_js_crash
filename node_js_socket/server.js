const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
  console.log("A user is connected.");

  socket.on("join", (userName) => {
    users.add(userName);

    io.emit("userJoined", userName);

    //send data to front
    io.emit("userList", Array.from(users));
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
