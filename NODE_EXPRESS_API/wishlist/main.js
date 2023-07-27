const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

//API Middleware
app.use(bodyParser.json());
app.use(express.json());

//Create MySQL database connection
const con = mysql.createConnection({

    host: 'db4free.net', //MySQL host
    user: 'group_16', //MySQL username
    password: 'group_16', //MySQL paasword
    database: 'group_16_db' //MySQL database name
});

//Checks for errors and throws error message if error was found or shows message that connection was successful
con.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log("MySQL connection established");
});

//Create wishlist
// app.post('/wishlist', (req, res)=>{

//     const id = req.body.id;
//     const user_id = req.body.user_id;
//     const wishlistname = req.body.wishlistname;

//     con.query('INSERT INTO wishlists VALUES (?, ?, ?)', [id, user_id, wishlistname], (err, result)=>
//     {
//         if (err) {

//             console.log(err);

//         }else{

//             res.send("1 wishlist created");

//         }
//     })

// } )


//Create wishlist using auto increment for the wishlist id
app.post('/wishlist', (req, res)=>{

    const id = req.auto_increment;
    const user_id = req.body.user_id;
    const wishlistname = req.body.wishlistname;

    con.query('INSERT INTO wishlists VALUES (?, ?, ?)', [id, user_id, wishlistname], (err, result)=>
    {
        if (err) {

            console.log(err);

        }else{

            res.send("1 wishlist created");

        }
    })

} )

//add books to wishlist
app.post('/addBook', (req, res)=>{

    const {primary_key, id} = req.body;
    const bookLookup = 'SELECT primary_key, title, price FROM bookTable WHERE primary_key = ?';
    const wishlistLookup = 'SELECT id FROM wishlists WHERE id = ?';
    const update = 'UPDATE wishlists SET books = ? WHERE id = ?';

    // Retrive the book primary_key, title and price from bookTable
    con.query(bookLookup, primary_key, (err, result) => {

        if(err){

            console.error('Error retriving book');
            res.send('Error retriving book');
        }

        if(result.length === 0){

            res.send("Book not found");
        }

        const {primary_key, title, price} = result[0];

        // Retrive the wishlist books JSON from wishlist
        con.query(wishlistLookup, id, (err, wishlistResult) => {
        
            if(err){

                console.error('Error retriving wishlist');
                res.send('Error retriving wishlist');
            }

            if(result.length === 0){

                res.send("Wishlist not found");
            }

            const wishlist = wishlistResult[0];
            const books = wishlist.books ? JSON.parse(wishlist.books) : {};
      
            // Add a book to the wishlist JSON
            const book = {
              title,
              price,
              key: primary_key
            };

            if (!books.wishlistbooks) {

                books.wishlistbooks = [];

            }

            books.wishlistbooks.push(book);

            // Update the wishlist with the modified books JSON
            con.query(update, [JSON.stringify(books), id], (updateErr) => {

                if (updateErr) {

                    console.error('Error updating wishlist:', updateErr);
                    return res.send('Error updating wishlist');

                }else{

                    console.log('1 book added to wishlist successfully');
                    res.send('1 book added to wishlist successfully');
                }

            })

        })
    })
})

//Remove book from wishlist and add to user shopping cart
app.delete('/removeBook/:primary_key/:id', (req, res)=>{

    const {primary_key, id} = req.params;
    const findBook = 'SELECT books FROM wishlists WHERE id = ?';

        // Retrive the wishlist books JSON from wishlist
        con.query(findBook, id, (err, result) => {
        
            if(err){

                console.error('Error retriving wishlist books');
                res.status(500).send('Error retriving wishlist books');
            }

            if(result.length === 0){

                res.status(404).send("Wishlist book not found");
            }

            const books = result[0].books;

            if (!books) {

            return res.send('No books found for this wishlist');
            
            }

            let bookItems = JSON.parse(books);

            const { bookList } = bookItems;

            const bookIndex = bookList.findIndex((bk) => bk.key === Number(primary_key));

            if (bookIndex === -1) {

                return res.send('Book not found');

            }

            bookList.splice(bookIndex, 1);

            const updatedWishListBooks = JSON.stringify(bookItems);

            const update = 'UPDATE wishlists SET books = ? WHERE id = ?';

            con.query(update, [updatedWishListBooks, id], (updateError) => {

                if (updateError) {

                    console.error('Error updating data:', updateError);
                    return res.send('Error updating data');

                }

                console.log('Book removed from wishlist successfully');
                res.send('Book removed from wishlist successfully');

             })

         })    
})


app.get('/getBooks/:id', (req, res)=> {

    const {id} = req.params;
    const listBooks = 'SELECT books FROM wishlists WHERE id = ?';

    con.query(listBooks, id, (err, result) => {

        // if(err){

        //     console.error('Error retriving wishlist books');
        //     res.status(500).send('Error retriving wishlist books');
        // }

        // if(result.length === 0){

        //     res.status(404).send("Wishlist book not found");
        // }

        // const books = result[0].books;

        // if(books){

        
        // }

        if(err){

            console.error('Error retriving wishlist books');
            res.status(500).send('Error retriving wishlist books');

        }else{

            res.send(books);
        }
    })

})


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });



