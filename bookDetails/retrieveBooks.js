const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    const authorName = req.query.authorName;
    const query = "SELECT * FROM bookTable WHERE author = ?";

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