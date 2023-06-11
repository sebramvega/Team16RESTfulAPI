import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
uuidv4();

const router = express.Router();

const data = {};
// all routes in here will start with /users
router.get('/', (req, res) => {
    console.log('Grabbed Data');
    const query = 'SELECT * FROM TestTable1';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Error retrieving data');
      }
      console.log('Data retrieved successfully:');
      res.send(results);
  });
});

router.get('/:id', (req,res) => {
    const { id } = req.params;

    const query = 'SELECT testName FROM TestTable1 WHERE id = ?';
    db.query(query, id, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Error retrieving data');
      }
  
      if (results.length === 0) {
        return res.status(404).send('Name not found');
      }
  
      console.log('Name retrieved successfully:', results[0].testName);
      res.send(results[0].testName);
    });
});

router.post('/', (req, res) => {
    console.log('POST ROUTE REACHED');

    const data = req.body;


    const query = 'INSERT INTO TestTable1 SET ?';
    db.query(query, { ...data, id: uuidv4()}, (error, results) => {
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

