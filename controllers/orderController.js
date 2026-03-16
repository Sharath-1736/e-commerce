const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database.json');

const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.getAllOrders = (req, res) => {
    res.json(readData().orders);
};

exports.createOrder = (req, res) => {
    const data = readData();
    const { id, productId, quantity } = req.body;

    //Find the product
    const product = data.products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Order failed: Product not found" });
    }

    // Check stock
    if (product.stock < quantity) {
        return res.status(400).json({ message: `Insufficient stock. Only ${product.stock} left.` });
    }

    // Calculate Total Price
    const totalPrice = product.price * quantity;

    // Reduce stock in the products array
    product.stock -= quantity;

    // Save the order
    const newOrder = { id, productId, quantity, totalPrice };
    data.orders.push(newOrder);

    writeData(data);

    res.status(201).json({ 
        message: "Order placed successfully!", 
        order: newOrder,
        remainingStock: product.stock 
    });
};