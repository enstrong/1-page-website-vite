import { useState } from "react"
import '@/css/App.css'
import '@/css/header.css'
import { scrollToTop } from '@/components/scrollTop.jsx'
import TdFlogo from '/icons/TdF_logo_white.png'
import ShoppingCart from '/icons/shopping-cart-white.png'

export default function Header({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("lock", isOpen);
  };

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      scrollToTop();
    } else {
      setActiveTab(tab);
      if (isOpen) {
        toggleMenu();
      }
    }
  };

  return (
    <div className="header">
      <div className="container d-flex align-center justify-center header-content">
        <nav className={`main-header-nav uppercase ${isOpen ? "open" : ""}`}>
          <a href="#" className={activeTab === "bikes" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleTabClick("bikes"); }}>Bikes</a>
          <a href="#" className={activeTab === "teams" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleTabClick("teams"); }}>Teams</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabClick("bikes"); }}><img src={TdFlogo} alt="TdF logo" className="header__logo header__logo-tdf"/></a>
          <a href="#" className={activeTab === "gear" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleTabClick("gear"); }}>Gear</a>
          <a href="#" className={activeTab === "support" ? "active" : ""} onClick={(e) => { e.preventDefault(); handleTabClick("support"); }}>Support</a>
          <a href="#"><img src={ShoppingCart} alt="Cart" className="header__logo header__logo-cart"/></a>
        </nav>
      </div>
    </div>
  );
}