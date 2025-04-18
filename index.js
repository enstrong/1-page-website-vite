const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bikes-db',
  password: '123',
  port: 5433
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected:', res.rows[0].now);
  }
});

app.get('/api/categories', (req, res) => {
  pool.query('SELECT * FROM categories')
    .then(result => res.json(result.rows))  
    .catch(err => {
      console.error('Error fetching categories:', err.stack || err);
      res.status(500).json({ error: err.message });
    });
});

app.get('/api/products', (req, res) => {
  pool.query('SELECT p.*, c.section FROM products p JOIN categories c ON p.category_id = c.category_id')
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Error fetching products:', err.stack || err);
      res.status(500).json({ error: err.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});