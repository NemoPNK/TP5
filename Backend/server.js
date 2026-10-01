const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;
const pool = new Pool({
    host: 'db',
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.listen(port, () => {
    console.log(`serveur sur http://localhost:${port}`);
})

// Routes API

app.post('/tasks', async (req, res) => {
    const newTask = req.body;
    await pool.query(
        'INSERT INTO tasks (id, titre, complete, assignee) VALUES ($1, $2, $3, $4)',
        [newTask.id, newTask.titre, newTask.complete, newTask.assignee]
    );

    console.log("Task : ", newTask)
    res.status(201).json({
        message: 'Post ok',
        task: newTask
    });
});

app.get('/tasks', async (req, res) => {
    const status = req.query.status;

    let query = 'SELECT * FROM tasks ORDER BY id';

    if (status === 'completed') {
        query = 'SELECT * FROM tasks WHERE complete = TRUE ORDER BY id';
    }

    if (status === 'pending') {
        query = 'SELECT * FROM tasks WHERE complete = FALSE ORDER BY id';
    }

    const result = await pool.query(query);

    res.status(200).json({
        message: 'Get ok',
        task: result.rows
    });
});

app.put('/tasks/:id', async (req, res) => {
    const taskID = req.params.id;
    const putTask = req.body;

    const result = await pool.query(
        'UPDATE tasks SET titre = $1, complete = $2 WHERE id = $3 RETURNING *',
        [putTask.titre, putTask.complete, taskID]
    );

    res.status(200).json({
        message: 'Put ok',
        task: result.rows[0]
    });
});

app.delete('/tasks/:id', async (req, res) => {
    const taskID = req.params.id;

    const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 RETURNING *',
        [taskID]
    );

    res.status(200).json({
        message: 'Delete ok',
        task: result.rows[0]
    });
});

// Fonctionnalité A : marquer une tache complétée
app.patch('/tasks/:id/completed', async (req, res) => {
    const taskID = req.params.id;

    const result = await pool.query(
        'UPDATE tasks SET complete = NOT complete WHERE id = $1 RETURNING *',
        [taskID]
    );

    res.status(200).json({
        message: 'Patch ok',
        task: result.rows[0]
    });
});