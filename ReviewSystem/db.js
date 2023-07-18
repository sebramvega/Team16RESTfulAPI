const mysql = require('mysql');
const app = require('./app');

const db = mysql.createConnection({
    host: 'db4free.net',
    port: 3306,
    user: 'group_16', 
    password: 'group_16',
    database: 'group_16_db'
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

module.exports = app;
