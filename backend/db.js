const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Empty if no password is set for MySQL
    database: 'LibraryDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + connection.threadId);
});

module.exports = connection;
