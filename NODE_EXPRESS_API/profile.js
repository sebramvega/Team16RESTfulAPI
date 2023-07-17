const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Array to store user profiles (replace with a database in a production environment)
const users = [];

// Register a new user
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // Additional registration logic, e.g., password hashing and validation

  const newUser = { username, email, password };
  users.push(newUser);

  res.status(200).json({ message: 'Registration successful!' });
});

// Login a user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username && user.password === password);
  if (!user) {
    res.status(401).json({ message: 'Invalid username or password.' });
    return;
  }

  res.status(200).json({ message: 'Login successful!' });
});

// Get user profile
app.get('/profile/:username', (req, res) => {
  const { username } = req.params;

  const user = users.find((user) => user.username === username);
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  res.status(200).json(user);
});

// Update user profile
app.put('/profile/:username', (req, res) => {
  const { username } = req.params;
  const { email, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  user.email = email;
  user.password = password;
  // Additional profile information update logic

  res.status(200).json({ message: 'Profile updated successfully!' });
});

// Reset user password
app.put('/reset-password/:username', (req, res) => {
  const { username } = req.params;
  const { password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  user.password = password;
  // Additional password reset logic

  res.status(200).json({ message: 'Password reset successful!' });
});

// Delete user account
app.delete('/delete-account/:username', (req, res) => {
  const { username } = req.params;

  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex === -1) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  users.splice(userIndex, 1);

  res.status(200).json({ message: 'Account deleted successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
