const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

exports.getAllOrders = (req, res) => {
    res.json(orderModel.getAll());
};

exports.createOrder = (req, res) => {
    const { id, productId, quantity } = req.body;

    // Use Product Model to find the product
    const product = productModel.getById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity) return res.status(400).json({ message: "Out of stock" });

    const totalPrice = product.price * quantity;
    
    // Use Order Model to save and update stock
    const newOrder = orderModel.create({ id, productId, quantity, totalPrice });

    res.status(201).json(newOrder);
};