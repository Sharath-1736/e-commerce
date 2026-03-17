const express = require('express');
const app = express();

app.use(express.json());

//middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`request: ${req.method} from ${req.url}`);
    next(); 
});

app.get('/categories', (req, res) => {
    res.json([
        { id: 1, name: "Electronics" },
        { id: 2, name: "Books" }
    ]);
});

// Start the server on Port 3001
app.listen(3001, () => {
    console.log(`Category Service is running on http://localhost:3001/categories`);
});