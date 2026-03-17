const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database.json');

const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

//Get all categories from the database
const getAll = () => readData().categories;

//Add a new category to the database
const add = (newCategory) => {
    const data = readData();
    data.categories.push(newCategory);
    writeData(data);
    return newCategory;
};

module.exports = { getAll, add };