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
    },
    { 
      icon: Glasses, 
      title: 'Eyewear', 
      description: 'Aerodynamic and protective cycling sunglasses',
    },
    { 
      icon: Gloves, 
      title: 'Gloves', 
      description: 'Comfort and grip for ultimate control',
    },
    { 
      icon: Jersey, 
      title: 'Sportswear', 
      description: 'Breathable professional cycling apparel',
    },
    { 
      icon: Shoes, 
      title: 'Cycling Shoes', 
      description: 'Lightweight and efficient performance footwear',
    },
    { 
      icon: Bottle, 
      title: 'Accessories', 
      description: 'Water bottles, bags, and essential cycling gear',
    }
  ];

  return (
    <>
      <div className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <div className="gear-categories">
            {gearCategories.map((category, index) => (
              <div key={index} className="gear-category">
                <img src={category.icon} alt={category.title} className="gear-category-icon" />
                <h3 className="gear-category-title">{category.title}</h3>
                <p className="gear-category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <div className="gear-categories">
            {gearCategories.map((category, index) => (
              <div key={index} className="gear-category">
                <img src={category.icon} alt={category.title} className="gear-category-icon" />
                <h3 className="gear-category-title">{category.title}</h3>
                <p className="gear-category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="gear section d-flex align-center">
        <div className="container d-flex align-center justify-center f-column">
          <div className="gear-categories">
            {gearCategories.map((category, index) => (
              <div key={index} className="gear-category">
                <img src={category.icon} alt={category.title} className="gear-category-icon" />
                <h3 className="gear-category-title">{category.title}</h3>
                <p className="gear-category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}