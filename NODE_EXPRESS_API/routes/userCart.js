import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
uuidv4();
const router = express.Router();


router.get('/list/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT shopBook_price FROM TestTable2 WHERE id = ?';
  db.query(query, id, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).send('Error retrieving data');
    }

    if (results.length === 0) {
      return res.status(404).send('List not found');
    }

    const shopBook_price = results[0].shopBook_price;

    if (!shopBook_price) {
      return res.send([]);
    }

    const books = JSON.parse(shopBook_price).books;

    const bookNames = books.map((book) => book.title);

    console.log('List retrieved successfully:', bookNames);
    res.send(bookNames);
  });
});

router.get('/price/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT shopBook_price FROM TestTable2 WHERE id = ?';

  db.query(query, id, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).send('Error retrieving data');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const shopBook_price = results[0].shopBook_price;
    let totalPrice = 0;

    if (shopBook_price) {
      const books = JSON.parse(shopBook_price).books;
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
  const bookQuery = 'SELECT primary_key, title, price FROM myTable WHERE primary_key = ?';
  const userQuery = 'SELECT shopBook_price FROM TestTable2 WHERE id = ?';
  const updateQuery = 'UPDATE TestTable2 SET shopBook_price = ? WHERE id = ?';

  // Retrieve the book primary_key, title, and price from the myTable
  db.query(bookQuery, primary_key, (bookError, bookResults) => {
    if (bookError) {
      console.error('Error retrieving book data:', bookError);
      return res.status(500).send('Error retrieving book data');
    }

    if (bookResults.length === 0) {
      return res.status(404).send('Book not found');
    }

    const { primary_key, title, price } = bookResults[0];

    // Retrieve the current shopBook_price JSON from the TestTable2
    db.query(userQuery, id, (userError, userResults) => {
      if (userError) {
        console.error('Error retrieving user data:', userError);
        return res.status(500).send('Error retrieving user data');
      }

      if (userResults.length === 0) {
        return res.status(404).send('User not found');
      }

      const user = userResults[0];
      const shopBook_price = user.shopBook_price ? JSON.parse(user.shopBook_price) : {};

      // Add the new book to the shopBook_price JSON
      const newBook = {
        title,
        price,
        key: primary_key
      };
      if (!shopBook_price.books) {
        shopBook_price.books = [];
      }
      shopBook_price.books.push(newBook);

      // Update the TestTable2 with the modified shopBook_price JSON
      db.query(updateQuery, [JSON.stringify(shopBook_price), id], (updateError) => {
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
  const userQuery = 'SELECT shopBook_price FROM TestTable2 WHERE id = ?';

  db.query(userQuery, id, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).send('Error retrieving data');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const shopBook_price = results[0].shopBook_price;

    if (!shopBook_price) {
      return res.status(404).send('No books found for the user');
    }

    let shopBook_priceObj = JSON.parse(shopBook_price);

    const { books } = shopBook_priceObj;
    const bookIndex = books.findIndex((book) => book.key === Number(primary_key));

    if (bookIndex === -1) {
      return res.status(404).send('Book not found');
    }

    books.splice(bookIndex, 1);

    const updatedShopBook_price = JSON.stringify(shopBook_priceObj);

    const updateQuery = 'UPDATE TestTable2 SET shopBook_price = ? WHERE id = ?';

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