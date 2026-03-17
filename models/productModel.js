const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database.json');

const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

const getAll = () => readData().products;

const getById = (id) => readData().products.find(p => p.id === id);

//Add a new product to the database
const add = (newProduct) => {
    const data = readData();
    data.products.push(newProduct);
    writeData(data);
    return newProduct;
};

//Update an existing product in the database
const update = (id, updatedFields) => {
    const data = readData();
    const index = data.products.findIndex(p => p.id === id);
    if (index !== -1) {
        data.products[index] = { ...data.products[index], ...updatedFields };
        writeData(data);
        return data.products[index];
    }
    return null;
};

//Remove a product from the database
const remove = (id) => {
    let data = readData();
    const initialLength = data.products.length;
    data.products = data.products.filter(p => p.id !== id);
    if (data.products.length < initialLength) {
        writeData(data);
        return true;
    }
    return false;
};

//Get a product by its slug
const getBySlug = (slug) => {
    return readData().products.find(p => p.slug === slug);
};

module.exports = { getAll, getById, add, update, remove, getBySlug };