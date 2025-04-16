import '@/css/App.css'
import '@/css/tabs/gear.css'
import Helmet from '/icons/helmet-icon.svg'
import Glasses from '/icons/glasses-icon.svg'
import Gloves from '/icons/gloves-icon.svg'
import Jersey from '/icons/jersey-icon.svg'
import Shoes from '/icons/shoes-icon.svg'
import Bottle from '/icons/water-bottle-icon.svg'

export default function Gear() {
  const gearCategories = [
    { 
      icon: Helmet, 
      title: 'Helmets', 
      description: 'High-performance protective gear for professional cyclists',
      section: 'helmets',
    },
    { 
      icon: Glasses, 
      title: 'Eyewear', 
      description: 'Aerodynamic and protective cycling sunglasses',
      section: 'glasses',
    },
    { 
      icon: Gloves, 
      title: 'Gloves', 
      description: 'Comfort and grip for ultimate control',
      section: 'gloves',
    },
    { 
      icon: Jersey, 
      title: 'Sportswear', 
      description: 'Breathable professional cycling apparel',
      section: 'jerseys',
    },
    { 
      icon: Shoes, 
      title: 'Cycling Shoes', 
      description: 'Lightweight and efficient performance footwear',
      section: 'shoes',
    },
    { 
      icon: Bottle, 
      title: 'Accessories', 
      description: 'Water bottles, bags, and essential cycling gear',
      section: 'accessories',
    }
  ];

  function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <>
      <div className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <div className="gear-categories">
            {gearCategories.map((category, index) => (
              <div key={index} className="gear-category" onClick={() => scrollToElement(category.section)}>
                <img src={category.icon} alt={category.title} className="gear-category-icon" />
                <h3 className="gear-category-title">{category.title}</h3>
                <p className="gear-category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div id='helmets' className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1>That's helmets</h1>
        </div>
      </div>
      
      <div id='glasses' className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1>That's glasses</h1>
        </div>
      </div>
      
      <div id='gloves' className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1>That's gloves</h1>
        </div>
      </div>
      
      <div id='jerseys' className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1>That's jerseys</h1>
        </div>
      </div>
      
      <div id='shoes' className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1>That's shoes</h1>
        </div>
      </div>
      
      <div id='accessories' className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <h1>That's accessories</h1>
        </div>
      </div>
    </>
  );
}