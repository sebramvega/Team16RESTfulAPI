const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL database connection
const connection = mysql.createConnection({
    host: 'db4free.net', // MySQL host
    user: 'group_16', // MySQL username
    password: 'group_16', // MySQL password
    database: 'group_16_db', // MySQL database name
    insecureAuth: true
});

// Connect to the MySQL database and handle errors
connection.connect((err) => {
    if(err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
})

// Export MySQL connection object to be used in othr files
module.exports = connection;
