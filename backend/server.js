const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // your MySQL root password
    database: 'LibraryDB'
});

// Get available books
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM Books', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Register new reader
app.post('/api/register', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO Readers (Name, Email, RegisteredDate) VALUES (?, ?, CURDATE())';
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// Get readers
app.get('/api/readers', (req, res) => {
    db.query('SELECT * FROM Readers', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get issued books
app.get('/api/issued', (req, res) => {
    const query = `
    SELECT b.BorrowID, bk.Title, r.Name, b.BorrowDate, b.ReturnDate
    FROM Borrow b
    JOIN Books bk ON b.BookID = bk.BookID
    JOIN Readers r ON b.ReaderID = r.ReaderID
  `;
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
