const express = require('express');
const app = express();

app.use(express.json());

//middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`request: ${req.method} from ${req.url}`);
    next(); 
});

app.get('/orders', (req, res) => {
    res.json([
        { id: 1, productId: 101, quantity: 2 },
        { id: 2, productId: 102, quantity: 1 },
        { id: 3, productId: 103, quantity: 5 }
    ]);
});

// Start the server on Port 3002
app.listen(3002, () => {
    console.log(`Order Service is running on http://localhost:3002/orders`);
});