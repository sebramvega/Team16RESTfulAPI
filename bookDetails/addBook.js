/*
An administrator must be able to create a book with the book ISBN, book name, book description, price, author,
genre, publisher , year published and copies sold.
o Logic: Given a Book’s info, add it to the system.
o HTTP Request Type: POST
o Parameters Sent: Book Object
o Response Data: None
*/

const express = require('express');
const router = express.Router();
const connection = require('./database');

//Handle POST requests to '/api/books'
router.post('/', (req, res) => {
    const { primary_key, title, author, rating, voters, description, publisher, pages, genres, ISBN, language, date_text, dates, price } = req.body;

    const book = {
      primary_key,
      title,
      author,
      rating,
      voters,
      description,
      publisher,
      pages,
      genres: genres.join(','),
      ISBN,
      language,
      date_text,
      dates,
      price
    };

    //Prepare a SQL query which inserts dummy book into the online database
    const query = "INSERT INTO bookTable SET `primary_key` = ?, `title` = ?, `author` = ?, `rating` = ?, `voters` = ?, `description` = ?, `publisher` = ?, `pages` = ?, `genres` = ?, `ISBN` = ?, `language` = ?, `date_text` = ?, `dates` = ?, `price` = ?";

    const values = [
        book.primary_key,
        book.title,
        book.author,
        book.rating,
        book.voters,
        book.description,
        book.publisher,
        book.pages,
        book.genres,
        book.ISBN,
        book.language,
        book.date_text,
        book.dates,
        book.price
    ];

    //Execute the above mySQL query which adds dummy book to online atabase
    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error adding book:', error);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

module.exports = router;
