import express from 'express';
import bodyParser from 'body-parser';


// Add your routes here
import userCartRoutes from './routes/userCart.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Add your routes here
app.use('/userCart', userCartRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage!'));

app.listen(PORT, () => console.log(`Server is Running on port: http://localhost:${PORT}`));
