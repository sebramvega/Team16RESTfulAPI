require('./db.js'); // Run connect to database script
const app = require('./app.js'); //import app object
const ratingsQuery = require('./ratings_query.js'); //import ratings query object


// Get an existing test row from the ratings table 
ratingsQuery.getBookRatings(24223)
    .then((results) => {
        console.log("\n==================== SELECT Query Success ======================")
        parseTestResult(results);
    })
    .catch((error) => {
        console.log(error);
    });


// Generate random book_id and user_id for testing
var bookID = Math.trunc(Math.random() * 1000);
var userID = Math.trunc(Math.random() * 1000);

// Insert the test row into the ratings table 
ratingsQuery.insertRating(bookID, userID, 3, "This is a test insert from Node.js")
    .then((results) => {
        // Query the row we just inserted to prove it's in the database
        ratingsQuery.getBookRatings(bookID)
        .then((results) => {            
            console.log("\n==================== INSERT Query Success ======================")
            parseTestResult(results);        
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
});




    

function parseTestResult(data) {
    console.log("Resulted in " + data.length + " rows.\n")

    for(var row of data)
    {
        console.log("id: " + row.id);
        console.log("book_id: " + row.book_id);
        console.log("user_id: " + row.user_id);
        console.log("rating: " + row.rating);
        console.log("comment: " + row.comment);
        console.log("date: " + row.datestamp);
        console.log("");
    }
}