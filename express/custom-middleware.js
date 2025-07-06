const express = require("express");
const app = express();

const reqTimeStampLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`${timeStamp} from ${req.method} to ${req.url}`);
  next();
};

app.use(reqTimeStampLogger);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page wtf");
});

app.listen(3000, () => {
  console.log(`Server is running at port 3000 custom`);
});
