import { useState } from "react";
import './App.css';
import TdFlogo from '/TdF_logo_white.png';
import ShoppingCart from '/shopping-cart-white.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("lock", isOpen);
  };

  return (
    <div className="header">
      <div className="container d-flex align-center justify-center header-content">
      <a href="#"><img src={TdFlogo} alt="TdF logo" className="header__logo header__tdf-logo__mobile"/></a>
        <nav className={`main-header-nav uppercase ${isOpen ? "open" : ""}`}>
          <a href="#">Bikes</a>
          <a href="#">Teams</a>
          <a href="#"><img src={TdFlogo} alt="TdF logo" className="header__logo header__logo-tdf"/></a>
          <a href="#">Gear</a>
          <a href="#">Support</a>
          <a href="#"><img src={ShoppingCart} alt="Cart" className="header__logo header__logo-cart"/></a>
        </nav>
        <button className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </button>
      </div>
    </div>
  )
}