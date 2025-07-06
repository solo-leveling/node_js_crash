const express = require("express");
const app = express();

const myFirstMiddleware = (req, res, next) => {
  console.log("This is my first middleware");

  next();
};

app.use(myFirstMiddleware);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(3000, () => {
  console.log(`Server is running at port 3000`);
});
