const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//View all categories
router.get('/', categoryController.getAllCategories);

//Add a new category
router.post('/', categoryController.addCategory);

module.exports = router;