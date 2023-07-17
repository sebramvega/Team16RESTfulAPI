const connection = require ('../../bookDetails/database')

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


//Requests bodies as JSON
app.use(bodyParser.json());

//retrieve unsorted list of books from database

app.get('/booksList', (req, res) => {
    const query = 'SELECT * FROM mytable';

    connection.query(query , (error, results) => {
        if (error){
            console.error("Error retrieving books.", error);
            return res.sendStatus(500);
        }else{ 
            return res.sendStatus(200).json(results);
        }
    })
})

//sorts Unsorted list :)

app.get('/bookList/popular', (req, res) => {
    const query = 'SELECT * FROM mytable';
    let sortedResults;

    connection.query(query , (error, results) => {
        if (error){
            console.error("Error retrieving books.", error);
            return res.sendStatus(500);
        }else{ 
            sortedResults = results.book.numOfBooksSold.sort();

            return res.sendStatus(200).json(sortedResults);
        }
    })
})
