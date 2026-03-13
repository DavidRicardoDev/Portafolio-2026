const express = require('express');
const cors = require('cors');
const db = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Allow Vercel frontend and local development
const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-david-tan.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

/**
 * --- CORE API ROUTES ---
 */

// --- AUTHENTICATION ---
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET || 'fallback_secret', (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: 'Access denied. No token provided.' });
  }
};

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
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
});

// POST /api/projects (Protected)
app.post('/api/projects', verifyToken, async (req, res) => {
  const { title_es, title_en, description_es, description_en, technologies, repo_url, demo_url, image_url, status, is_placeholder } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO projects (title_es, title_en, description_es, description_en, technologies, repo_url, demo_url, image_url, status, is_placeholder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title_es, title_en, description_es, description_en, JSON.stringify(technologies), repo_url, demo_url, image_url, status || 'completed', is_placeholder || false]
    );
    res.json({ id: result.insertId, message: 'Project created successfully' });
  } catch (err) {
    console.error('Project create error:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id (Protected)
app.put('/api/projects/:id', verifyToken, async (req, res) => {
  const { title_es, title_en, description_es, description_en, technologies, repo_url, demo_url, image_url, status, is_placeholder } = req.body;
  try {
    await db.query(
      'UPDATE projects SET title_es=?, title_en=?, description_es=?, description_en=?, technologies=?, repo_url=?, demo_url=?, image_url=?, status=?, is_placeholder=? WHERE id=?',
      [title_es, title_en, description_es, description_en, JSON.stringify(technologies), repo_url, demo_url, image_url, status, is_placeholder, req.params.id]
    );
    res.json({ message: 'Project updated successfully' });
  } catch (err) {
    console.error('Project update error:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id (Protected)
app.delete('/api/projects/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Project delete error:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// GET /api/skills - Fetches all technical skills
app.get('/api/skills', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills');
    res.json(rows);
  } catch (err) {
    console.error('Skills fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch skills', details: err.message });
  }
});

// POST /api/skills (Protected)
app.post('/api/skills', verifyToken, async (req, res) => {
  const { name, icon_class, category, description_es, description_en } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO skills (name, icon_class, category, description_es, description_en) VALUES (?, ?, ?, ?, ?)',
      [name, icon_class, category, description_es, description_en]
    );
    res.json({ id: result.insertId, message: 'Skill created successfully' });
  } catch (err) {
    console.error('Skill create error:', err);
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

// PUT /api/skills/:id (Protected)
app.put('/api/skills/:id', verifyToken, async (req, res) => {
  const { name, icon_class, category, description_es, description_en } = req.body;
  try {
    await db.query(
      'UPDATE skills SET name=?, icon_class=?, category=?, description_es=?, description_en=? WHERE id=?',
      [name, icon_class, category, description_es, description_en, req.params.id]
    );
    res.json({ message: 'Skill updated successfully' });
  } catch (err) {
    console.error('Skill update error:', err);
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

// DELETE /api/skills/:id (Protected)
app.delete('/api/skills/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    console.error('Skill delete error:', err);
    res.status(500).json({ error: 'Failed to delete skill' });
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
