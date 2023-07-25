const express = require('express');
const router = express.Router();
const connection = require('./database');

router.post('/', (req, res) => {
    const { first_name, last_name, biography, publisher } = req.body;

    const author = {
        first_name,
        last_name,
        biography,
        publisher
    };

    const query =  "INSERT INTO authorTable (`first_name`, `last_name`, `biography`, `publisher`) VALUES (?, ?, ?, ?)";
    const values = [
        author.first_name,
        author.last_name,
        author.biography,
        author.publisher
    ];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error adding author: ', error);
            res.sendStatus(500);
        } 
        else {
            res.sendStatus(201);
        }
    });
});
module.exports = router;