const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database.json');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Product Service: ${req.method} @ ${req.url}`);
    next();
});

// CRUD operations for products
app.get('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dbPath));
    res.json(data.products);
});

app.get('/products/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dbPath));
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ message: "Product not found" });
});

app.listen(3002, () => {
    console.log(`Product Microservice running on http://localhost:3002/products`);
});