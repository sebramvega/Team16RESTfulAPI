import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
uuidv4();
const router = express.Router();


router.get('/list/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT shoppingCart FROM userTable WHERE id = ?';
  db.query(query, id, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).send('Error retrieving data');
    }

    if (results.length === 0) {
      return res.status(404).send('List not found');
    }

    const shoppingCart = results[0].shoppingCart;

    if (!shoppingCart) {
      return res.send([]);
    }

    const books = JSON.parse(shoppingCart).books;

    const bookNames = books.map((book) => book.title);

    console.log('List retrieved successfully:', bookNames);
    res.send(bookNames);
  });
});

router.get('/price/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT shoppingCart FROM userTable WHERE id = ?';

  db.query(query, id, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).send('Error retrieving data');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const shoppingCart = results[0].shoppingCart;
    let totalPrice = 0;

    if (shoppingCart) {
      const books = JSON.parse(shoppingCart).books;
      books.forEach((book) => {
        totalPrice += book.price;
      });
    }

    // Round totalPrice to 2 decimal places
    totalPrice = totalPrice.toFixed(2);

    console.log('Total price:', totalPrice);
    res.send({ totalPrice });
  });
});


router.post('/add-book', (req, res) => {
  const { primary_key, id } = req.body;
  const bookQuery = 'SELECT primary_key, title, price FROM bookTable WHERE primary_key = ?';
  const userQuery = 'SELECT shoppingCart FROM userTable WHERE id = ?';
  const updateQuery = 'UPDATE userTable SET shoppingCart = ? WHERE id = ?';

  // Retrieve the book primary_key, title, and price from the bookTable
  db.query(bookQuery, primary_key, (bookError, bookResults) => {
    if (bookError) {
      console.error('Error retrieving book data:', bookError);
      return res.status(500).send('Error retrieving book data');
    }

    if (bookResults.length === 0) {
      return res.status(404).send('Book not found');
    }

    const { primary_key, title, price } = bookResults[0];

    // Retrieve the current shoppingCart JSON from the userTable
    db.query(userQuery, id, (userError, userResults) => {
      if (userError) {
        console.error('Error retrieving user data:', userError);
        return res.status(500).send('Error retrieving user data');
      }

      if (userResults.length === 0) {
        return res.status(404).send('User not found');
      }

      const user = userResults[0];
      const shoppingCart = user.shoppingCart ? JSON.parse(user.shoppingCart) : {};

      // Add the new book to the shoppingCart JSON
      const newBook = {
        title,
        price,
        key: primary_key
      };
      if (!shoppingCart.books) {
        shoppingCart.books = [];
      }
      shoppingCart.books.push(newBook);

      // Update the userTable with the modified shoppingCart JSON
      db.query(updateQuery, [JSON.stringify(shoppingCart), id], (updateError) => {
        if (updateError) {
          console.error('Error updating user data:', updateError);
          return res.status(500).send('Error updating user data');
        }

        console.log('Book added successfully');
        res.send('Book added successfully');
      });
    });
  });
});

router.delete('/:primary_key/:id', (req, res) => {
  const { primary_key, id } = req.params;
  const userQuery = 'SELECT shoppingCart FROM userTable WHERE id = ?';

  db.query(userQuery, id, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).send('Error retrieving data');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const shoppingCart = results[0].shoppingCart;

    if (!shoppingCart) {
      return res.status(404).send('No books found for the user');
    }

    let shoppingCartObj = JSON.parse(shoppingCart);

    const { books } = shoppingCartObj;
    const bookIndex = books.findIndex((book) => book.key === Number(primary_key));

    if (bookIndex === -1) {
      return res.status(404).send('Book not found');
    }

    books.splice(bookIndex, 1);

    const updatedShopBook_price = JSON.stringify(shoppingCartObj);

    const updateQuery = 'UPDATE userTable SET shoppingCart = ? WHERE id = ?';

    db.query(updateQuery, [updatedShopBook_price, id], (updateError) => {
      if (updateError) {
        console.error('Error updating data:', updateError);
        return res.status(500).send('Error updating data');
      }

      console.log('Book removed successfully');
      res.send('Book removed successfully');
    });
  });
});

export default router;