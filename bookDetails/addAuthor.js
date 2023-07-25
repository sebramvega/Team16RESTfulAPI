/*
An administrator must be able to create an author with first name, last name, biography and publisher
o Logic: Given an Author’s Info, add it to the system.
o HTTP Request Type: POST
o Parameters Sent: Author
o Response Data: None
*/

const express = require('express');
const router = express.Router();
const connection = require('./database');

router.post('/', (req, res) => {
    //Extracts author from body
    const { first_name, last_name, biography, publisher } = req.body;

    const author = {
        first_name,
        last_name,
        biography,
        publisher
    };

    //Makes a SQL query to insert values into authorTable
    const query =  "INSERT INTO authorTable (`first_name`, `last_name`, `biography`, `publisher`) VALUES (?, ?, ?, ?)";
    const values = [
        author.first_name,
        author.last_name,
        author.biography,
        author.publisher
    ];

    //executes the above query with logic for error handling.\
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
