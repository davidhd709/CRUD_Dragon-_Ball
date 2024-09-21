const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Rutas CRUD
app.get('/api/characters', (req, res) => {
  db.query('SELECT * FROM characters', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/characters', (req, res) => {
  const { name, race } = req.body;
  db.query('INSERT INTO characters (name, race) VALUES (?, ?)', [name, race], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, name, race });
  });
});

app.put('/api/characters/:id', (req, res) => {
  const { id } = req.params;
  const { name, race } = req.body;
  db.query('UPDATE characters SET name = ?, race = ? WHERE id = ?', [name, race, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, name, race });
  });
});

app.delete('/api/characters/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM characters WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Personaje eliminado correctamente' });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});