const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: `http://localhost:3000/uploads/${req.file.filename}` });
});

app.post('/projects', (req, res) => {
  const { title, intro, details, cover, gallery, publish, year, category } = req.body;
  const slug = slugify(title, { lower: true });

  const newProject = {
    title,
    slug,
    intro,
    details,
    cover,
    gallery: JSON.stringify(gallery),
    publish,
    year,
    category
  };

  db.query('INSERT INTO projects SET ?', newProject, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send({ error: 'Database query failed', details: err.message });
    }
    res.status(201).json({ id: results.insertId, ...newProject });
  });
});

app.get('/projects', (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send({ error: 'Database query failed', details: err.message });
    }
    res.json(results);
  });
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, intro, details, cover, gallery, publish, year, category } = req.body;
  const slug = slugify(title, { lower: true });

  const updatedProject = {
    title,
    slug,
    intro,
    details,
    cover,
    gallery: JSON.stringify(gallery),
    publish,
    year,
    category
  };

  db.query('UPDATE projects SET ? WHERE id = ?', [updatedProject, id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send({ error: 'Database query failed', details: err.message });
    }
    res.status(200).json({ id, ...updatedProject });
  });
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM projects WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send({ error: 'Database query failed', details: err.message });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  });
});

app.get('/projects/:slug', (req, res) => {
  const { slug } = req.params;

  db.query('SELECT * FROM projects WHERE slug = ?', [slug], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send({ error: 'Database query failed', details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
