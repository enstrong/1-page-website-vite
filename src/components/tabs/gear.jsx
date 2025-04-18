import '@/css/App.css'
import '@/css/tabs/gear.css'
import { useState, useEffect } from 'react'
import Helmet from '/icons/helmet-icon.svg'
import Glasses from '/icons/glasses-icon.svg'
import Gloves from '/icons/gloves-icon.svg'
import Jersey from '/icons/jersey-icon.svg'
import Shoes from '/icons/shoes-icon.svg'
import Bottle from '/icons/water-bottle-icon.svg'

export default function Gear() {
  const [gearCategories, setGearCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const iconMap = {
    'Helmet': Helmet,
    'Glasses': Glasses,
    'Gloves': Gloves,
    'Jersey': Jersey,
    'Shoes': Shoes,
    'Bottle': Bottle
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const mappedCategories = data.map(category => ({
          ...category,
          icon: iconMap[category.icon] || Bottle 
        }));
        
        setGearCategories(mappedCategories);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (isLoading) return <div className="loading">Loading categories...</div>;
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
      
      {gearCategories.map((category) => (
        <div key={`section-${category.category_id}`} id={category.section} className="gear section d-flex align-center">
          <div className="container d-flex align-center justify-center f-column">
            <h1>There'll be {category.name.toLowerCase()}</h1>
          </div>
        </div>
      ))}
    </>
  );
}