import '@/css/App.css'
import '@/css/tabs/gear.css'
import { useState, useEffect } from 'react'
import Helmet from '/icons/helmet-icon.svg'
import Glasses from '/icons/glasses-icon.svg'
import Gloves from '/icons/gloves-icon.svg'
import Jersey from '/icons/jersey-icon.svg'
import Shoes from '/icons/shoes-icon.svg'
import Bottle from '/icons/water-bottle-icon.svg'
// import helmetPogacar from '/products/helmet_pogacar.png'
// import helmetTT from '/products/helmet_evenepoel_TT.webp'
// import helmetVisma from '/products/helmet_teamvisma.webp'

export default function Gear() {
  const [gearCategories, setGearCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const categoryIconMap = {
    'Helmet': Helmet,
    'Glasses': Glasses,
    'Gloves': Gloves,
    'Jersey': Jersey,
    'Shoes': Shoes,
    'Bottle': Bottle
  };
  
  const productIconMap = {
    'helmetPogacar': helmetPogacar,
    'helmetTT': helmetTT,
    'helmetVisma': helmetVisma
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetching categories
        const categoriesResponse = await fetch('http://localhost:5000/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error(`HTTP error! Categories Status: ${categoriesResponse.status}`);
        }
        const categoriesData = await categoriesResponse.json();
        const mappedCategories = categoriesData.map(category => ({
          ...category,
          icon: categoryIconMap[category.icon] || Bottle 
        }));
        setGearCategories(mappedCategories);
        
        // fetching products
        const productsResponse = await fetch('http://localhost:5000/api/products');
        if (!productsResponse.ok) {
          throw new Error(`HTTP error! Products Status: ${productsResponse.status}`);
        }
        const productsData = await productsResponse.json();
        
        // the icons
        const mappedProducts = productsData.map(product => ({
          ...product,
          iconSrc: productIconMap[product.icon] || null
        }));
        
        setProducts(mappedProducts);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductsBySection = (section) => {
    return products.filter(product => product.section === section);
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
                <img src={category.icon} alt={category.name} className="gear-category-icon" />
                <h3 className="gear-category-title">{category.name}</h3>
                <p className="gear-category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {gearCategories.map((category) => {
        const sectionProducts = getProductsBySection(category.section);
        
        return (
          <div key={`section-${category.category_id}`} id={category.section} className="gear_products section d-flex align-center">
            <div className="container d-flex align-center justify-center f-column">
              <h1>{category.name}</h1>
              <div className="products-container">
                {sectionProducts.length > 0 ? (
                  <div className="gear-categories">
                    {sectionProducts.map(product => (
                      <div key={product.product_id} className="gear-category gear_product">
                        {/* {product.iconSrc ? (
                          <div className="product-image">
                            <img 
                              src={product.iconSrc} 
                              alt={product.name} 
                              className="gear-product-icon"
                              onError={(e) => {
                                console.error(`Failed to load image for ${product.name}`, e);
                                e.target.src = categoryIconMap[category.icon];
                              }}
                            />
                          </div>
                        ) : (
                          <div className="product-image">
                            <img 
                              src={categoryIconMap[category.icon]} 
                              alt={product.name}
                              className="gear-category-icon" 
                            />
                          </div>
                        )} */}
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