const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected:', res.rows[0].now);
  }
});

// fetch categories
app.get('/api/categories', (req, res) => {
  pool.query('SELECT * FROM categories')
    .then(result => res.json(result.rows))  
    .catch(err => {
      console.error('Error fetching categories:', err.stack || err);
      res.status(500).json({ error: err.message });
    });
});

// fetch products
app.get('/api/products', (req, res) => {
  pool.query('SELECT p.*, c.section FROM products p JOIN categories c ON p.category_id = c.category_id')
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Error fetching products:', err.stack || err);
      res.status(500).json({ error: err.message });
    });
});

// Create a new product
app.post('/api/products', (req, res) => {
  const { category_id, name, description, price, icon, stock_quantity } = req.body;
  
  pool.query(
    'INSERT INTO products (category_id, name, description, price, icon, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [category_id, name, description, price, icon, stock_quantity]
  )
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => {
      console.error('Error creating product:', err.stack || err);
      res.status(500).json({ error: err.message });
    });
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { category_id, name, description, price, icon, stock_quantity } = req.body;
  
  pool.query(
    'UPDATE products SET category_id = $1, name = $2, description = $3, price = $4, icon = $5, stock_quantity = $6 WHERE product_id = $7 RETURNING *',
    [category_id, name, description, price, icon, stock_quantity, id]
  )
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error updating product:', err.stack || err);
      res.status(500).json({ error: err.message });
    });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  pool.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [id])
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully', product: result.rows[0] });
    })
    .catch(err => {
      console.error('Error deleting product:', err.stack || err);
      res.status(500).json({ error: err.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});