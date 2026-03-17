const categoryModel = require('../models/categoryModel');

exports.getAllCategories = (req, res) => {
    const categories = categoryModel.getAll();
    res.json(categories);
};

exports.addCategory = (req, res) => {
    const newCategory = categoryModel.add(req.body);
    res.status(201).json({ message: "Category added", category: newCategory });
};