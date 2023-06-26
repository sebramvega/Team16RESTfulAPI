import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
uuidv4();
const router = express.Router();


router.get('/:id', (req,res) => {
  const { id } = req.params;
  const query = 'SELECT shoppingList FROM TestTable1 WHERE id = ?';
  db.query(query, id, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Error retrieving data');
      }
  
      if (results.length === 0) {
        return res.status(404).send('List not found');
      }

      console.log('List retrieved successfully:', results);
      res.send(results);
    });
});

export default router;