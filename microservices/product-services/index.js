const express = require('express');
const app = express();

app.use(express.json());

//middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`request: ${req.method} from ${req.url}`);
    next(); 
});

app.get('/products', (req, res) => {
    res.json([
        { id: 101, name: "Laptop", price: 999.99 },
        { id: 102, name: "Smartphone", price: 599.99 }
    ]);
});

// Start the server on Port 3003
app.listen(3003, () => {
    console.log(`Product Service is running on http://localhost:3003/products`);
});