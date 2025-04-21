import '@/css/App.css'
import '@/css/tabs/gear.css'
import { useState, useEffect } from 'react'

export default function Gear() {
  const [gearCategories, setGearCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetching categories
        const categoriesResponse = await fetch('http://localhost:5000/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error(`HTTP error! Categories Status: ${categoriesResponse.status}`);
        }
        const categoriesData = await categoriesResponse.json();
        
        setGearCategories(categoriesData);
        
        // fetching products
        const productsResponse = await fetch('http://localhost:5000/api/products');
        if (!productsResponse.ok) {
          throw new Error(`HTTP error! Products Status: ${productsResponse.status}`);
        }
        const productsData = await productsResponse.json();
        
        setProducts(productsData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category_id === categoryId);
  };

  function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (isLoading) return <div className="loading">Loading data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <div className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <div className="gear-categories">
            {gearCategories.map((category) => (
              <div key={category.category_id} className="gear-category" onClick={() => scrollToElement(category.section)}>
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="gear-category-icon"
                  onError={(e) => {
                    console.error(`Failed to load icon for ${category.name}`);
                    e.target.src = '/icons/helmet-icon.svg'; // shows helmet icon if fails
                  }} 
                />
                <h3 className="gear-category-title">{category.name}</h3>
                <p className="gear-category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {gearCategories.map((category) => {
        const categoryProducts = getProductsByCategory(category.category_id);
        
        return (
          <div key={`section-${category.category_id}`} id={category.section} className="gear-products-bg section d-flex align-center">
            <div className="container d-flex align-center justify-center f-column">
              <h1>{category.name}</h1>
              <div className="products-container">
                {categoryProducts.length > 0 ? (
                  <div className="gear-categories gear-products">
                    {categoryProducts.map(product => (
                      <div key={product.product_id} className="gear-category gear_product">
                        <div className="product-image">
                          <img 
                            src={product.icon} 
                            alt={product.name} 
                            className="gear-product-icon"
                            onError={(e) => {
                              console.error(`Failed to load image for ${product.name}`);
                              e.target.src = '/icons/helmet-icon.svg'; // shows helmet icon if fails
                            }}
                          />
                        </div>
                        <h3 className="gear-category-title">{product.name}</h3>
                        <p className="gear-category-description">{product.description}</p>
                        <p className="gear-category-title">${product.price}</p>
                        <button className="bikes-section__button d-flex">Add to Cart</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No products available in this category yet.</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}