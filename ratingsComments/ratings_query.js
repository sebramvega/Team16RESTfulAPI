/////////////////////////////////////////////////////////////////////////
// This script will contain all methods needed to read and write
// entries of the ratings table. Require where needed.
/////////////////////////////////////////////////////////////////////

const app = require('./app')
const db = app.get('db');

const ratingsQuery = {
    // Get all rating table row for a given book_id
    getBookRatings(bookID)
    {
        return new Promise((resolve, reject) => {
            query = "SELECT * FROM ratings WHERE book_id="+bookID;
            db.query(query, (error, results) => {
                if(error)
                {
                    console.error('Error executing ratings query: ', error);
                    reject(error);
                    return;
                }

                resolve(results);
            });
        });   
    },

    // Get all rating table rows from a given user_id
    getUserRatings(userID)
    {
        return new Promise((resolve, reject) => {
            query = "SELECT * FROM ratings WHERE user_id="+bookID;
            db.query(query, (error, results) => {
                if(error)
                {
                    console.error('Error executing ratings query: ', error);
                    reject(error);
                    return;
                }

                resolve(results);
            });
        });   
    },

    // Insert a rating entry (date stamp will be generated on entry by MySQL)
    insertRating(bookID, userID, rating, comment)
    {
        return new Promise((resolve, reject) => {
            newRating = {
                book_id: bookID,
                user_id: userID,
                rating: rating,
                comment: comment
            };
            query = "INSERT INTO ratings SET ?";
            db.query(query, newRating, (error, results) => {
                if(error)
                {
                    console.error('Error executing ratings query: ', error);
                    reject(error);
                    return;
                }

                resolve(results);
            });
        });   
    }
}

module.exports = ratingsQuery;
