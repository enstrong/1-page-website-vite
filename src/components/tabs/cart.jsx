import '@/css/App.css';
import '@/css/tabs/cart.css';
import React, { useEffect, useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [notification, setNotification] = useState(null);

  const sessionId = localStorage.getItem('session_id') || (() => {
    const newId = crypto.randomUUID();
    localStorage.setItem('session_id', newId);
    return newId;
  })();

  const fetchCart = () => {
    setLoading(true);
    fetch(`http://localhost:5000/api/cart?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch cart');
        }
        return res.json();
      })
      .then((data) => {
        setCartItems(data.items || []);
        if (data.items && data.items.length > 0) {
          const cartTotal = data.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
          );
          setTotal(cartTotal);
        } else {
          setTotal(0);
        }
      })
      .catch((err) => {
        console.error('Error loading cart:', err);
        setCartItems([]);
        showNotification('error', 'Failed to load cart');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = () => {
    window.location.href = '/cart/checkout';
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    
    setLoading(true);
    const deletePromises = cartItems.map(item => 
      fetch(`http://localhost:5000/api/cart/item/${item.cart_item_id}?session_id=${sessionId}`, {
        method: 'DELETE',
      }).then(res => {
        if (!res.ok) throw new Error(`Failed to remove item ${item.cart_item_id}`);
        return res.json();
      })
    );

    Promise.all(deletePromises)
      .then(() => {
        setCartItems([]);
        setTotal(0);
        showNotification('success', 'Cart cleared successfully');
      })
      .catch(err => {
        console.error('Error clearing cart:', err);
        showNotification('error', 'Failed to clear cart');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoveItem = (cartItemId) => {
    fetch(`http://localhost:5000/api/cart/item/${cartItemId}?session_id=${sessionId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to remove item');
        return res.json();
      })
      .then(data => {
        setCartItems(data.items || []);
        if (data.items && data.items.length > 0) {
          const cartTotal = data.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
          );
          setTotal(cartTotal);
        } else {
          setTotal(0);
        }
        showNotification('success', 'Item removed from cart');
      })
      .catch(err => {
        console.error('Error removing item:', err);
        showNotification('error', 'Failed to remove item');
      });
  };

  const handleUpdateQuantity = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      // if quantity becomes 0 or less, remove the item cuz there is none lol
      const itemToRemove = cartItems.find(item => item.product_id === productId);
      if (itemToRemove) {
        handleRemoveItem(itemToRemove.cart_item_id);
      }
      return;
    }

    // or update the quantity
    fetch('http://localhost:5000/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        product_id: productId,
        quantity: change // send the change (can be positive or negative)
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update quantity');
        return res.json();
      })
      .then(data => {
        setCartItems(data.items || []);
        if (data.items && data.items.length > 0) {
          const cartTotal = data.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
          );
          setTotal(cartTotal);
        }
        showNotification('success', 'Cart updated');
      })
      .catch(err => {
        console.error('Error updating quantity:', err);
        showNotification('error', 'Failed to update quantity');
      });
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (loading) return (
    <div className="section cart-section">
      <div className="container">
        <div className="cart-container">
          <div className="loading">Loading your cart...</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="section cart-section">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="container">
        <div className="cart-container">
          <h1>Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.cart_item_id} className="cart-item">
                    <div className="cart-item-image">
                      {item.icon && <img src={item.icon} alt={item.name} />}
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">
                        ${parseFloat(item.price).toFixed(2)}
                      </div>
                    </div>
                    <div className="cart-item-quantity-controls">
                      <button 
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="cart-item-quantity">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.cart_item_id)}
                      className="remove-item-btn"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="cart-actions">
                <div className="cart-total">
                  Total: <span>${total.toFixed(2)}</span>
                </div>
                <div className="cart-buttons">
                  <button onClick={handleClearCart} className="cart-button secondary">
                    Clear Cart
                  </button>
                  <button onClick={handleCheckout} className="cart-button primary">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}