const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req, "req");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello node js from server ");
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is now listening ${port}`);
});
