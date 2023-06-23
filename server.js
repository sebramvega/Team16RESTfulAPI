const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./database');
const addBookRouter = require('./addBook');

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

//Mounted addBookRouter to '/api/books' endpoint
app.use('/api/books', addBookRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

