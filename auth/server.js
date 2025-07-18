require("dotenv").config();

const express = require("express");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth_routes");
const homeRoutes = require("./routes/home_routes");
const adminRoutes = require("./routes/admin_routes");
const uploadImageRoutes = require("./routes/image_routes");

//connect to DB
connectToDB();

const app = express();
//connect to port
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", uploadImageRoutes);

app.listen(PORT, () => {
  console.log(`server is connected successfully at port ${PORT}`);
});
