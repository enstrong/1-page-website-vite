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

// create a new product
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

// update a product
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

// delete a product
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

// get or create cart
app.get('/api/cart', async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  try {
    let cartResult = await pool.query('SELECT * FROM cart WHERE session_id = $1', [sessionId]);

    if (cartResult.rows.length === 0) {
      const newCart = await pool.query('INSERT INTO cart (session_id) VALUES ($1) RETURNING *', [sessionId]);
      cartResult = newCart;
    }

    const cartId = cartResult.rows[0].cart_id;

    const itemsResult = await pool.query(
      `SELECT ci.cart_item_id, ci.product_id, ci.quantity, p.name, p.price, p.icon
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    res.json({ cart_id: cartId, items: itemsResult.rows });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// add item to cart
app.post('/api/cart/add', async (req, res) => {
  const { session_id, product_id, quantity = 1 } = req.body;

  if (!session_id || !product_id) {
    return res.status(400).json({ error: 'Missing required fields (session_id, product_id)' });
  }

  try {
    // get or create cart
    let cartResult = await pool.query('SELECT * FROM cart WHERE session_id = $1', [session_id]);
    let cartId;

    // create new cart if none exists
    if (cartResult.rows.length === 0) {
      const newCart = await pool.query('INSERT INTO cart (session_id) VALUES ($1) RETURNING *', [session_id]);
      cartId = newCart.rows[0].cart_id;
    } else {
      cartId = cartResult.rows[0].cart_id;
    }

    // check if product exists in cart
    const existingItem = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, product_id]
    );

    let result;
    if (existingItem.rows.length > 0) {
      // update quantity if item already exists
      const newQuantity = existingItem.rows[0].quantity + quantity;
      result = await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2 RETURNING *',
        [newQuantity, existingItem.rows[0].cart_item_id]
      );
    } else {
      // add new item to cart
      result = await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [cartId, product_id, quantity]
      );
    }

    // get updated cart items
    const updatedCart = await pool.query(
      `SELECT ci.cart_item_id, ci.product_id, ci.quantity, p.name, p.price, p.icon
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    res.status(200).json({ 
      message: 'Item added to cart successfully',
      cart_id: cartId,
      items: updatedCart.rows
    });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// remove item from cart
app.delete('/api/cart/item/:id', async (req, res) => {
  const { id } = req.params;
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  try {
    // verify the cart belongs to the session
    const cartResult = await pool.query('SELECT * FROM cart WHERE session_id = $1', [session_id]);
    
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const cartId = cartResult.rows[0].cart_id;
    
    // delete the item
    const deleteResult = await pool.query(
      'DELETE FROM cart_items WHERE cart_item_id = $1 AND cart_id = $2 RETURNING *',
      [id, cartId]
    );
    
    if (deleteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    // get updated cart
    const updatedCart = await pool.query(
      `SELECT ci.cart_item_id, ci.product_id, ci.quantity, p.name, p.price, p.icon
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = $1`,
      [cartId]
    );
    
    res.json({
      message: 'Item removed from cart',
      items: updatedCart.rows
    });
  } catch (err) {
    console.error('Error removing item from cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});