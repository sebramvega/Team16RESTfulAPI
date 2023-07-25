/*
Must be able to retrieve a list of books associated with an author
o Logic: Given an Author’s Id, return the list of books for that author.
o HTTP Request Type: GET
o Parameters Sent: Author Id
o Response Data: JSON list of Book Objects
*/

const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    //Grabs the authors name from the parameters
    const authorName = req.query.authorName;
    const query = "SELECT * FROM bookTable WHERE author = ?";

    //Executes SQL query to retrieve books using AuthorID while handling errors.
    connection.query(query, [authorName], (error, results) => {
        if (error) {
            console.error('Error retrieeving books for the author: ', error);
            res.sendStatus(500);
        }
        else {
            res.json(results);
        }
    });
});

module.exports = router;
