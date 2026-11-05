
const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

let items = [
    { id: 1, name: 'Laptop', stock: 10 },
    { id: 2, name: 'Mouse', stock: 20 }
];

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Express Server Running</h1>');
});

// GET all items
app.get('/api/items', (req, res) => {
    res.json({ success: true, data: items });
});

// POST new item
app.post('/api/items', (req, res) => {
    const { name, stock } = req.body;

    if (!name || stock === undefined) {
        return res.status(400).json({
            message: 'Please provide name and stock'
        });
    }

    const newItem = {
        id: items.length + 1,
        name: name,
        stock: Number(stock)
    };

    items.push(newItem);

    res.status(201).json({
        success: true,
        data: newItem
    });
});

// 404 route
app.use((req, res) => {
    res.status(404).send('404 - Endpoint Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
