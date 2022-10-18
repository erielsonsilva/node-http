const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const hostname = "192.168.3.85";
const port = 5000;

const books = [
  {
    _id: 1,
    title: "O Dia do Curinga",
    autor: "Jostein Gaarden",
    favorito: true,
  },
  {
    _id: 2,
    title: "O mundo de Sophia",
    autor: "Jostein Gaarden",
    favorito: true,
  },
  { _id: 3, title: "A casa", autor: "Raquel de Queiroz", favorito: true },
];

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//uri
app.get("/", (req, res) => {
  res.json({ nome: "Adriana S!" });
});

app.get("/html", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/books", (req, res) => {
  res.send(books.filter((i) => !i.favorito));
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.send(req.body);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((book) => book._id == req.params.id);
  if (book) res.send(book);
  else res.sendStatus(404);
});

app.listen(port, hostname, () => console.log(`http://${hostname}:${port}`));
