import express from 'express';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const router = express.Router();

const users = [];
// all routes in here will start with /users
router.get('/', (req, res) => {
    console.log(users);

    res.send(users);
});

router.post('/', (req, res) => {
    console.log('POST ROUTE REACHED');

    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`User with the name ${user.firstName} added to the database`);
});

//users/2 => req.params { id: 2 }

router.get('/:id', (req, res) => {
    const {id} = req.params;

    res.send(req.params);
});

export default router;