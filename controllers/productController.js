const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database.json');

const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// 1. GET all products
exports.getAllProducts = (req, res) => {
    const data = readData();
    res.json(data.products);
};

// 2. GET product by ID
exports.getProductById = (req, res) => {
    const data = readData();
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ message: "Product not found" });
};

// 3. POST add product
exports.addProduct = (req, res) => {
    const data = readData();
    const newProduct = req.body;
    data.products.push(newProduct);
    writeData(data);
    res.status(201).json({ message: "Product added successfully", 
        product: newProduct 
    });
};

// 4. PUT update product
exports.updateProduct = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.products.findIndex(p => p.id === id);

    if (index !== -1) {
        data.products[index] = { ...data.products[index], ...req.body };
        writeData(data);
        res.json({ message: "Product updated", product: data.products[index] });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

// 5. DELETE product
exports.deleteProduct = (req, res) => {
    let data = readData();
    const id = parseInt(req.params.id);
    const initialLength = data.products.length;
    data.products = data.products.filter(p => p.id !== id);

    if (data.products.length < initialLength) {
        writeData(data);
        res.json({ message: "Product deleted successfully" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};