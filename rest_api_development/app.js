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

//add new book
app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `book ${books.length + 1}`,
  };

  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "Successfully added new book",
  });
});

//update a book
app.put("/update/:id", (req, res) => {
  const getBook = books.find((book) => book.id === parseInt(req.params.id));

  if (getBook) {
    getBook.title = req.body.title;
    res.status(200).json({
      message: `Book ${req.params.id} is updated successfully`,
      data: getBook,
    });
  } else {
    res.status(404).json({
      message: "Book is not found.Please find with other id",
    });
  }
});

//delete a book
app.delete("/delete/:id", (req, res) => {
  const getBookID = books.findIndex(
    (book) => book.id === parseInt(req.params.id)
  );

  if (getBookID !== -1) {
    const deleteBook = books.splice(getBookID, 1);
    res.status(200).json({
      data: deleteBook,
      message: `Book ${req.params.id} is deleted successfully`,
    });
  } else {
    res.status(404).json({
      message: "Can't find ID",
    });
  }
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
