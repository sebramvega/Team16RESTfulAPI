import express from 'express';
import bodyParser from 'body-parser';


import nameAgeRoutes from './routes/nameAge.js';
import usersRoutes from './routes/users.js';
import userCartRoutes from './routes/userCart.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/nameAge', nameAgeRoutes);
app.use('/users', usersRoutes);
app.use('/userCart', userCartRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage!'));

app.listen(PORT, () => console.log(`Server is Running on port: http://localhost:${PORT}`));
