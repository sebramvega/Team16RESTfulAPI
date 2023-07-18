/////////////////////////////////////////////////////////////////////////
// This script will contain all methods needed to read and write
// entries of the reviews table. Require in main script.
/////////////////////////////////////////////////////////////////////

const app = require('./app')
const db = app.get('db');

const reviewQuery = {
    // Get all rating table row for a given book_id
    getBookReviews(bookID)
    {
        return new Promise((resolve, reject) => {
            query = "SELECT * FROM reviewTable WHERE book_id="+bookID;
            db.query(query, (error, results) => {
                if(error)
                {
                    console.error('Error executing get book reviews query: ', error);
                    reject(error);
                    return;
                }

                resolve(results);
            });
        });   
    },

    // Get all rating table rows from a given user_id
    getUserReviews(userID)
    {
        return new Promise((resolve, reject) => {
            query = "SELECT * FROM reviewTable WHERE user_id="+userID;
            db.query(query, (error, results) => {
                if(error)
                {
                    console.error('Error executing get user reviews query: ', error);
                    reject(error);
                    return;
                }

                resolve(results);
            });
        });   
    },

    // Insert a rating entry (date stamp will be generated on entry by MySQL)
    insertReview(bookID, userID, rating, comment)
    {
        return new Promise((resolve, reject) => {
            newRating = {
                book_id: bookID,
                user_id: userID,
                rating: rating,
                comment: comment
            };
            query = "INSERT INTO reviewTable SET ?";
            db.query(query, newRating, (error, results) => {
                if(error)
                {
                    console.error('Error executing review INSERT query: ', error);
                    reject(error);
                    return;
                }

                resolve(results);
            });
        });   
    },

    // Delete a given review entry by id
    deleteReview(reviewID)
    {
        return new Promise((resolve, reject) => {
            query = "DELETE FROM reviewTable WHERE id="+reviewID;
            db.query(query, (error, results) => {
                if(error)
                {
                    console.error('Error executing review DELETE query: ', error);
                    reject(error);
                    return;
                }

                resolve(results);
            });
        });   
    },
    
    // Calculates the given book's new average rating by weighted average calculation.
    // Gets # of existing ratings, calculates new average, then updates the
    // average rating in the bookTable
    UpdateAverageRating(bookID)
    {
        this.getBookReviews(bookID)
            .then((results) => {
                var numRatings = 0;
                var currentAvg = 0;
                var newAvg = 0;

                for(var row of results)
                {
                    currentAvg += Number(row.rating);
                    numRatings += 1;
                }

                if(numRatings > 0)
                {
                    newAvg = currentAvg / numRatings;
                    newAvg = Math.round(newAvg * 10) / 10;
                }

                console.log("Average rating: " + newAvg + " ... Num ratings: " + numRatings);

                _UpdateAvgRating(bookID, newAvg)
                    .then((results) => {
                        console.log("Successfully updated average rating of " + newAvg + " for book " + bookID);
                    })
                    .catch(() => {
                        console.log("Average rating error.");
                    });
            })
            .catch((error) => {
                console.log(error);
            });       
    }
}

var _UpdateAvgRating = function(bookID, rating)
{

    return new Promise((resolve, reject) => {
        query = "UPDATE bookTable SET rating = " + rating + " WHERE primary_key = " + bookID;
        db.query(query, (error, results) => {
            if(error)
            {
                console.error('Error executing bookTable rating UPDATE query: ', error);
                reject(error);
                return;
            }

            resolve(results);
        });
    });
}

module.exports = reviewQuery;
