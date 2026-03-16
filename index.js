const express = require('express');
const app = express();
app.use(express.json());

// Import Routes
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);});