
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Temporary plant data
let plants = [
    { id: 1, name: 'Rose', type: 'Flowering Plant' },
    { id: 2, name: 'Aloe Vera', type: 'Medicinal Plant' },
    { id: 3, name: 'Tulsi', type: 'Herb' }
];

// Temporary gardening tasks
let tasks = [
    { id: 1, name: 'Water the plants' },
    { id: 2, name: 'Add organic compost' }
];

// GET: Display all plants
app.get('/api/plants', (req, res) => {
    res.status(200).json(plants);
});

// POST: Add a new plant
app.post('/api/plants', (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
        return res.status(400).json({
            message: 'Please enter plant name and type'
        });
    }

    const newPlant = {
        id: Date.now(),
        name,
        type
    };

    plants.push(newPlant);

    res.status(201).json(newPlant);
});

// GET: Display all tasks
app.get('/api/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// POST: Add a new gardening task
app.post('/api/tasks', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Please enter a task'
        });
    }

    const newTask = {
        id: Date.now(),
        name
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: '404 - Page Not Found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Blooms & Ferns running at http://localhost:${PORT}`);
});
