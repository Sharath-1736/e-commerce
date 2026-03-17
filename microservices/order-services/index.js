const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database.json');

app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`Order Service: ${req.method} @ ${req.url}`);
    next();
});

// Endpoint to create a new order
app.post('/orders', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dbPath));
    const { productId, quantity } = req.body;

    const product = data.products.find(p => p.id === productId);

    if (!product || product.stock < quantity) {
        return res.status(400).json({ message: "Order failed: Invalid product or stock" });
    }

    //Update stock and save order
    product.stock -= quantity;
    const newOrder = { id: Date.now(), productId, quantity, total: product.price * quantity };
    data.orders.push(newOrder);

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    res.status(201).json(newOrder);
});

app.listen(3003, () => {
    console.log(`Order Microservice running on http://localhost:3003/orders`);
});