import { useState, useEffect } from 'react';
import '@/css/App.css';
import '@/css/tabs/teams.css';
import '@/css/tabs/admin.css';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    description: '',
    price: '',
    icon: '',
    stock_quantity: ''
  });
  const [mode, setMode] = useState('');

  const API_BASE = 'http://localhost:5000';

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      const sortedProducts = data.sort((a, b) => a.product_id - b.product_id);
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock_quantity' || name === 'category_id' 
        ? Number(value) 
        : value
    }));
  };

  const resetForm = () => {
    setFormData({
      category_id: '',
      name: '',
      description: '',
      price: '',
      icon: '',
      stock_quantity: ''
    });
    setSelectedProduct(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }
      
      await fetchProducts();
      resetForm();
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert(`Error creating product: ${error.message}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/products/${selectedProduct.product_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }
      
      await fetchProducts();
      resetForm();
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`Error updating product: ${error.message}`);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/api/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }
      
      await fetchProducts();
      if (selectedProduct && selectedProduct.product_id === productId) {
        resetForm();
      }
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Error deleting product: ${error.message}`);
    }
  };

  const selectProductForEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      category_id: product.category_id,
      name: product.name,
      description: product.description,
      price: product.price,
      icon: product.icon,
      stock_quantity: product.stock_quantity
    });
    setMode('edit');
  };

  const renderForm = () => {
    if (mode !== 'create' && mode !== 'edit') return null;
    
    return (
      <div className="admin-form-container">
        <h2>{mode === 'create' ? 'Create New Product' : 'Edit Product'}</h2>
        <form onSubmit={mode === 'create' ? handleCreate : handleUpdate}>
          <div className="form-group">
            <label htmlFor="category_id">Category</label>
            <select 
              id="category_id" 
              name="category_id" 
              value={formData.category_id} 
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              step="0.01" 
              value={formData.price} 
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="icon">Icon Path</label>
            <input 
              type="text" 
              id="icon" 
              name="icon" 
              value={formData.icon} 
              onChange={handleInputChange}
              required
              placeholder="/products/example.jpg"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="stock_quantity">Stock Quantity</label>
            <input 
              type="number" 
              id="stock_quantity" 
              name="stock_quantity" 
              value={formData.stock_quantity} 
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="admin-button primary">
              {mode === 'create' ? 'Create Product' : 'Update Product'}
            </button>
            <button type="button" className="admin-button secondary" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <div className="section admin-section d-flex align-center"> 
        <div className="container">
          <section className="admin-controls d-flex">
            <button 
              className="bikes-section__button admin__button"
              onClick={() => { 
                setMode('create'); 
                setFormData({
                  category_id: '',
                  name: '',
                  description: '',
                  price: '',
                  icon: '',
                  stock_quantity: ''
                });
                setSelectedProduct(null);
              }}
            >
              Create product
            </button>
            <button 
              className="bikes-section__button admin__button"
              onClick={() => fetchProducts()}
            >
              Refresh products
            </button>
          </section>
          
          {mode === 'create' || mode === 'edit' ? (
            <div className="admin-form-container">
              <h2>{mode === 'create' ? 'Create New Product' : 'Edit Product'}</h2>
              <form onSubmit={mode === 'create' ? handleCreate : handleUpdate}>
                <div className="form-group">
                  <label htmlFor="category_id">Category</label>
                  <select 
                    id="category_id" 
                    name="category_id" 
                    value={formData.category_id} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.category_id} value={category.category_id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    step="0.01" 
                    value={formData.price} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="icon">Icon Path</label>
                  <input 
                    type="text" 
                    id="icon" 
                    name="icon" 
                    value={formData.icon} 
                    onChange={handleInputChange}
                    required
                    placeholder="/products/example.jpg"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="stock_quantity">Stock Quantity</label>
                  <input 
                    type="number" 
                    id="stock_quantity" 
                    name="stock_quantity" 
                    value={formData.stock_quantity} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-buttons">
                  <button type="submit" className="admin-button primary">
                    {mode === 'create' ? 'Create Product' : 'Update Product'}
                  </button>
                  <button type="button" className="admin-button secondary" onClick={() => {
                    setMode('');
                  }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : null}
          
          <section className="admin-products">
            <h2>Product Management</h2>
            <div className="product-list">
              {products.length === 0 ? (
                <p>No products found. Create one to get started.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => {
                      const category = categories.find(c => c.category_id === product.category_id);
                      return (
                        <tr key={product.product_id}>
                          <td>{product.product_id}</td>
                          <td>{product.name}</td>
                          <td>{category ? category.name : 'Unknown'}</td>
                          <td>${parseFloat(product.price).toFixed(2)}</td>
                          <td>{product.stock_quantity}</td>
                          <td className="actions">
                            <button 
                              className="admin-action-btn edit"
                              onClick={() => selectProductForEdit(product)}
                            >
                              Edit
                            </button>
                            <button 
                              className="admin-action-btn delete"
                              onClick={() => handleDelete(product.product_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}