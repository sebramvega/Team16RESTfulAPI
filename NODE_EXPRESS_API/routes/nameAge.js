import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
uuidv4();

const router = express.Router();

const data = {};
// all routes in here will start with /users
router.get('/', (req, res) => {
    console.log(data);

    res.send(data);
});

router.post('/', (req, res) => {
    console.log('POST ROUTE REACHED');

    const data = req.body;

    const query = 'INSERT INTO TestTable1 SET ?';
    db.query(query, data, (error, results) => {
        if (error) {
          console.error('Error inserting data:', error);
          return res.status(500).send('Error inserting data');
        }
        console.log('Data inserted successfully:', results);
        res.send('Data inserted successfully');
      });
    
    res.send(`User with the name ${data.testName} added to the database`);
});
export default router;

