const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const query = "SELECT * FROM bookTable WHERE ISBN = ?";

    connection.query(query, [isbn], (error, results) => {
        if (error) {
            console.error('Error retrieving book details from ISBN: ', error);
            res.sendStatus(500);
        }
        else {
            if (results.length === 0) {
                res.sendStatus(404);
            }
            else {
                const book = results[0];
                res.json(book);
            }
        }
    });
});
module.exports = router;