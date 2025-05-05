const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',       // Host of the MySQL server
    user: 'luxecleanUser',            // MySQL user
    password: 'Abdulhadi123',// MySQL user's password
    database: 'luxeCleanDB'  // Database name
});

db.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

module.exports = db;