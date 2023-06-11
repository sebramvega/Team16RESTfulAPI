import mysql from 'mysql';
import express from 'express';

const app = express();
const db = mysql.createConnection({
    host: 'db4free.net', // MySQL host
    user: 'group_16', // MySQL username
    password: 'group_16', // MySQL password
    database: 'group_16_db' // MySQL database name
});

db.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }
  console.log('Connected to MySQL server.');
});

// Set the database connection for further use
app.set('db', db);

export default db;
