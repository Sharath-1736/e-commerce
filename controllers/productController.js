const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    res.json(productModel.getAll());
};

exports.getProductById = (req, res) => {
    const product = productModel.getById(parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ message: "Not found" });
};

exports.getProductBySlug = (req, res) => {
    const product = productModel.getBySlug(req.params.slug);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found with that slug" });
    }
};

exports.addProduct = (req, res) => {
    const newProduct = productModel.add(req.body);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const updated = productModel.update(parseInt(req.params.id), req.body);
    updated ? res.json(updated) : res.status(404).json({ message: "Not found" });
};

exports.deleteProduct = (req, res) => {
    const success = productModel.remove(parseInt(req.params.id));
    success ? res.json({ message: "Deleted" }) : res.status(404).json({ message: "Not found" });
};