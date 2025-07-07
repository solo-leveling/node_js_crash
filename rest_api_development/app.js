const express = require("express");
const app = express();

app.use(express.json());

const books = [
  {
    id: 1,
    title: "book 1",
  },
  {
    id: 2,
    title: "book 2",
  },
];

//intro route
app.get("/", (req, res) => {
  res.json({
    message: "Intro Page",
  });
});

//get all books
app.get("/get", (req, res) => {
  res.json(books);
});

//get a single book
app.get("/get/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book is not found.Please find with other id",
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
