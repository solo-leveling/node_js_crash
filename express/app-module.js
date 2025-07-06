const express = require("express");

const app = express();

app.use(express.json());

//application level settings
app.set("view engine", "ejs");

//routing
app.get("/", (req, res) => {
  res.send(`Hello from app module`);
});

app.post("/api/data", (req, res) => {
  res.json({
    message: "Data Received",
    data: req.body,
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status("500").send("Something went wrong");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
