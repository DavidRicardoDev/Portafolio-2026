const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * --- CORE API ROUTES ---
 */

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server_time: new Date() });
});

// GET /api/projects - Fetches all projects, real ones first
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY is_placeholder ASC, created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Project fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/skills - Fetches all technical skills
app.get('/api/skills', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills');
    res.json(rows);
  } catch (err) {
    console.error('Skills fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// POST /api/contact - Saves a contact message to the DB
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await db.query('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact submit error:', err);
    res.status(500).json({ error: 'Failed to save message locally' });
  }
});

/**
 * --- TODO APP DEMO ROUTES ---
 */

app.get('/api/todos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const [result] = await db.query('INSERT INTO todos (text) VALUES (?)', [text]);
    res.json({ id: result.insertId, text, completed: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  const { completed } = req.body;
  try {
    await db.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`\x1b[32m✔ Portfolio Server running on port ${port}\x1b[0m`);
});
