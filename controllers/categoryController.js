const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database.json');

const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.getAllCategories = (req, res) => {
    res.json(readData().categories);
};

exports.addCategory = (req, res) => {
    const data = readData();
    data.categories.push(req.body);
    writeData(data);
    res.status(201).json({ message: "Category added", category: req.body });
};