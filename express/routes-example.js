const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from routes.");
});

//get all products
app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      label: "product 1",
    },
    {
      id: 2,
      label: "product 2",
    },
    {
      id: 3,
      label: "product 3",
    },
  ];

  res.json(products);
});

//get a single product
app.get("/products/:data", (req, res) => {
  console.log("req.params", req.params);
  const productId = parseInt(req.params.data);
  const products = [
    {
      id: 1,
      label: "product 1",
    },
    {
      id: 2,
      label: "product 2",
    },
    {
      id: 3,
      label: "product 3",
    },
  ];
  const singleProductId = products.find((product) => product.id === productId);
  if (singleProductId) {
    res.json(singleProductId);
  } else {
    res.status(404).send("Product is not found");
  }
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
