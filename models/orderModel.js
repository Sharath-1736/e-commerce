const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../database.json');

const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

const getAll = () => readData().orders;

//update the product stock in the database
const create = (orderData) => {
    const data = readData();
    const product = data.products.find(p => p.id === orderData.productId);
    if (product) {
        product.stock -= orderData.quantity;
    }
    data.orders.push(orderData);
    writeData(data);
    return orderData;
};

module.exports = { getAll, create };