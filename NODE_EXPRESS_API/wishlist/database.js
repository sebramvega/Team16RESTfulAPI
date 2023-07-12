const mysql = require('mysql');
const express = require('express');

const app = express();

//Create MySQL database connection
const con = mysql.createConnection({

    host: 'db4free.net', //MySQL host
    user: 'group_16', //MySQL username
    password: 'group_16', //MySQL paasword
    database: 'group_16_db' //MySQL database name
});

//Checks for errors and throws error message if error was found or shows message that connection was successful
con.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log("MySQL connection established");
});

// Exports connection for future use
module.exports = con;
