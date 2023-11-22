import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const PORT = 8800;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "25KU23MA09R66$",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database.");
  }
});

app.get("/", (req, res) => {
  res.json("Hello, this is the backend.");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error inserting book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.error("Error deleting book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ? WHERE id = ?";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.error("Error updating book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
