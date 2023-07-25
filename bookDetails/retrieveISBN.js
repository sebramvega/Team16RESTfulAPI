const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./database');
const addBookRouter = require('./addBook');
const retrieveISBNRouter = require('./retrieveISBN');
const addAuthorRouter = require('./addAuthor');
const retrieveBooksRouter = require('./retrieveBooks');


const app = express();
const port = 3000;

//middleware used to parse requests as JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('Request received:', req.method, req.url);
    next();
  });

//root route used to test connection
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

//Following four lines of code mounts each router to their respective endpoints
app.use('/api/books', addBookRouter);
app.use('/api/books/:isbn', retrieveISBNRouter);
app.use('/api/authors', addAuthorRouter);
app.use('/api/books', retrieveBooksRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
