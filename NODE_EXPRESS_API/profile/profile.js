const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'db4free.net',
  port: 3306,
  user: 'group_16',
  password: 'group_16',
  database: 'group_16_db',
});

// Connect to the MySQL database and handle errors
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create a User with username, password, and optional fields (email)
app.post('/register', (req, res) => {
  console.log(req.body); // Log the request body
  const { username, password, email } = req.body;
  // Additional validation and logic can be added here before inserting the user into the database

  const newUser = { username, password, email };
  connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ message: 'Error creating user' });
      return;
    }

    res.status(200).json({ message: 'User created successfully!' });
  });
});

// Retrieve a User Object and its fields by their username
app.get('/users/:username', (req, res) => {
  const { username } = req.params;

  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ message: 'Error retrieving user' });
      return;
    }

    const user = results[0];
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.status(200).json(user);
  });
});

// Update the user and any of their fields except for mail
app.put('/users/:username', (req, res) => {
  const { username } = req.params;
  const { password, email } = req.body;

  const updatedUser = { password, email };
  connection.query('UPDATE users SET ? WHERE username = ?', [updatedUser, username], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Error updating user' });
      return;
    }

    res.status(200).json({ message: 'User updated successfully!' });
  });
});

// Create Credit Card that belongs to a User
app.post('/users/:username/credit-cards', (req, res) => {
  const { username } = req.params;
  const { card_number, card_holder, expiration_date } = req.body;

  const newCreditCard = { username, card_number, card_holder, expiration_date };
  connection.query('INSERT INTO credit_cards SET ?', newCreditCard, (err, result) => {
    if (err) {
      console.error('Error creating credit card:', err);
      res.status(500).json({ message: 'Error creating credit card' });
      return;
    }

    res.status(200).json({ message: 'Credit card created successfully!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
