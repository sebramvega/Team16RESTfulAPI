const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const con = require('./database.js');

// import con from '/database.js';

//API Middleware
app.use(bodyParser.json());
app.use(express.json());

app.post('/wishlist', (req, res)=>{

    const id = req.body.id;
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


// //Create MySQL database connection
// const con = mysql.createConnection({

//     host: 'db4free.net', //MySQL host
//     user: 'group_16', //MySQL username
//     password: 'group_16', //MySQL paasword
//     database: 'group_16_db' //MySQL database name
// });

// con.connect(function(err) {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log("MySQL connection established");

//     //insert row into wishlist table 
//     var list = "INSERT INTO wishlists (id, user_id, wishlistname) VALUES ('1234', '0000', 'action')";

//     con.query(list, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });

module.exports = app;