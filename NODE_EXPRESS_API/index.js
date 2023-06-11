import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage!'));

app.listen(PORT, () => console.log(`Server is Running on port: http://localhost:${PORT}`));








const db = mysql.createConnection({
  host: 'db4free.net', // MySQL host
  user: 'group_16', // MySQL username
  password: 'group_16', // MySQL password
  database: 'group_16_db' // MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Set the database connection for further use
app.set('db', db);

