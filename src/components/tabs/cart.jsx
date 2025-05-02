import '@/css/App.css';
import '@/css/tabs/cart.css';
import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sessionId = localStorage.getItem('session_id');

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('session_id', sessionId);
    }

    fetch(`http://localhost:5000/api/cart?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch cart');
        }
        return res.json();
      })
      .then((data) => {
        setCartItems(data.items || []);
      })
      .catch((err) => {
        console.error('Error loading cart:', err);
        setCartItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.cart_item_id}>
              <strong>{item.name}</strong> — {item.quantity} × ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;