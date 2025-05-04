import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/css/App.css';
import '@/css/tabs/checkout.css';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    shipping_address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const API_BASE = 'http://localhost:5000';

  useEffect(() => {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('session_id', sessionId);
    }

    fetchCartItems(sessionId);
  }, []);
  

  const fetchCartItems = async (sessionId) => {
    try {
      const response = await fetch(`${API_BASE}/api/cart?session_id=${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch cart items');
      
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setCartItems(data.items);
        calculateTotal(data.items);
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setMessage('Failed to load cart. Please try again.');
    }
  };


  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setCartTotal(total);
  };

  const generateSessionId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // FIXED: Use 'session_id' instead of 'sessionId'
      const sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        throw new Error('No session ID found');
      }

      // create the order object
      const orderData = {
        session_id: sessionId,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        shipping_address: formData.shipping_address,
        total_price: cartTotal,
        order_status: 'pending'
      };

      // submit the order
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      setMessage('Order placed successfully!');
      
      // clear the cart
      await fetch(`${API_BASE}/api/cart/clear?session_id=${sessionId}`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error creating order:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section checkout-section">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        
        <div className="checkout-container">
          <div className="checkout-form-container">
            <h2>Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="customer_name">Full Name</label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="customer_email">Email Address</label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  required
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="shipping_address">Shipping Address</label>
                <textarea
                  id="shipping_address"
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleInputChange}
                  required
                  placeholder="Street address, city, state, zip code"
                  rows="4"
                />
              </div>
              
              <button 
                type="submit" 
                className="checkout-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>
          </div>
          
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            {cartItems.length > 0 ? (
              <>
                <div className="checkout-items">
                  {cartItems.map(item => (
                    <div key={item.product_id} className="checkout-item">
                      <div className="checkout-item-image">
                        <img src={item.icon} alt={item.name} />
                      </div>
                      <div className="checkout-item-details">
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="checkout-total">
                  <div className="checkout-subtotal">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="checkout-shipping">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="checkout-final-total">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}