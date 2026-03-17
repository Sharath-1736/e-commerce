const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Path of shared database
const dbPath = path.join(__dirname, '../../database.json'); 

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Category Service received: ${req.method} from ${req.url}`);
    next(); 
});

app.get('/categories', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dbPath));
    res.json(data.categories);
});

app.listen(3001, () => {
    console.log(`Category Microservice running on http://localhost:3001/categories`);
});